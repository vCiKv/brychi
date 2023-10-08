import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useEffect, useState } from "react";

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
  // const [homeGrid,setHomeGrid] = useState({orderPending:0,todaySales:0})
  // useEffect(()=>{
  //   setHomeGrid({
  //     orderPending:getPendingOrders(props.buy),
  //     todaySales:getTodaySales(props.sell)
  //   })
  // },[])
  return (
    <div className="grid grid-cols-2 gap-8">
      <HomeCard title="orders pending" value={props.orderPending} />
      <HomeCard title="sales today" value={props.todaySales} />
    </div>
  );
};

export default HomeGrid