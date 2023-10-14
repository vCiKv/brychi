"use client";
import { DrinkCardPropsType, DrinkInventoryType } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import DrinkSelect from "@/components/selectDrinks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { formatterNGN, getDrinkById, getTotalDrinkSale } from "@/lib/utils";
import { completeNewOrder, completeNewSale } from "@/db/actions";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DrinkCard, useDrinkHook } from "./formAddUtils";
import { useRouter } from "next/navigation";

const orderFormSchema = z.object({
  drinkId: z.string().nonempty("a drink must be selected"),
  cartonsAmount: z
    .number({ invalid_type_error: "invalid input" })
    .positive("amount cannot be negative or zero")
    .multipleOf(0.5, { message: "number must be whole or half" })
    .transform((val) => String(val)),
  purchasedFrom: z
    .string({ invalid_type_error: "invalid input" })
    .max(50, { message: "name is too long" })
    .nonempty("name is required"),
});
type SaleInputType = z.infer<typeof orderFormSchema>;

const orderFormInputs: {
  name: keyof SaleInputType;
  type: string;
  required: boolean;
  [key: string]: any;
}[] = [
  // { name: "item", type: "text", required: true },
  {
    name: "cartonsAmount",
    type: "number",
    required: true,
    step: "0.5",
    label: "carton amount(use to indicate half .5 i.e. 1.5)",
  },
  {
    name: "purchasedFrom",
    type: "text",
    required: false,
    label: "purchaser name",
  },
];
const OrderForm = (props: {
  inventory: DrinkInventoryType[];
  setPurchasedFrom: (name?: string) => void;
  addDrink: (data: DrinkCardPropsType) => void;
}) => {
  const addDrink = props.addDrink;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SaleInputType>({ resolver: zodResolver(orderFormSchema) });
  const addToDrinkList = (
    formData: Pick<DrinkCardPropsType, "cartonsAmount" | "drinkId"> & {
      purchasedFrom?: string;
    }
  ) => {
    const drink = getDrinkById(formData.drinkId, props.inventory);
    if (!drink) {
      toast.error("drink not found");
      return;
    }
    addDrink({
      ...formData,
      cost: drink.sellPrice,
      drinkName: drink.name,
      sizeCl: drink.sizeCl,
    });
    props.setPurchasedFrom(formData.purchasedFrom ?? undefined);
  };
  return (
    <form onSubmit={handleSubmit(addToDrinkList)} className="space-y-2">
      <Controller
        name="drinkId"
        control={control}
        render={({ field }) => (
          <DrinkSelect
            onValueChange={field.onChange}
            defaultValue={field.value}
            drinkData={props.inventory}
          />
        )}
      />
      {orderFormInputs.map((input) => (
        <Input
          key={input.name}
          label={input.label}
          type={input.type}
          required={input.required}
          step={input.step}
          {...register(input.name, {
            valueAsNumber: input.type.toLowerCase() === "number",
          })}
          error={errors[input.name]?.message}
        />
      ))}
      <div className="pt-4">
        <Button type="submit" className="my-4">
          Add Item
        </Button>
      </div>
    </form>
  );
};
export const AddOrder = (props: {
  inventory: DrinkInventoryType[];
  toggle: () => void;
}) => {
  const { addDrink, drinkList, removeDrink, clearDrinks } = useDrinkHook();

  const [loading, setLoading] = useState(false);

  const [purchasedFrom, setPurchasedFrom] = useState<string | undefined>(
    undefined
  );

  const totalSales = getTotalDrinkSale(drinkList);
  const router = useRouter()

  const completeSale = async () => {
    if (loading) {
      toast.error("loading...");
      return;
    }
    if (!purchasedFrom) {
      toast.error("please add a purchase location");
      return;
    }
    setLoading(true);
    const isComplete = await completeNewOrder({
      drinks: drinkList,
      purchasedFrom,
    });
    if (isComplete) {
      toast.success("added order");
      setLoading(false);
      clearDrinks();
      setPurchasedFrom(undefined);
      props.toggle();
      router.refresh()
    } else {
      toast.error("failed to add order");
      setLoading(false);
    }
    return;
  };
  return (
    <Card className="p-6">
      <h3 className="py-4 text-3xl font-bold tracking-tight text-center capitalize md:text-5xl">
        Add new order
      </h3>
      <OrderForm
        inventory={props.inventory}
        setPurchasedFrom={setPurchasedFrom}
        addDrink={addDrink}
      />
      {Number(totalSales) > 0 && <div>Total {formatterNGN(totalSales)}</div>}
      <div className="flex md:gap-1 gap-2 flex-wrap-reverse">
        {drinkList.map((drink, index) => (
          <DrinkCard
            key={index + drink.drinkId}
            {...drink}
            removeDrink={removeDrink}
          />
        ))}
      </div>
      {drinkList.length > 0 && (
        <div className="my-6 flex justify-center">
          <Button onClick={completeSale} loading={loading}>
            Complete Purchase
          </Button>
        </div>
      )}
    </Card>
  );
};
