export const updateId = function <T>(n: number, arr: T[]): T[] {
  if (n >= arr.length) return arr
  let i = 0
  const result: T[] = []
  while (i < n) {
    const index = Math.floor(Math.random() * arr.length)
    if (!result.includes(arr[index])) {
      result.push(arr[index])
      i++
    }
  }
  return result
}
