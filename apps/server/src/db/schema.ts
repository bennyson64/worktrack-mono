import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";

export const works = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  status: text("status").notNull().default("todo"),
  createdAt: timestamp("created_at").defaultNow(),
});
