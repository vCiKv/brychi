"use client";
import { DrinkCardPropsType, DrinkInventoryType } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import DrinkSelect from "@/components/selectDrinks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { formatterNGN, getDrinkById, getTotalDrinkSale } from "@/lib/utils";
import { completeNewOrder, completeNewSale, editDrinksInventory } from "@/db/actions";
import { toast } from "sonner";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DrinkCard, useDrinkHook } from "./formAddUtils";
import { useRouter } from "next/navigation";

const editInventoryFormSchema = z.object({
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
});
type EditInventoryInputType = z.infer<typeof editInventoryFormSchema>;

const editInventoryFormInputs: {
  name: keyof EditInventoryInputType;
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

const EditInventoryForm = (props: {
  inventory: DrinkInventoryType[];
}) => {
  const [loading, setLoading] = useState(false);
  const allInventory = props.inventory
  const [currentDrink,setCurrentDrink] = useState<Partial<DrinkInventoryType>>({
    sizeCl: undefined,
    buyPrice: undefined,
    sellPrice: undefined,
    inventory: undefined,
    name: undefined,
    id:undefined
  })
  const router = useRouter()

  const updateCurrentDrink = (val:string)=>{
    const myCurrentDrink = getDrinkById(val,allInventory)
    if(myCurrentDrink){
      setCurrentDrink(myCurrentDrink)
    }
    return
  }
  const completeDrinkEdit =async(data:EditInventoryInputType)=>{
    if(loading){
      toast.message("loading...")
      return
    }
    if(!currentDrink?.id){
      toast.error("no drink found")
      return
    }
    setLoading(true)
    const isComplete = await editDrinksInventory(currentDrink.id,data)
    if(isComplete){
      toast.success("Edited drink successfully")
      setLoading(false)
      router.refresh()
      return
    }else{
      setLoading(false)
      toast.error("unable to add new drink")
      return
    }
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditInventoryInputType>({
    resolver: zodResolver(editInventoryFormSchema),
    defaultValues:useMemo(()=>{return currentDrink},[currentDrink])
  });
  useEffect(() => {
    reset(currentDrink);
  }, [currentDrink.id]);
  return (
    <>
      <DrinkSelect
        onValueChange={updateCurrentDrink}
        defaultValue={currentDrink?.id??undefined}
        drinkData={props.inventory}
      />
    { currentDrink.id &&   
    <form onSubmit={handleSubmit(completeDrinkEdit)} className="space-y-2">     
      {editInventoryFormInputs.map((input) => (
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
          Edit Drink
        </Button>
      </div>
    </form>}
    </>

  );
};
export const EditInventory = (props: {
  inventory: DrinkInventoryType[];
  toggle: () => void;
}) => {
  return (
    <Card className="p-6">
      <h3 className="py-4 text-3xl font-bold tracking-tight text-center capitalize md:text-5xl">
        Edit Drink Data
      </h3>
      <EditInventoryForm
        inventory={props.inventory}
      />
    </Card>
  );
};
