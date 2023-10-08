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

const reloadPage = () => {
  revalidatePath("/");
};
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
  //cookies().set('drinkInventory', JSON.stringify(inventory))
  return inventory;
});
export const addNewInventory = async (data: Omit<DrinkInventoryType, "id">) => {
  const id = data.name.slice(0, 3) + "-" + data.sizeCl + "-" + makeRandomId(5);
  const newInventory = {
    id: id,
    ...data,
  };
  const createInventory = await db.insert(test).values(newInventory);
  console.log("inv", createInventory);
  if (createInventory) {
    // editInventory("sub",data.drinks)
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
    console.log("q1", q1);
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
        console.log("q3", q3);

        if (!q3) {
          tx.rollback();
          tx2.rollback();
          didFail = true;
        }
      }
      return !didFail;
    });
    console.log("q2", q2);

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
      console.log("q1", q1);
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
          console.log("q3", q3);

          if (!q3) {
            tx.rollback();
            tx2.rollback();
            didFail = true;
          }
        }
        return !didFail;
      });
      console.log("q2", q2);

      if (!q2) {
        return false;
      }
      return true;
    });
  } else {
    const isComplete = await db
      .update(testBuy)
      .set({ status: newStatus })
      .where(eq(testBuy.id, id));
    // console.log("isComplete",isComplete)
    if (isComplete) {
      revalidatePath("/");
      if (newStatus === 1) {
        //update inventory
      }
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
