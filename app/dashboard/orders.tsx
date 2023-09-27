import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BuyDataType, useBuyData } from "@/lib/useLocalData";
import { cn, getDrinkById } from "@/lib/utils";

export default function OrderHistory(props: { miniSection?: boolean }) {
  const [buyData, update] = useBuyData();
  // const [showAddSale,setShowAddSale] = useState(false)
  // const toggleAddSale = ()=>{
  //   setShowAddSale(p=>!p)
  // }
  const displayData = props.miniSection ? buyData.slice(0, 6) : buyData;
  const StatusChip = (props: { type: -1 | 0 | 1 }) => {
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
          statusStyle[props.type]
        )}
      >
        {statusText[props.type]}
      </div>
    );
  };
  const CustomTableRowOrder = (props: BuyDataType) => {
    const drink = getDrinkById(props.drinkId);
    return (
      <TableRow>
        <TableCell>{props.id}</TableCell>
        <TableCell>{drink?.name ?? "drink not found"}</TableCell>
        <TableCell>{props.cartonsAmount}</TableCell>
        <TableCell>
          N
          {(props.cartonsAmount * (drink?.buyPrice ?? 0)).toLocaleString(
            "US-en"
          )}
        </TableCell>
        <TableCell>
          <StatusChip type={props.status} />
        </TableCell>
        <TableCell className="capitalize">
          {props.purchasedFrom ?? "no name"}
        </TableCell>
        <TableCell>{props.time}</TableCell>
      </TableRow>
    );
  };
  return (
    <>
      {!props.miniSection && (
        <h1 className="py-4 text-6xl font-bold tracking-tighter text-center md:text-8xl">
          Orders
        </h1>
      )}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Latest Orders</CardTitle>
          {/* <Button onClick={toggleAddSale}>{showAddSale?"Hide Sale":"Add Sale"}</Button> */}
        </CardHeader>
        <CardContent>
          {/* { showAddSale && <AddSale />} */}
          <Table>
            <TableHeader>
              <TableRow className="text-lg font-semibold uppercase">
                <TableHead>id</TableHead>
                <TableHead>drink</TableHead>
                <TableHead>cartons</TableHead>
                <TableHead>sale</TableHead>
                <TableHead>status</TableHead>
                <TableHead>purchased from</TableHead>
                <TableHead>time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.map((buy) => (
                <CustomTableRowOrder key={buy.id} {...buy} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
