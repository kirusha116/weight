export const setLastArr = async (
  id: number,
  target: 'completedAwards' | 'completedTasks',
) => {
  const { getLast } = await import('./getLast')
  const { data } = (await getLast(target)) as { data: number[] }
  data.push(id)
  const { setLast } = await import('./setLast')
  setLast(data, target)
}
