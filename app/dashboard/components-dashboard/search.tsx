"use client"
import { Input } from "@/components/ui/input";
import { DrinkInventoryType, DrinksType } from "@/lib/types";
import { getDrinkById } from "@/lib/utils";
import { useState } from "react";

const SearchInput = <T extends {id:string, drinks?:DrinksType[]},K extends keyof T >(props: {
  set: (set: T[]) => void;
  static: T[];
  inventory: DrinkInventoryType[];
  searchKeys:K[]
  searchDrinks?:boolean

}) => {
  const searchDataString = (items: T[K][]) => {
    let isFound = false
    for (let item of items) {
      if(typeof item !== "string" || typeof item !== "number"){
        return 
      }
      if (
        item &&
        String(item).toLowerCase().includes(saleSearch.toLowerCase())
      ) {
        isFound = true
        return
      }
    }
    return isFound;
  };
  const searchDataArray = (drinks?: DrinksType[]) => {
    if(!drinks){
      return false
    }
    const mySearch = saleSearch.toLowerCase();
    for (let drink of drinks) {
      const currentDrink = getDrinkById(drink.drinkId, props.inventory);
      if (
        String(drink.sizeCl).toLowerCase().includes(mySearch) ||
        currentDrink?.name.toLowerCase().includes(mySearch)
      ) {
        return true;
      }
    }
    return false;
  };
  const setData = props.set;
  const staticArr = props.static;
  const [saleSearch, setSaleSearch] = useState("");
  const resetSearch = () => {
    setData(staticArr);
    setSaleSearch("");
  };
  const getSearchKeys = (data:T)=>{
   return props.searchKeys.map(key=>data[key])
    // const mySearchKeys = []
    // for(let item of props.searchKeys){
    //   mySearchKeys.push(data[item])
    // }
    // return mySearchKeys
  }

  const searchItem = (str: string) => {
    setSaleSearch(str);
    if (!str || str === "") {
      resetSearch();
      return;
    }
    const dataCopy = [...staticArr].filter(
      (data) =>
        searchDataString(getSearchKeys(data)) ||
        (searchDataArray(data.drinks))
    );
    setData(dataCopy);
  };
  return (
    <div className="flex p-2 gap-2 items-end justify-center">
      <Input
        name="saleSearch"
        type="text"
        placeholder="search"
        value={saleSearch}
        onChange={(e) => {
          searchItem(e.target.value);
        }}
        containerClassName="w-full max-w-[500px]"
      />
      {/* <Button onClick={searchItem}>search</Button> */}
      {/* {saleSearch && (
        <Button onClick={resetSearch} variant={"destructive"}>
          reset
        </Button>
      )} */}
    </div>
  );
};

export default SearchInput