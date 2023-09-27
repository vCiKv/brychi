import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getSession(key: string) {
  let value = sessionStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}
export function setSession(key: string, value: any) {
  sessionStorage.setItem(key, JSON.stringify(value));
}
export interface DrinkType {
  id: string;
  name: string;
  sizeCl: number;
  buyPrice: number;
  sellPrice: number;
  pieces: number;
}
const dataDrinkStatic: DrinkType[] = require("@/public/data.json");
export function getInitData() {
  const myDataArr: DrinkType[] = [];
  dataDrinkStatic.forEach((item, index) => {
    let sellPrice = index % 2 === 0 ? 100 : 200;
    item.sellPrice = item.buyPrice + sellPrice;
    myDataArr.push(item);
  });
  return myDataArr;
}
export const getDrinkById = (id:string)=>{
  for(let arr of getInitData()){
    if(arr.id === id){
      return arr
    }
  }
  return null
}

export const logToDatabase = (type:keyof typeof options,user:string,id:string)=>{
  const now = new Date
  const options = {
    addSale:`${user} added sale on id ${id} on ${now}`,
    addInventory:`${user} add inventory on id ${id} on ${now}`,
    updatedInventory:`${user} updated inventory on id ${id} on ${now}`,
    addDrink:`${user} added drink on id ${id} on ${now}`,
    updateDrink:`${user} updated drink on id ${id} on ${now}`,
  }

  const message = options[type]

  return message
}
