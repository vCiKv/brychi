"use server";
import { db } from "@/db/planetScaleClient";
import { test, testBuy, testSell } from "@/db/schema";
import {
  DrinkCardPropsType,
  DrinkInventoryType,
  DrinksType,
  SellDataType,
} from "@/lib/types";
import { desc, eq, sql } from "drizzle-orm";
import { cache } from "react";
import { makeRandomId } from "@/lib/utils";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
// import { useRouter } from "next/router";
const editInventory = async (type: "add" | "sub", drinks: DrinksType[]) => {
  const inventory = await getInventory();
  for (let drink of drinks) {
    const myDrink = getInventoryById(drink.drinkId, inventory);
    if (!myDrink) {
      return;
    }
    // const newStock = (type === "add") ? Number(myDrink.inventory??0) + drink.cartonsAmount : Number(myDrink.inventory??0) - drink.cartonsAmount

    const newStock = (i: string) => {
      const myInventory = Number(i);
      const amount = Number(drink.cartonsAmount);
      return String(
        type === "add" ? myInventory + amount : myInventory - amount
      );
    };
    // await db.update(test).set({inventory:newStock(test.data)}).where((eq(test.id,myDrink.id)))
  }
};
const getInventoryById = (id: string, data: DrinkInventoryType[]) => {
  if (!data) {
    return null;
  }
  for (let arr of data) {
    if (arr.id === id) {
      return arr;
    }
  }
  return null;
};
export const getInventory = cache(async () => {
  const inventory = await db.select().from(test);
  return inventory;
});
export const addNewInventory = async (data: Omit<DrinkInventoryType, "id">) => {
  const id = data.name.slice(0, 3) + "-" + data.sizeCl + "-" + makeRandomId(5);
  const newInventory = {
    id: id,
    ...data,
  };
  const createInventory = await db.insert(test).values(newInventory);
  if (createInventory) {
    revalidatePath("/");
    return true;
  } else {
    return false;
  }
  //cookies().set('drinkInventory', JSON.stringify(inventory))
};
export const editDrinksInventory = async (
  id: string,
  data: Omit<DrinkInventoryType, "id">
) => {
  const editInventory = await db.update(test).set(data).where(eq(test.id, id));
  if (editInventory) {
    revalidatePath("/");
    return true;
  } else {
    return false;
  }
};
export const getSales = cache(async () => {
  const sale = await db.select().from(testSell).orderBy(desc(testSell.time));
  //cookies().set('orders', JSON.stringify(sale))
  return sale;
});
export const completeNewSale = async (data: {
  drinks: DrinkCardPropsType[];
  customerName?: string;
}) => {
  const newSale = {
    id: makeRandomId(8),
    drinks: data.drinks,
    customerName: data.customerName ?? undefined,
    time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  };
  const checkQuery = await db.transaction(async (tx) => {
    const q1 = await tx.insert(testSell).values(newSale);
    // const inventory = await getInventory()
    if (!q1) {
      tx.rollback();
      return false;
    }
    const q2 = await tx.transaction(async (tx2) => {
      let didFail = false;
      for (let drink of newSale.drinks) {
        const q3 = await tx2
          .update(test)
          .set({ inventory: sql`${test.inventory} - ${drink.cartonsAmount}` })
          .where(eq(test.id, drink.drinkId));
        if (!q3) {
          tx.rollback();
          tx2.rollback();
          didFail = true;
        }
      }
      return !didFail;
    });

    if (!q2) {
      return false;
    }
    return true;
  });
  if (checkQuery) {
    // editInventory("sub",data.drinks)
    revalidatePath("/");
    return true;
  } else {
    return false;
  }
};
export const getOrders = cache(async () => {
  const order = await db.select().from(testBuy).orderBy(desc(testBuy.time));
  //cookies().set('sales', JSON.stringify(order))
  return order;
});
export const updateOrderStatus = async (
  id: string,
  newStatus: number,
  oldStatus: number,
  drinks: DrinksType[]
) => {
  if (newStatus > 1 || newStatus < -1) {
    return false;
  }
  if (newStatus === oldStatus) {
    return true;
  }
  if (newStatus === 1) {
    const checkQuery = await db.transaction(async (tx) => {
      const q1 = await tx
        .update(testBuy)
        .set({ status: newStatus })
        .where(eq(testBuy.id, id));
      // const inventory = await getInventory()
      if (!q1) {
        tx.rollback();
        return false;
      }
      const q2 = await tx.transaction(async (tx2) => {
        let didFail = false;
        for (let drink of drinks) {
          const q3 = await tx2
            .update(test)
            .set({ inventory: sql`${test.inventory} + ${drink.cartonsAmount}` })
            .where(eq(test.id, drink.drinkId));
          if (!q3) {
            tx.rollback();
            tx2.rollback();
            didFail = true;
          }
        }
        return !didFail;
      });

      if (!q2) {
        return false;
      }
      return true;
    });
    revalidatePath("/");
    return checkQuery
  } else {
    const isComplete = await db
      .update(testBuy)
      .set({ status: newStatus })
      .where(eq(testBuy.id, id));
    // console.log("isComplete",isComplete)
    if (isComplete) {
      revalidatePath("/");
      return true;
    } else {
      return false;
    }
  }
};
export const completeNewOrder = async (data: {
  drinks: DrinkCardPropsType[];
  purchasedFrom: string;
}) => {
  const newOrder = {
    id: makeRandomId(8),
    drinks: data.drinks,
    purchasedFrom: data.purchasedFrom,
    time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  };
  const checkQuery = await db.insert(testBuy).values(newOrder);
  if (checkQuery) {
    // editInventory("sub",data.drinks)
    revalidatePath("/");
    return true;
  } else {
    return false;
  }
};
export const logToDatabase = async(
  type: keyof typeof options,
  id: string,
  special1?: string | number,
  special2?: string | number
) => {
  console.log("db started")
  const user  = "admin"
  const now = dayjs().format("HH:mm:ss DD-MM-YYYY");
  const options = {
    addSale: `${user} added sale with id: ${id} on ${now}`,
    addOrder: `${user} added order with id: ${id} on ${now}`,
    updateOrderStatus: `${user} updated order status with id: ${id} from ${special1??"oldStatus"} to ${special2??"newStatus"} on ${now}`,
    addInventory: `${user} add new inventory with id: ${id} on ${now}`,
    updateInventory: `${user} updated inventory with id: ${id} from ${special1??"oldString"} to ${special2??"newString"} on ${now}`,
  };

  const message = options[type];
};

export const getLogs = cache(async()=>{

})