"use client"
import { useState } from "react";

interface invoiceDataType{
  id:string,
  drinkId: string,
  time: string,
  cartonsAmount:number
} 
export interface SellDataType extends invoiceDataType {
  customerName?:string
}
export interface BuyDataType extends invoiceDataType {
  purchasedFrom: string,
  status: -1 | 0 | 1
}

const buyDataStatic: BuyDataType[] = require("@/public/buy.json");
const sellDataStatic: SellDataType[] = require("@/public/sell.json");

const getItemFromId = (id:string,array:{id:string,[key:string]:any}[]):null|[{id:string,[key:string]:any},number]=>{
  let i = -1
  for(let arr of array){
    if(arr.id === id){
      return [arr,i]
    }
    i += 1 
  }

  // array.forEach((arr,index)=>{
  //   if(arr.id === id){
  //     val = arr
  //     i = index
  //   }
  // })
  return null
}

export const useBuyData = ():[BuyDataType[],(id: string, newValue: BuyDataType) => void]=>{
  const [buyData,setBuyData] = useState(buyDataStatic)

  const updateBuyData = (id:string,newValue:BuyDataType)=>{
    const myData = getItemFromId(id,buyData)
    if(!myData){
      throw new Error("id not found")  
    }
    const dataCopy = [...buyData]
    dataCopy[myData[1]] = newValue
    setBuyData(dataCopy)
  }
  return [buyData,updateBuyData]
}
export const useSellData = ():[SellDataType[],(id: string, newValue: SellDataType) => void]=>{
  const [sellData,setSellData] = useState(sellDataStatic)

  const updateSellData = (id:string,newValue:SellDataType)=>{
    const myData = getItemFromId(id,sellData)
    if(!myData){
      throw new Error("id not found")  
    }
    const dataCopy = [...sellData]
    dataCopy[myData[1]] = newValue
    setSellData(dataCopy)

  }
  return [sellData,updateSellData]

}