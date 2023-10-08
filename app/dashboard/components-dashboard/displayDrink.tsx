import { DrinkInventoryType, DrinksType } from "@/lib/types";
import { formatterNGN, getDrinkById } from "@/lib/utils";
// import { getDrinkById } from "@/lib/utils";

const DisplayDrinks = (props: DrinksType & {inventory:DrinkInventoryType[]}) => {
  const drink = getDrinkById(props.drinkId,props.inventory);
  const cost = props.cost;
  const totalCost = props.cartonsAmount * cost;
  return (
      <div className="flex flex-col">
        <div className="flex gap-3 items-center justify-between">
          <span>
            {drink?.name ?? "drink not found"}
            <br />({formatterNGN(cost)})
          </span>
          <span className="text-lg">X{props.cartonsAmount}</span>
        </div>
        <div className="text-lg font-bold">
          {formatterNGN(totalCost)}
        </div>
      </div>
  );
};
export default DisplayDrinks
