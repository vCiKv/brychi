import { makeRandomId } from "@/lib/utils";
import {
  datetime,
  decimal,
  int,
  json,
  mysqlTable,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";
import dayjs from 'dayjs'
import { DrinksType } from "@/lib/types";
// declaring enum in database
export const test = mysqlTable(
  "test",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    sizeCl: int("sizeCl").notNull(),
    buyPrice: int("buyPrice").notNull(),
    sellPrice: int("sellPrice").notNull(),
    inventory: decimal("inventory").notNull(),
  }
);
const now = dayjs().format('YYYY-MM-DD HH:mm:ss')
export const testSell = mysqlTable(
  "testSell",
  {
    id:varchar("id",{length:255}).notNull().primaryKey().unique().default(makeRandomId(8)),
    drinks:json("drinks").$type<DrinksType[]>().notNull(),
    time: datetime("time",{mode:"string"}).default(now).notNull(),
    customerName:varchar("customerName",{length:255})
  }
)

export const testBuy = mysqlTable(
  "testBuy",
  {
    id:varchar("id",{length:255}).notNull().primaryKey().unique().default(makeRandomId(8)),
    drinks:json("drinks").$type<DrinksType[]>().notNull(),
    time: datetime("time",{mode:"string"}).default(now).notNull(),
    purchasedFrom:varchar("purchasedFrom",{length:255}).notNull(),
    status:tinyint("status").default(0).notNull()
  }
)