interface invoiceDataType{
  id:string,
  drinks: DrinksType[],
  time: string,
} 
export interface DrinksType{
  drinkId:string;
  cartonsAmount:number;
  cost:number;
  sizeCl:number
}
export interface SellDataType extends invoiceDataType {
  customerName:string | null
}
export interface BuyDataType extends invoiceDataType {
  purchasedFrom: string,
  status: -1 | 0 | 1 | number
}
export interface DrinkInventoryType {
  id: string;
  name: string;
  sizeCl: number;
  buyPrice: number;
  sellPrice: number;
  inventory: number | string;
}