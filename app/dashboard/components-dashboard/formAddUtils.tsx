import { Card } from "@/components/ui/card";
import { DrinkCardPropsType } from "@/lib/types";
import { formatterNGN } from "@/lib/utils";
import { useState } from "react";

export const useDrinkHook = () => {
  const [drinkList, setDrinkList] = useState<DrinkCardPropsType[]>([]);
  const addDrink = (data: DrinkCardPropsType) => {
    const drinkCopy = [...drinkList];
    drinkCopy.push(data);
    setDrinkList(drinkCopy);
  };
  const removeDrink = (drinkId: string) => {
    const drinkCopy = [...drinkList];
    setDrinkList(drinkCopy.filter((drink) => drink.drinkId !== drinkId));
  };

  const clearDrinks = ()=>{
    setDrinkList([])
  }
  const values = {
    drinkList,
    removeDrink,
    addDrink,
    clearDrinks,
  };
  return values;
};
export const DrinkCard = (
  props: DrinkCardPropsType & { removeDrink: (id: string) => void }
) => {
  return (
    <Card className="relative flex flex-col p-6">
      <span
        className="absolute top-0 right-0 px-1 text-white font-black bg-red-600 rounded-full text-sm m-1"
        onClick={() => props.removeDrink(props.drinkId)}
      >
        X
      </span>
      <span className="text-sm font-light">{props.drinkId}</span>
      <p className="text-lg">
        {props.drinkName} - {props.sizeCl}cl x{" "}
        <span>{props.cartonsAmount}</span>
      </p>
      <h6 className="text-xl font-semibold">
        {formatterNGN(props.cost * Number(props.cartonsAmount))}
      </h6>
    </Card>
  );
};