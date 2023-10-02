import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DrinkInventoryType } from "./types";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// export function getSession(key: string) {
//   if (typeof window !== "undefined") {
//     let value = window.sessionStorage.getItem(key);
//     return value ? JSON.parse(value) : null;
//   }
// }
// export function setSession(key: string, value: any) {
//   if (typeof window !== "undefined") {
//     window.sessionStorage.setItem(key, JSON.stringify(value));
//   }
//}
type GetTotalDrinkSaleType = {
  (
    drinks: {
      cost: number;
      cartonsAmount: string | number;
      [key: string]: any;
    }[],
    isString?: boolean
  ): string;
  (
    drinks: {
      cost: number;
      cartonsAmount: string | number;
      [key: string]: any;
    }[]
  ): number;
};
export const getTotalDrinkSale = (
  drinks: {
    cost: number;
    cartonsAmount: string | number;
    [key: string]: any;
  }[],
  isString?: boolean
) => {
  let total = 0;
  for (const drink of drinks) {
    const amount = drink.cost * Number(drink.cartonsAmount);
    total += amount;
  }
  return isString ? total : total.toLocaleString("US-en");
};


const dataDrinkStatic: DrinkInventoryType[] = require("@/public/data.json");

export function getInitData() {
  const myDataArr: DrinkInventoryType[] = [];
  dataDrinkStatic.forEach((item, index) => {
    let sellPrice = index % 2 === 0 ? 100 : 200;
    item.sellPrice = item.buyPrice + sellPrice;
    myDataArr.push(item);
  });
  return myDataArr;
}
export const getDrinkById = (id: string) => {
  for (let arr of getInitData()) {
    if (arr.id === id) {
      return arr;
    }
  }
  return null;
};

export function makeRandomId(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const logToDatabase = (
  type: keyof typeof options,
  user: string,
  id: string,
  special1?: string | number,
  special2?: string | number
) => {
  const now = new Date();
  const options = {
    addSale: `${user} added sale on id ${id} on ${now}`,
    addInventory: `${user} add inventory on id ${id} on ${now}`,
    updatedInventory: `${user} updated inventory on id ${id} on ${now}`,
    addDrink: `${user} added drink on id ${id} on ${now}`,
    updateDrink: `${user} updated drink on id ${id} on ${now}`,
  };

  const message = options[type];

  return message;
};
export const displayTime = (time: string) => {
  return time.replace("T", "\n").replace("Z", "");
};
