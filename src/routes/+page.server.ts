import type { Actions } from "./$types"
import { Chain } from "$lib/zeus"

const chain = Chain("http://localhost:5173/graphql")

export const actions = {
  create: async (event) => {
    const data = await event.request.formData()
    const firstName = data.get("firstName")?.toString()
    const lastName = data.get("lastName")?.toString()
    const nick = data.get("nick")?.toString()

    if (!firstName || !lastName || !nick) {
      return new Response("Missing data", { status: 400 })
    }

    const result = chain("mutation")({
      createUser: [
        {
          user: {
            firstName,
            lastName,
            nick,
          },
        },
        true,
      ],
    })
  },

  delete: async (event) => {
    const data = await event.request.formData()
    const id = data.get("id")?.toString()

    if (!id) {
      return new Response("Missing data", { status: 400 })
    }

    const result = chain("mutation")({
      deleteUser: [
        {
          id,
        },
        true,
      ],
    })
  },
} satisfies Actions
