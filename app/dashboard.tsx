import Home from "./dashboard/home";
import SaleHistory from "./dashboard/sales";
import OrderHistory from "./dashboard/orders";
import Inventory from "./dashboard/inventory";
import DashboardMenu, { TabContent } from "./dashboard/menu";
import axios from "axios";
import { db } from "@/db/planetScaleClient";
import {test} from "@/db/schema"
import { getDataFromDb } from "@/db/getData";

async function getData() {
  // await fetch(`http://localhost:3000/api/inventory`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // }).then(async(res)=>{
  //   console.log("res",res)
  //   if(!res.ok){
  //     return []
  //   }else{
  //     return await res.json()
  //   }
  // })
  const testData = await db.select().from(test)
  if(testData){
    return testData
  }else{
    return []
  }
}

const getApiData = async(type:"buy"|"sell"|"inventory")=>{
  let data:any = []
  const res = await fetch(`http://localhost:3000/api/${type}`)
  console.log("res",res,"\n")
  if(!res.ok){
    return []
  }else{
    data = res.json()
  }
  console.log("data:",data,"\n\n\n")

  return data;
  // await axios.get(`/api/${type}`).then(res=>{
  //   if(res.status === 200){
  //     data = res.data
  //   }else{
  //     console.error(res.data?.message??"an error occurred")
  //   }

  // })
  return data

}
export default async function Dashboard(props:{activeTab:number|string}) {

  // const inventory = await getApiData("inventory")
  // const buy = await getApiData("buy")
  // const sell = await getApiData("sell")

  // const inventory = await getData()
  // const buy = []
  // const sell = []

  // const buy = await fetch(`/api/buy`).then(async(res)=>{
    //   if(!res.ok){
  //     return []
  //   }else{
  //     return await res.json()
  //   }
  // })
  // const sell =await fetch(`/api/sell`).then(async(res)=>{
  //   if(!res.ok){
  //     return []
  //   }else{
    //     return await res.json()
    //   }
  // })

  const myDb = await getDataFromDb()
  const dashboardContent = [
    <Home key={"home-content"} buy={myDb.orders.data} sell={myDb.sales.data}/>,
    <SaleHistory key={"sale-content"} data={myDb.sales.data}/>,
    <OrderHistory key={"order-content"} data={myDb.orders.data}/>,
    <Inventory key={"inventory-content"} data={myDb.inventory.data} />,
    // <TestComp key={"test-content"}/>
  ];
  return (
    <>
      <DashboardMenu />
      <div className="px-4 md:container pt-12 mx-auto">
        {dashboardContent.map((content, index) => (
          <TabContent
            key={"content-" + index}
            activeTab={Number(props.activeTab)}
            tab={index}
          >
            {content}
          </TabContent>
        ))}
      </div>
      <div className="block h-24 bg-transparent"></div>
    </>
  );
}
