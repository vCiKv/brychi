// "use client";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { BuyDataType, DrinkInventoryType, SellDataType } from "@/lib/types";
import HomeDataTable from "./components-dashboard/homeDataTable";
import HomeGrid from "./components-dashboard/homeGrid";


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
  { buy: BuyDataType[]; sell: SellDataType[],inventory:DrinkInventoryType[] }
) {
  return (
    <div className="space-y-8">
      <h1 className="py-4 text-6xl font-bold tracking-tighter text-center md:text-8xl">
        Home
      </h1>
      <HomeGrid
        orderPending={getPendingOrders(props.buy)}
        todaySales={getTodaySales(props.sell)}
      />
      <HomeDataTable inventory={props.inventory} sell={props.sell} buy={props.buy}/>
    </div>
  );
}
