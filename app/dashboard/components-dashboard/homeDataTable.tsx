import { BuyDataType, DrinkInventoryType, SellDataType } from "@/lib/types";
import { OrdersDataTable, SalesDataTable } from "./dashboardTables";

export default function HomeDataTable(props:{inventory:DrinkInventoryType[],sell:SellDataType[],buy:BuyDataType[]}){
  const buy=props.buy.slice(0,6)
  const sell=props.sell.slice(0,6)
  return(
    <>
      <SalesDataTable data={sell} inventory={props.inventory}/>
      <OrdersDataTable data={buy} inventory={props.inventory} />
    </>
  )
}