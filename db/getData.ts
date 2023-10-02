import Inventory from "@/app/dashboard/inventory";
import { db } from "@/db/planetScaleClient";
import {test, testBuy, testSell} from "@/db/schema"
import { desc } from "drizzle-orm";

const getItemById = (id: string,data?:{id:string,[key:string]:any}[]) => {
  if(!data){
    return null
  }
  for (let arr of data) {
    if (arr.id === id) {
      return arr;
    }
  }
  return null;
};
const getDataFromDb = async()=>{
  const value = {
    inventory:{
      // get:()=>getApiData("inventory"),
      data: await db.select().from(test),
      getById(id:string){
        return getItemById(id,this.data)
      }
    },
    sales:{
      // get:()=>getApiData("sell"),
      data: await db.select().from(testSell).orderBy(desc(testSell.time))
    },
    orders:{
      // get:()=>getApiData("buy"),
      data:await db.select().from(testBuy).orderBy(desc(testBuy.time))
    }
  }  
  return value  
}
export {getDataFromDb}