import type { TasksOrAwards } from '@/types/TasksOrAwards'

export const getSliceList = async (target: 'awards' | 'tasks', n: number) => {
  const { getLastArrAndUpdate } = await import('@/utils/getLastArrAndUpdate')

  const DayId = await getLastArrAndUpdate(target, n)

  const completed = await getLastArrAndUpdate(
    ('completed' + target[0].toUpperCase() + target.slice(1)) as
      | 'completedAwards'
      | 'completedTasks',
  )

  const { getList } = await import('@/utils/getList')

  const { and, where } = await import('firebase/firestore')

  const filtered = Array.from(new Set([...DayId, ...completed]))

  const list = (await getList(
    target,
    and(
      where('display', '==', true),
      where('id', 'not-in', filtered.slice(0, 10)),
    ),
  )) as TasksOrAwards[]

  return list.filter(({ id }) => !filtered.slice(10).includes(id))
}
