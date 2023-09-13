import SchemaBuilder from "@pothos/core"
import { users, type User, type CreateUser } from "../db/schema/schema"
import { db } from "../db/drizzle"
import { printSchema, lexicographicSortSchema } from "graphql"
import { writeFileSync } from "fs"
import { eq } from "drizzle-orm"

export const builder = new SchemaBuilder({})

const UserType = builder.objectRef<User>("User").implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    firstName: t.exposeString("firstName"),
    lastName: t.exposeString("lastName"),
    nick: t.exposeString("nick"),
    name: t.string({
      resolve: (user) => `${user.firstName} ${user.lastName}`,
    }),
    nameWithNick: t.string({
      resolve: (user) => `${user.firstName} "${user.nick}" ${user.lastName}`,
    }),
  }),
})

const CreateUserType = builder.inputRef<CreateUser>("CreateUser").implement({
  fields: (t) => ({
    firstName: t.string({ required: true }),
    lastName: t.string({ required: true }),
    nick: t.string({ required: true }),
  }),
})

builder.queryType({
  fields: (t) => ({
    users: t.field({
      type: [UserType],
      resolve: () => {
        const selectedUsers = db.select().from(users).all()
        return selectedUsers
      },
    }),
  }),
})

builder.mutationType({
  fields: (t) => ({
    createUser: t.field({
      type: "Boolean",
      args: {
        user: t.arg({ type: CreateUserType, required: true }),
      },
      resolve: (_, args) => {
        db.insert(users)
          .values({
            firstName: args.user.firstName,
            lastName: args.user.lastName,
            nick: args.user.nick,
          })
          .execute()

        return true
      },
    }),
    deleteUser: t.field({
      type: "Boolean",
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: (_, args) => {
        db.delete(users).where(eq(users.id, args.id)).execute()
        return true
      },
    }),
  }),
})

/*builder.subscriptionType({
  fields: (t) => ({
    userCreated: t.field({
      type: UserType,
      subscribe: () => {
        return db.select().from(users).
      },
      resolve: (user) => user,
    }),
  }),
})*/

export const schema = builder.toSchema()
writeFileSync(
  "./src/lib/server/graphql/generated_schema.graphql",
  printSchema(lexicographicSortSchema(schema))
)
