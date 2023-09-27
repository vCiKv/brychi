"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SaleHistory from "./sales";
import OrderHistory from "./orders";

const HomeGrid = () => {
  const testValues = [
    { title: "orders pending", value: 4 },
    { title: "sales today", value: 8 },
  ];
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
  return (
    <div className="grid grid-cols-2 gap-8">
      {testValues.map((home) => (
        <HomeCard key={home.title} {...home} />
      ))}
    </div>
  );
};



export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="py-4 text-6xl font-bold tracking-tighter text-center md:text-8xl">
        Home
      </h1>
      <HomeGrid/>      
      <SaleHistory miniSection/>
      <OrderHistory miniSection/>
      {/* <p>orders</p>
      <ul>
        <li>add</li>
        <li>view</li>
        <li>update</li>
      </ul> */}
    </div>
  );
}
