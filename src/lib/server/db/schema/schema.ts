import { sqliteTable, text } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .default(sql`(hex(randomblob(3)))`),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  nick: text("nick").notNull(),
})

export type User = typeof users.$inferSelect
export type CreateUser = typeof users.$inferInsert

/*export const speakersList = sqliteTable("speakersList", {
  user: text("user")
    .notNull()
    .references(() => users.id),
  entryTime: text("entryTime")
    .notNull()
    .default(sql`datetime('now')`),
})

export const returningSpeakers = sqliteTable("returningSpeakers", {
  user: text("user")
    .notNull()
    .references(() => users.id),
  entryTime: text("entryTime")
    .notNull()
    .default(sql`datetime('now')`),
})*/
