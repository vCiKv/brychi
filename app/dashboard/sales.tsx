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
import { SellDataType, useSellData } from "@/lib/useLocalData";
import { getDrinkById } from "@/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AddSale = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formInputAddSales = [
    { name: "item", type: "text", required: true },
    { name: "cartons", type: "number", required: true },
    { name: "customerName", type: "text", required: false },
  ];
  const submit = (data: any) => {
    console.log(data);
  };
  return (
    <Card className="p-6">
      <h3 className="py-4 text-3xl font-bold tracking-tight text-center capitalize md:text-5xl">
        Add new sale
      </h3>
      <form onSubmit={handleSubmit(submit)} className="space-y-2">
        {formInputAddSales.map((input) => (
          <Input
            key={input.name}
            label={input.name}
            type={input.type}
            required={input.required}
            {...register(input.name)}
          />
        ))}
        <div className="pt-4">
          <Button type="submit" className="my-4">
            Add Sale
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default function SaleHistory(props: { miniSection?: boolean }) {
  const [sellData, update] = useSellData();
  const displayData = props.miniSection ? sellData.slice(0, 6) : sellData;

  const [showAddSale, setShowAddSale] = useState(false);
  const toggleAddSale = () => {
    setShowAddSale((p) => !p);
  };
  const CustomTableRowSales = (props: SellDataType) => {
    const drink = getDrinkById(props.drinkId);
    return (
      <TableRow>
        <TableCell>{props.id}</TableCell>
        <TableCell>{drink?.name ?? "drink not found"}</TableCell>
        <TableCell>{props.cartonsAmount}</TableCell>
        <TableCell>
          N
          {(props.cartonsAmount * (drink?.sellPrice ?? 0)).toLocaleString(
            "US-en"
          )}
        </TableCell>
        <TableCell className="capitalize">
          {props.customerName ?? "no name"}
        </TableCell>
        <TableCell>{props.time}</TableCell>
      </TableRow>
    );
  };
  return (
    <>
      {!props.miniSection && (
        <h1 className="py-4 text-6xl font-bold tracking-tighter text-center md:text-8xl">
          Sales
        </h1>
      )}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Latest Sales</CardTitle>
          <Button onClick={toggleAddSale}>
            {showAddSale ? "Hide Sale" : "Add Sale"}
          </Button>
        </CardHeader>
        <CardContent>
          {showAddSale && <AddSale />}
          <Table>
            <TableHeader>
              <TableRow className="text-lg font-semibold uppercase">
                <TableHead>id</TableHead>
                <TableHead>drink</TableHead>
                <TableHead>cartons</TableHead>
                <TableHead>sale</TableHead>
                <TableHead>customer</TableHead>
                <TableHead>time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.slice(0, 6).map((sell) => (
                <CustomTableRowSales key={sell.id} {...sell} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
