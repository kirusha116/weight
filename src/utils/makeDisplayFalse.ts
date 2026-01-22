export const makeDisplayFalse = async (
  target: 'awards' | 'tasks',
  id: number,
) => {
  const { doc, updateDoc } = await import('firebase/firestore')
  const { auth } = await import('@/auth')
  const { db } = await import('@/db')
  await updateDoc(
    doc(db, `${auth.currentUser?.uid}_new/${target}/${target}`, id.toString()),
    { display: false },
  )
}
