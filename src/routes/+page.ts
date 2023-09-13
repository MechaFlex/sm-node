import { apiUrl } from "$lib"
import { Chain } from "$lib/zeus"
import type { PageLoad } from "./$types"

const chain = Chain(apiUrl)

export const load: PageLoad = async () => {
  const result = await chain("query")({
    users: {
      id: true,
      nameWithNick: true,
    },
  })

  return {
    props: {
      users: result.users,
    },
  }
}
