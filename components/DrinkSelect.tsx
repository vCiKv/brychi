"use client"
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

import { getInitData } from "@/lib/utils";
import { Label } from "./ui/input";
import { useEffect } from "react";
export interface SelectPropsType  extends SelectProps {
}

export default function DrinkSelect(props: SelectPropsType) {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
        if ((e.target as Element).closest('[data-scrollable]')) return;
        e.stopPropagation();
    };

    const handleTouchMove = (e: TouchEvent) => {
        if ((e.target as Element).closest('[data-scrollable]')) return;
        e.stopPropagation();
    };

    document.addEventListener('wheel', handleWheel, true);
    document.addEventListener('touchmove', handleTouchMove, true);

    return () => {
        document.removeEventListener('wheel', handleWheel, true);
        document.removeEventListener('touchmove', handleTouchMove, true);
    };
}, []);
  const drinkData = getInitData();
  return (
    <div className="max-h-[210px] w-full overflow-y-scroll" data-scrollable>
    <Label htmlFor={props.name}>Drinks</Label>
    <Select {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Drink" />
      </SelectTrigger>
      <SelectContent className="overflow-auto">
        <SelectGroup>
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
