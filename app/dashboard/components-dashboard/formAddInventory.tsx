"use client";
import { DrinkCardPropsType, DrinkInventoryType } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import DrinkSelect from "@/components/selectDrinks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { formatterNGN, getDrinkById, getTotalDrinkSale } from "@/lib/utils";
import { addNewInventory, completeNewOrder, completeNewSale } from "@/db/actions";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DrinkCard, useDrinkHook } from "./formAddUtils";

const addInventoryFormSchema = z.object({
  sizeCl: z
    .number({ invalid_type_error: "invalid input" })
    .positive("amount cannot be negative or zero"),
  buyPrice: z
    .number({ invalid_type_error: "invalid input" })
    .positive("amount cannot be negative or zero"),
  sellPrice: z
    .number({ invalid_type_error: "invalid input" })
    .positive("amount cannot be negative or zero"),
  inventory: z
    .number({ invalid_type_error: "invalid input" })
    .positive("amount cannot be negative or zero")
    .multipleOf(0.5,{message:"number must be whole or half"})
    .transform((val)=>String(val)),
  name: z
    .string({ invalid_type_error: "invalid input" })
    .max(50, { message: "name is too long" })
    .nonempty("name is required"),
})
type AddInventoryInputType = z.infer<typeof addInventoryFormSchema>;

const AddInventoryFormInputs: {
  name: keyof AddInventoryInputType;
  type: string;
  required: boolean;
  [key: string]: any;
}[] = [
  {
    name: "name",
    type: "text",
    required: true,
    label: "drink name",
  },
  {
    name: "sizeCl",
    type: "number",
    required: true,
    label: "size in cl",
  },
  {
    name: "buyPrice",
    type: "number",
    required: true,
    label: "buying price",
  },
  {
    name: "sellPrice",
    type: "number",
    required: true,
    label: "selling price",
  },
  {
    name: "inventory",
    type: "number",
    required: true,
    label: "current amount in stock",
    step:"0.5",
  },

];

const AddInventoryForm = (props: {
  inventory: DrinkInventoryType[];
}) => {
  const [loading, setLoading] = useState(false);

  const completeDrinkEdit = async(data:AddInventoryInputType)=>{
    if(loading){
      toast.message("loading...")
      return
    }
    setLoading(true)
    const isComplete = await addNewInventory(data)
    if(isComplete){
      toast.success("added new drink successfully")
      setLoading(false)
      return
    }else{
      setLoading(false)
      toast.error("unable to add new drink")
      return
    }
  }
  const allInventory = props.inventory
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddInventoryInputType>({
    resolver: zodResolver(addInventoryFormSchema),
  });

  return (
    <>
    <form onSubmit={handleSubmit(completeDrinkEdit)} className="space-y-2">     
      {AddInventoryFormInputs.map((input) => (
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
        <Button type="submit" className="my-4" loading={loading}>
          Add Drink
        </Button>
      </div>
    </form>
    </>

  );
};
export const AddInventory = (props: {
  inventory: DrinkInventoryType[];
  toggle: () => void;
}) => {

  return (
    <Card className="p-6">
      <h3 className="py-4 text-3xl font-bold tracking-tight text-center capitalize md:text-5xl">
        Add Drink Data
      </h3>
      <AddInventoryForm
        inventory={props.inventory}
      />
    </Card>
  );
};
