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
import { DrinkType, cn, getDrinkById, getInitData } from "@/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Inventory(props:{miniSection?:boolean}) {
  const [drinkData, setDrinkData] = useState<DrinkType[]>(getInitData());

  const CustomTableRowInventory = (props: DrinkType) => {
    return (
      <TableRow>
        <TableCell>{props.id}</TableCell>
        <TableCell>{props.name}</TableCell>
        <TableCell>{props.sizeCl}cl</TableCell>
        <TableCell>N{props.buyPrice.toLocaleString("US-en")}</TableCell>
        <TableCell>N{props.sellPrice.toLocaleString("US-en")}</TableCell>
        <TableCell>{props.pieces}</TableCell>
      </TableRow>
    );
  };
  return (
    <>
      <h1 className="py-4 text-6xl font-bold tracking-tighter text-center md:text-8xl">
        Inventory
      </h1>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Drink List</CardTitle>
          {/* <Button onClick={toggleAddSale}>{showAddSale?"Hide Sale":"Add Sale"}</Button> */}
        </CardHeader>
        <CardContent>
          {/* { showAddSale && <AddSale />} */}
          <Table>
            <TableHeader>
              <TableRow className="text-lg font-semibold uppercase">
                <TableHead>id</TableHead>
                <TableHead>name</TableHead>
                <TableHead>size</TableHead>
                <TableHead>buy price</TableHead>
                <TableHead>sell price</TableHead>
                <TableHead>number in pack</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drinkData.map((drink) => (
                <CustomTableRowInventory key={drink.id} {...drink} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
