import {
  doublePrecision,
  json,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { QuantityType, SplitType } from "./zodSchemas";
import { relations } from "drizzle-orm";
import { z } from "zod";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  image: text("image"),
});

export const products = pgTable("product", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  price: doublePrecision("price").notNull(),
  image: text("image"),
  quantity: json("quantity")
    .$type<QuantityType>()
    .default({ isLimited: false })
    .notNull(),
  split: json("split").$type<SplitType>().default({ isSplit: false }).notNull(),
  createdAt: timestamp("createdAt", { mode: "string" })
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
});
export type SelectProduct = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

export const transactions = pgTable("transactions", {
  id: text("id").notNull().primaryKey(),
  from: text("from")
    .notNull()
    .references(() => users.id),
  to: text("to")
    .notNull()
    .references(() => users.id),
  productId: text("productId")
    .notNull()
    .references(() => products.id),
  amount: doublePrecision("amount").notNull(),
  createdAt: timestamp("createdAt", { mode: "string" })
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
});
export type SelectTx = typeof transactions.$inferSelect;
export type InsertTx = typeof transactions.$inferInsert;
export const zodInsertTx = z.custom<InsertTx>();

// Relations

// export const formsRelations = relations(forms, ({ many }) => ({
//   pages: many(pages),
//   responses: many(responses),
// }));
export const txRelations = relations(transactions, ({ one }) => ({
  form: one(products, {
    fields: [transactions.productId],
    references: [products.id],
  }),
}));
