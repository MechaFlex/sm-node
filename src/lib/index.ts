export function isDark(hex: string): boolean {
  const [r, , g, , b] = hex.split("").map((c) => parseInt(c, 16))

  const threshold = 12

  return r < threshold && g < threshold // && b < threshold + 3
}

export const apiUrl = "http://localhost:5173/graphql"
