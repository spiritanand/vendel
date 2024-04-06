import { doublePrecision, json, pgTable, text } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { QuantityType, SplitType } from "@/libWeb/zodSchemas";

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
});
export type SelectProduct = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

// Relations

// export const formsRelations = relations(forms, ({ many }) => ({
//   pages: many(pages),
//   responses: many(responses),
// }));
// export const pagesRelations = relations(pages, ({ one }) => ({
//   form: one(forms, {
//     fields: [pages.formId],
//     references: [forms.id],
//   }),
// }));
