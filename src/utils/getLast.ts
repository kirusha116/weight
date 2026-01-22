import type { Target } from '@/types/Target'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'

export async function getLast(target: Target, order: string = 'timestamp') {
  const result: unknown[] = []
  const { auth } = await import('@/auth')
  const { db } = await import('@/db')
  if (auth.currentUser) {
    const responce = await getDocs(
      query(
        collection(db, `${auth.currentUser.uid}_new/${target}/${target}`),
        orderBy(order, 'desc'),
        limit(1),
      ),
    )
    responce.forEach(el => result.push(el.data()))
  }
  return result[0]
}
