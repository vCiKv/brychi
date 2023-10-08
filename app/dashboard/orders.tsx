"use client";
import { useState } from "react";
import { BuyDataType, DrinkInventoryType } from "@/lib/types";
import SearchInput from "./components-dashboard/search";
import { OrdersDataTable } from "./components-dashboard/dashboardTables";
import { AddOrder } from "./components-dashboard/formAddOrder";
import useToggle from "@/hooks/useToggle";
import { Button } from "@/components/ui/button";

export default function OrderHistory(props: { data: BuyDataType[], inventory:DrinkInventoryType[] }) {
  const [buyData,setBuyData] = useState(props.data);
  const [staticBuyData] = useState(props.data);
  const [viewAddOrder, toggleAddOrder] = useToggle();

  return (
    <>
      <h1 className="py-4 text-6xl font-bold tracking-tighter text-center md:text-8xl">
        Orders
      </h1>

      <div className="flex justify-center items-center">
        <Button onClick={toggleAddOrder} size={"lg"}>
          Add Order
        </Button>
      </div>

      <div className="my-10">
       {viewAddOrder && <AddOrder inventory={props.inventory} toggle={toggleAddOrder}/>}
      </div>

      <SearchInput
        static={staticBuyData}
        set={setBuyData}
        inventory={props.inventory}
        searchKeys={["id","purchasedFrom","time"]}
      />
      <OrdersDataTable data={buyData} inventory={props.inventory} />
    </>
    
  );
}