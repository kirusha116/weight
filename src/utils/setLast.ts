import { doc, setDoc } from 'firebase/firestore'
import { getDate } from './getDate'
import type { Target } from '@/types/Target'
import type { ReceivedData } from '@/types/ReceivedData'

export async function setLast<T>(
  data: T,
  target: Target,
  action: ((data: ReceivedData<T>) => void) | null = null,
) {
  const { auth } = await import('@/auth')
  const { db } = await import('@/db')
  if (auth.currentUser) {
    const obj = { data: data, timestamp: Date.now() }
    await setDoc(
      doc(
        db,
        `${auth.currentUser.uid}_new/${target}/${target}`,
        getDate(obj.timestamp),
      ),
      obj,
    )
    if (action !== null) action(obj)
  }
}
