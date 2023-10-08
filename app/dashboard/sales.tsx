"use client";
import { useState } from "react";
import {
  DrinkInventoryType,
  DrinksType,
  SellDataType,
} from "@/lib/types";
import { SalesDataTable } from "./components-dashboard/dashboardTables";
import SearchInput from "./components-dashboard/search";

export default function SaleHistory(props: {
  data: SellDataType[];
  inventory: DrinkInventoryType[];
}) {
  const [staticSellData] = useState(props.data);
  const [sellData, setSellData] = useState(props.data);

  return (
    <>
      <h1 className="py-4 text-6xl font-bold tracking-tighter text-center md:text-8xl">
        Sales
      </h1>
      <SearchInput
        static={staticSellData}
        set={setSellData}
        inventory={props.inventory}
        searchKeys={["customerName","id","time"]}
      />
      <SalesDataTable data={sellData} inventory={props.inventory} />
    </>
  );
}
