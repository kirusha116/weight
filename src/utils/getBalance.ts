import type { ReceivedData } from '@/types/ReceivedData'

export const getBalance = async () => {
  const { getLast } = await import('@/utils/getLast')
  const response = (await getLast('balance')) as ReceivedData<number>
  if (response === undefined) {
    const { setLast } = await import('@/utils/setLast')
    await setLast(0, 'balance')
    return 0
  }
  const { getDate } = await import('@/utils/getDate')
  if (getDate(response.timestamp) !== getDate()) {
    const { setLast } = await import('@/utils/setLast')
    setLast(response.data + 200, 'balance')
    return response.data + 200
  }
  return response.data
}
