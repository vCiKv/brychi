import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DrinkInventoryType } from "./types";
// import { cookies } from "next/headers";
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

export const formatterNGN = (amount:number|string)=>{
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
  });
  if(isNaN(Number(amount))){
    return "0"
  }
  return formatter.format(Number(amount))
}
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
  return isString ? total : formatterNGN(total);
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
export const getDrinkById = (id:string|null|undefined,data:DrinkInventoryType[]) => {
  // const myData = JSON.parse(cookies().get("drinkInventory")?.value??"[]")
  if(!id){
    return null
  }
  for (let arr of data) {
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


export const displayTime = (time: string) => {
  return time.replace("T", "\n").replace("Z", "");
};
