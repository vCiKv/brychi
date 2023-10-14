"use client"
import { DataTable } from "@/components/dataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DrinkInventoryType } from "@/lib/types";
import { formatterNGN } from "@/lib/utils";
import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import SearchInput from "./components-dashboard/search";
import useToggle from "@/hooks/useToggle";
import { AddOrder } from "./components-dashboard/formAddOrder";
import { EditInventory } from "./components-dashboard/formEditInventory";
import { AddInventory } from "./components-dashboard/formAddInventory";

export default function Inventory(props:{data:DrinkInventoryType[]}) {
  // const [drinkData, setDrinkData] = useState(props.data);
  const [drinkData, setDrinkData] = useState(props.data);
  const [viewEditInventory, toggleEditInventory] = useToggle();
  const [viewAddInventory, toggleAddInventory] = useToggle();

  const SortHeader = (props:{column:Column<any,any>,title:string})=>{
    const column = props.column
    return(
      <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="uppercase"
    >
      {props.title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
    )
  }
  const centiLitersToLiters = (value:number|string)=>{
    const amount = Number(value)
    if(amount>=1000){
      return (amount/1000)+"L"
    }else{
      return amount+"cl"
    }
  }
  const columns: ColumnDef<DrinkInventoryType>[] = [
    {
      accessorKey: "id",
      header:"id"
    },
    {
      accessorKey: "name",
      header: ({ column }) => <SortHeader column={column} title="name"/>
    },
    {
      accessorKey: "sizeCl",
      header: ({ column }) => <SortHeader column={column} title="size"/>,
      cell:({row})=>{
        const size = row.getValue("sizeCl") as number
        return centiLitersToLiters(size)
      }

    },
    {
      accessorKey: "buyPrice",
      header: ({ column }) => <SortHeader column={column} title="Buy price"/>,
      cell:({row})=>{
        const price = row.getValue("buyPrice") as number
        return formatterNGN(price)
      }
    },
    {
      accessorKey: "sellPrice",
      header: ({ column }) => <SortHeader column={column} title="Sell price"/>,
      cell:({row})=>{
        const price = row.getValue("sellPrice") as number
        return formatterNGN(price)
      }
    },
    {
      accessorKey: "",
      header:"margin",
      cell:({row})=>{
        const buyPrice = row.getValue("buyPrice") as number
        const sellPrice = row.getValue("sellPrice") as number
        return formatterNGN(sellPrice-buyPrice)
      }
    },
    {
      accessorKey:"inventory",
      header: ({ column }) => <SortHeader column={column} title="stock"/>,
    }
  ];
  return (
    <>
      <h1 className="py-4 text-6xl font-bold tracking-tighter text-center md:text-8xl">
        Inventory
      </h1>
      <div className="grid grid-cols-2 gap-6 mb-10">
        <Button onClick={toggleAddInventory}>
          Add Inventory
        </Button> 
        <Button onClick={toggleEditInventory}>
          Edit Inventory
        </Button>
      </div>
      <div className="my-10 space-y-6">
        {viewEditInventory && <EditInventory inventory={props.data} toggle={toggleEditInventory}/>}
        {viewAddInventory && <AddInventory inventory={props.data} toggle={toggleEditInventory}/>}
      </div>

      <SearchInput
        inventory={drinkData}
        set={setDrinkData}
        static={props.data}
        searchKeys={["id","inventory","name","sizeCl","buyPrice","sellPrice"]}
      />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Drink List</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable data={drinkData} columns={columns}/>
        </CardContent>
      </Card>
    </>
  );
}
