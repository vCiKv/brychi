import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectProps } from "@radix-ui/react-select";
import { Label } from "./ui/input";
import { DrinkInventoryType } from "@/lib/types";
export interface SelectPropsType  extends SelectProps {
}

export default function SelectDrinks(props: SelectPropsType & {drinkData:DrinkInventoryType[]} ) {

  const drinkData = props.drinkData;
  return (
    <div className="w-full">
    <Label htmlFor={props.name}>Drinks</Label>
    <Select {...props} >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Drink" />
      </SelectTrigger>
      <SelectContent className="max-h-[320px] overflow-y-auto">
        <SelectGroup >
          <SelectLabel>Drinks</SelectLabel>
          {drinkData.map((drink) => (
            <SelectItem key={"select-" + drink.id} value={drink.id}>
              {drink.name} - {drink.sizeCl}cl
            </SelectItem>
          ))}
        </SelectGroup>        
      </SelectContent>

    </Select>
    </div>
  );
}
