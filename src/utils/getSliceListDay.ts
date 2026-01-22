import type { TasksOrAwards } from '@/types/TasksOrAwards'

export const getSliceListDay = async (
  target: 'awards' | 'tasks',
  n: number,
) => {
  const { getLastArrAndUpdate } = await import('@/utils/getLastArrAndUpdate')

  const DayId = await getLastArrAndUpdate(target, n)

  const completed = await getLastArrAndUpdate(
    ('completed' + target[0].toUpperCase() + target.slice(1)) as
      | 'completedAwards'
      | 'completedTasks',
  )

  const { getList } = await import('@/utils/getList')

  const { and, where } = await import('firebase/firestore')

  const options = [
    where('display', '==', true),
    where(
      'id',
      'in',
      DayId.filter(id => !completed.includes(id)),
    ),
  ]

  return (await getList(target, and(...options))) as TasksOrAwards[]
}
