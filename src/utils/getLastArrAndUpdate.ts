import type { ReceivedData } from '@/types/ReceivedData'

export const getLastArrAndUpdate = async (
  target: 'awards' | 'tasks' | 'completedAwards' | 'completedTasks',
  n: number = 1,
) => {
  const link1 = {
    a: 'awardsDay',
    t: 'tasksDay',
    c: target,
  }[target[0]] as
    | 'awardsDay'
    | 'tasksDay'
    | 'completedAwards'
    | 'completedTasks'

  const { getLast } = await import('@/utils/getLast')
  const recieved = (await getLast(link1)) as ReceivedData<number[]>

  if (recieved === undefined) {
    const { setLast } = await import('@/utils/setLast')
    await setLast([], link1)
    return []
  }

  const { getDate } = await import('@/utils/getDate')

  if (getDate(recieved.timestamp) === getDate()) return recieved.data

  const { setLast } = await import('@/utils/setLast')

  if (target[0] === 'c') {
    setLast([], link1)
    return []
  }

  const { updateId } = await import('@/utils/updateId')
  const { doc, getDoc } = await import('firebase/firestore')

  const link2 = {
    a: 'displayedAwards',
    t: 'displayedTasks',
  }[target[0]] as 'displayedAwards' | 'displayedTasks'

  const { auth } = await import('@/auth')
  const { db } = await import('@/db')

  const { displayed } = (
    await getDoc(doc(db, `${auth.currentUser?.uid}_new`, link2))
  ).data() as { displayed: number[] }

  console.log(displayed)

  const updatedId = updateId(n, displayed)

  console.log(updatedId)

  await setLast(updatedId, link1)
  return updatedId
}
