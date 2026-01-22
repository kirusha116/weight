import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks'
import { createCalloriesProps } from '@/utils/createCalloriesProps'
import { useMediaQuery } from 'usehooks-ts'
import { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import type { ReceivedData } from '@/types/ReceivedData'

const Block = lazy(() =>
  import('./Block').then(module => ({ default: module.Block })),
)
const BlockMainContent = lazy(() => import('./BlockMainContent'))
const BlockNoData = lazy(() => import('./BlockNoData'))

function BlockCallories() {
  const isMobile = !useMediaQuery('(min-width: 768px), (max-width: 639.5px)')
  const isSmallMobile = !useMediaQuery('(min-width: 400.5px)')
  
  const balance = useAppSelector(({ balance }) => balance)

  const [currentCallories, setCurrentCallories] = useState<number | null>(null)
  const [maxCallories, setMaxCallories] = useState<number | null>(null)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const get = async () => {
      const { getLast } = await import('@/utils/getLast')
      const maxCallories = (await getLast(
        'maxCallories',
      )) as ReceivedData<number>
      if (maxCallories !== undefined) {
        setMaxCallories(maxCallories.data)
        const currentCallories = (await getLast(
          'currentCallories',
        )) as ReceivedData<number>
        const { getDate } = await import('@/utils/getDate')
        if (
          currentCallories === undefined ||
          getDate(currentCallories.timestamp) !== getDate()
        ) {
          const { setLast } = await import('@/utils/setLast')
          setLast(
            0,
            'currentCallories',
            setCurrentCallories as (data: unknown) => void,
          )
        } else setCurrentCallories(currentCallories.data)
      } else return
    }
    get()
  }, [])

  const props = useMemo(() => {
    if (currentCallories === null || maxCallories === null) return null
    return createCalloriesProps(
      isMobile || isSmallMobile,
      currentCallories,
      maxCallories,
    )
  }, [currentCallories, isMobile, isSmallMobile, maxCallories])

  const onSave = useCallback(
    async (newValue: number) => {
      if (balance === null) return
      const { updateBalance } = await import('@/store/store')
      if (currentCallories === null || maxCallories === null) return
      if (newValue && !currentCallories) dispatch(updateBalance(balance + 100))
      if (newValue + currentCallories > maxCallories) {
        const { warningToast } = await import('@/utils/warningToast')
        const newBalance = balance - 200
        dispatch(updateBalance(newBalance < 0 ? newBalance : 0))
        warningToast('Переела! -200')
      }
      const { setLast } = await import('@/utils/setLast')
      setLast(
        currentCallories + newValue,
        'currentCallories',
        setCurrentCallories as (data: unknown) => void,
      )
    },
    [balance, currentCallories, dispatch, maxCallories],
  )

  return (
    <Block>
      {maxCallories && currentCallories && props ? (
        <BlockMainContent {...props} onSave={onSave} />
      ) : (
        <BlockNoData variant="callories" />
      )}
    </Block>
  )
}
export default memo(BlockCallories)
