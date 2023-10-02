"use client";
import DrinkSelect from "@/components/DrinkSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { displayTime, getDrinkById, getTotalDrinkSale } from "@/lib/utils";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DrinksDisplay from "./drinkDisplay";
import { DrinksType, SellDataType } from "@/lib/types";

export interface DrinkCardPropsType extends DrinksType {
  drinkName: string;
}

const AddSale = () => {
  const DrinkCard = (props: DrinkCardPropsType) => {
    return (
      <Card className="relative flex flex-col p-6">
        <span
          className="absolute top-0 right-0 px-1 text-white font-black bg-red-600 rounded-full text-sm m-1"
          onClick={() => removeDrink(props.drinkId)}
        >
          X
        </span>
        <span className="text-sm font-light">{props.drinkId}</span>
        <p className="text-lg">
          {props.drinkName} x <span>{props.cartonsAmount}</span>
        </p>
        <h6 className="text-xl font-semibold">
          N{(props.cost * Number(props.cartonsAmount)).toLocaleString("US-en")}
        </h6>
      </Card>
    );
  };
  const [drinkList, setDrinkList] = useState<DrinkCardPropsType[]>([]);
  const [customerName, setCustomerName] = useState<string | undefined>(
    undefined
  );
  type SaleInputType = Pick<DrinkCardPropsType, "cartonsAmount" | "drinkId"> & {
    customerName?: string;
  };
  const addDrink = (data: DrinkCardPropsType) => {
    const drinkCopy = [...drinkList];
    drinkCopy.push(data);
    setDrinkList(drinkCopy);
  };
  const removeDrink = (drinkId: string) => {
    const drinkCopy = [...drinkList];
    setDrinkList(drinkCopy.filter((drink) => drink.drinkId !== drinkId));
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SaleInputType>();
  const formInputAddSales: {
    name: keyof SaleInputType;
    type: string;
    required: boolean;
  }[] = [
    // { name: "item", type: "text", required: true },
    { name: "cartonsAmount", type: "number", required: true },
    { name: "customerName", type: "text", required: false },
  ];

  const totalSales = getTotalDrinkSale(drinkList);
  const addSale = (
    formData: Pick<DrinkCardPropsType, "cartonsAmount" | "drinkId"> & {
      customerName?: string;
    }
  ) => {
    const drink = getDrinkById(formData.drinkId);
    if (!drink) {
      return;
    }
    addDrink({
      ...formData,
      cost: drink?.sellPrice,
      drinkName: drink.name,
      sizeCl: drink.sizeCl,
    });
    setCustomerName(formData.customerName ?? undefined);
  };
  const addNewSaleToDatabase = (data: {
    drinks: DrinkCardPropsType[];
    customerName?: string;
  }) => {
    alert("i was touched");
    const newSale = {
      id: "generatedId",
      drinks: JSON.stringify(data.drinks),
      customerName: data.customerName ?? undefined,
      date: new Date(),
    };
    // console.log("new sale",newSale)
  };
  return (
    <Card className="p-6">
      <h3 className="py-4 text-3xl font-bold tracking-tight text-center capitalize md:text-5xl">
        Add new sale
      </h3>
      <form onSubmit={handleSubmit(addSale)} className="space-y-2">
        <Controller
          name="drinkId"
          control={control}
          render={({ field }) => (
            <DrinkSelect
              onValueChange={field.onChange}
              defaultValue={field.value}
            />
          )}
        />
        {formInputAddSales.map((input) => (
          <Input
            key={input.name}
            label={input.name}
            type={input.type}
            required={input.required}
            {...register(input.name, {
              valueAsNumber: input.type.toLocaleLowerCase() === "number",
            })}
          />
        ))}
        <div className="pt-4">
          <Button type="submit" className="my-4">
            Add Item
          </Button>
        </div>
      </form>
      {Number(totalSales) > 0 && <div>Total N{totalSales.toLocaleString("US-en")}</div>}
      <div className="flex md:gap-1 gap-y-2 flex-wrap-reverse">
        {drinkList.map((drink,index) => (
          <DrinkCard key={index+drink.drinkId} {...drink} />
        ))}
      </div>
      <div className="my-6 flex justify-center">
        <Button
          onClick={() =>
            addNewSaleToDatabase({ drinks: drinkList, customerName })
          }
        >
          Complete Purchase
        </Button>
      </div>
    </Card>
  );
};
// const EditSale = (
//   props: Pick<SellDataType, "customerName" | "cartonsAmount" | "drinkId">
// ) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const formInputAddSales = [
//     { name: "item", type: "text", required: true },
//     { name: "cartonsAmount", type: "number", required: true },
//     { name: "customerName", type: "text", required: false },
//   ];
//   const submit = (data: any) => {
//     console.log(data);
//   };
//   return (
//     <Card className="p-6">
//       <h3 className="py-4 text-3xl font-bold tracking-tight text-center capitalize md:text-5xl">
//         Add new sale
//       </h3>
//       <form onSubmit={handleSubmit(submit)} className="space-y-2">
//         {formInputAddSales.map((input) => (
//           <Input
//             key={input.name}
//             label={input.name}
//             type={input.type}
//             required={input.required}
//             {...register(input.name)}
//           />
//         ))}
//         <div className="pt-4">
//           <Button type="submit" className="my-4">
//             Add Sale
//           </Button>
//         </div>
//       </form>
//     </Card>
//   );
// };
export const DataTableSales = (props: { data: SellDataType[] }) => {
  const [showAddSale, setShowAddSale] = useState(false);
  const toggleAddSale = () => {
    setShowAddSale((p) => !p);
  };
  const CustomTableRowSales = (props: SellDataType) => {
    const drinks = props.drinks;
    return (
      <TableRow>
        <TableCell>
          <span>{props.id}</span>
          {props.drinks.map((drink, index) => (
            <DrinksDisplay key={index + drink.drinkId} {...drink} />
          ))}
        </TableCell>
        <TableCell className="text-2xl font-bold">
          N{getTotalDrinkSale(drinks)}
        </TableCell>
        <TableCell>{displayTime(props.time)}</TableCell>
        <TableCell className="capitalize">
          {props.customerName ?? "no name"}
        </TableCell>
      </TableRow>
    );
  };
  return (
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
              <TableHead>items</TableHead>
              <TableHead>sale</TableHead>
              <TableHead>time</TableHead>
              <TableHead>customer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.data.map((sell) => (
              <CustomTableRowSales key={sell.id} {...sell} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
const SearchInput = () => {
  const [saleSearch, setSaleSearch] = useState("");
  return (
    <div className="flex p-2 gap-2 items-end justify-center">
      <Input
        name="saleSearch"
        type="text"
        placeholder="search"
        value={saleSearch}
        onChange={(e) => setSaleSearch(e.currentTarget.value)}
      />
      <Button>search</Button>
    </div>
  );
};
export default function SaleHistory(props: { data: SellDataType[] }) {
  const [sellData] = useState(props.data);
  return (
    <>
      <h1 className="py-4 text-6xl font-bold tracking-tighter text-center md:text-8xl">
        Sales
      </h1>
      <SearchInput />
      <DataTableSales data={sellData} />
    </>
  );
}
