"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTableSales } from "./sales";
import { DataTableOrder } from "./orders";;
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { BuyDataType, SellDataType } from "@/lib/types";

const HomeCard = (props: { title: string; value: string | number }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.value}</CardTitle>
      </CardHeader>
      <CardContent>{props.title}</CardContent>
    </Card>
  );
};
const HomeGrid = (props: { orderPending: number; todaySales: number }) => {
  return (
    <div className="grid grid-cols-2 gap-8">
      <HomeCard title="orders pending" value={props.orderPending} />
      <HomeCard title="sales today" value={props.todaySales} />
    </div>
  );
};
const getPendingOrders = (data: BuyDataType[], limit?: number) => {
  let total = 0;
  const length = data.length;
  const myLimit = limit ?? 60;
  const orderNumber = length > myLimit ? myLimit : length;
  //data.splice(0, orderNumber)
  for (let item of data) {
    if (item.status === 0) {
      total++;
    }
  }
  return total;
};
const getTodaySales = (data: SellDataType[], limit?: number) => {
  let total = 0;
  const length = data.length;
  const myLimit = limit ?? 60;
  const orderNumber = length > myLimit ? myLimit : length;
  for (let item of data) {
    if (dayjs(item.time).isSame(dayjs(), "day")) {
      total++;
    }
  }
  return total;
};
export default function Home(props: 
  { buy: BuyDataType[]; sell: SellDataType[] }
) {
  const [buyData] = useState(props.buy);
  const [sellData] = useState(props.sell);
  const [homeGrid,setHomeGrid] = useState({orderPending:0,todaySales:0})
  const [slicedData,setSlicedData] = useState<{ buy: BuyDataType[]; sell: SellDataType[] }>({
    buy:[],
    sell:[]
  })
  useEffect(()=>{
    setHomeGrid({
      orderPending:getPendingOrders(props.buy),
      todaySales:getTodaySales(props.sell)
    })
  },[])
  useEffect(()=>{
    setSlicedData({
      buy:buyData.slice(0,6),
      sell:sellData.slice(0,6)
    })
  },[buyData,sellData])
  return (
    <div className="space-y-8">
      <h1 className="py-4 text-6xl font-bold tracking-tighter text-center md:text-8xl">
        Home
      </h1>
      <HomeGrid
        orderPending={homeGrid.orderPending}
        todaySales={homeGrid.todaySales}
      />
      <DataTableSales data={slicedData.sell} />
      <DataTableOrder data={slicedData.buy} />
    </div>
  );
}
