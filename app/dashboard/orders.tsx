"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, displayTime, getDrinkById, getTotalDrinkSale } from "@/lib/utils";
import { useState } from "react";
import DrinksDisplay from "./drinkDisplay";
import { BuyDataType } from "@/lib/types";

export const DataTableOrder = (props: { data: BuyDataType[] }) => {
  const Actions = (id: string) => {
    return (
      <div>
        <Button></Button>
      </div>
    );
  };
  const StatusChip = (props: { type: -1 | 0 | 1 | number }) => {
    let myType: keyof typeof statusStyle = "0";
    if (props.type === -1 || props.type === 0 || props.type === 1) {
      myType = String(props.type) as keyof typeof statusStyle;
    }
    const statusStyle = {
      "-1": "bg-red-400",
      "0": "bg-slate-800",
      "1": "bg-green-500",
    };
    const statusText = {
      "-1": "cancelled",
      "0": "processing",
      "1": "received",
    };
    return (
      <div
        className={cn(
          "rounded-full px-3 py-1 mx-auto w-full text-white text-center",
          statusStyle[myType]
        )}
      >
        {statusText[myType]}
      </div>
    );
  };
  const CustomTableRowOrder = (props: BuyDataType) => {
    const drinks = props.drinks;
    const randomCost = ()=>{
      return Math.floor((Math.random() * 2000)+500)
    }
    return (
      <TableRow>
        <TableCell>
          <span>{props.id}</span>
          {props.drinks.map((drink, index) => (
            <DrinksDisplay key={index + drink.drinkId} {...drink} cost={randomCost()} />
          ))}
        </TableCell>
        <TableCell className="text-2xl font-bold">
          N{getTotalDrinkSale(drinks)}
        </TableCell>
        <TableCell>
          <StatusChip type={props.status} />
        </TableCell>
        <TableCell>{displayTime(props.time)}</TableCell>
        <TableCell className="capitalize">{props.purchasedFrom}</TableCell>
      </TableRow>
    );
  };
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Latest Orders</CardTitle>
        {/* <Button onClick={toggleAddSale}>{showAddSale?"Hide Sale":"Add Sale"}</Button> */}
      </CardHeader>
      <CardContent>
        {/* { showAddSale && <AddSale />} */}
        <Table>
          <TableHeader className="text-center"> 
            <TableRow className="text-lg font-semibold uppercase">
              <TableHead>items</TableHead>
              <TableHead>sale</TableHead>
              <TableHead>status</TableHead>
              <TableHead>time</TableHead>
              <TableHead>purchased from</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.data.map((buy) => (
              <CustomTableRowOrder key={buy.id} {...buy} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
const SearchInput = () => {
  const [orderSearch, setOrderSearch] = useState("");
  return (
    <div className="flex p-2 gap-2 items-end justify-center">
      <Input
        name="orderSearch"
        type="text"
        placeholder="search"
        value={orderSearch}
        onChange={(e) => setOrderSearch(e.currentTarget.value)}
      />
      <Button>search</Button>
    </div>
  );
};
export default function OrderHistory(props: { data: BuyDataType[] }) {
  const [buyData] = useState(props.data);
  return (
    <>
      <h1 className="py-4 text-6xl font-bold tracking-tighter text-center md:text-8xl">
        Orders
      </h1>
      <SearchInput />
      <DataTableOrder data={buyData} />
    </>
  );
}
