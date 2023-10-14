import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

export default HomeGrid