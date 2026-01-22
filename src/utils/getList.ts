import type { TasksOrAwards } from '@/types/TasksOrAwards'
import {
  collection,
  getDocs,
  query,
  QueryCompositeFilterConstraint,
} from 'firebase/firestore'

export const getList = async (
  target: 'awards' | 'tasks',
  optoins: QueryCompositeFilterConstraint,
): Promise<TasksOrAwards[]> => {
  const result: TasksOrAwards[] = []
  const { auth } = await import('@/auth')
  const { db } = await import('@/db')
  const q = query(
    collection(db, `${auth.currentUser?.uid}_new/${target}/${target}`),
    optoins,
  )
  try {
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => {
      result.push(doc.data() as TasksOrAwards)
    })
  } catch (error) {
    console.error(error)
  }
  return result
}
