import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { DrinksType } from "@/lib/types";
import { getDrinkById } from "@/lib/utils";

const DrinksDisplay = (props: DrinksType) => {
  const drink = getDrinkById(props.drinkId);
  const cost = props.cost;
  const totalCost = props.cartonsAmount * cost;
  return (
      <div className="flex flex-col">
        <div className="flex gap-3 items-center justify-between">
          <span>
            {drink?.name ?? "drink not found"}
            <br />(N{cost.toLocaleString("US-en")})
          </span>
          <span className="text-lg">X{props.cartonsAmount}</span>
        </div>
        <div className="text-lg font-bold">
          N{totalCost.toLocaleString("US-en")}
        </div>
      </div>
  );
};
export default DrinksDisplay
