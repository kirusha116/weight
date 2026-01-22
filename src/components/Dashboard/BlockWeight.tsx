import { createWeightProps } from '@/utils/createWeightProps'
import { useMediaQuery } from 'usehooks-ts'
import { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { getDate } from '@/utils/getDate'
import { useDispatch } from 'react-redux'
import { updateBalance } from '@/store/store'
import type { BlockMainContentProps } from '@/types/BlockMainContentProps'
import type { ReceivedData } from '@/types/ReceivedData'

const Block = lazy(() =>
  import('./Block').then(module => ({ default: module.Block })),
)
const BlockMainContent = lazy(() => import('./BlockMainContent'))
const BlockNoData = lazy(() => import('./BlockNoData'))

function BlockWeight() {
  const isMobile = !useMediaQuery('(min-width: 768px), (max-width: 639.5px)')
  const isSmallMobile = !useMediaQuery('(min-width: 400.5px)')
  const dispatch = useDispatch()

  const [currentWeight, setCurrentWeight] = useState<number | null>(null)
  const [currentWeightDate, setCurrentWeightDate] = useState<number | null>(
    null,
  )
  const [startWeight, setStartWeight] = useState<number | null>(null)
  const [targetWeight, setTargetWeight] = useState<number | null>(null)
  const [isDownloaded, setIsDownLoaded] = useState<boolean>(false)

  useEffect(() => {
    const get = async () => {
      const actions = [
        (data: ReceivedData<number>) => {
          setCurrentWeight(data.data)
          setCurrentWeightDate(data.timestamp)
        },
        (data: ReceivedData<number>) => {
          setStartWeight(data.data)
        },
        (data: ReceivedData<number>) => {
          setTargetWeight(data.data)
        },
      ]
      const { getLast } = await import('@/utils/getLast')
      const responce = await Promise.all([
        getLast('currentWeight') as unknown as ReceivedData<number> | undefined,
        getLast('startWeight') as unknown as ReceivedData<number> | undefined,
        getLast('targetWeight') as unknown as ReceivedData<number> | undefined,
      ])
      responce.forEach(async (data, index) => {
        if (data !== undefined) {
          actions[index](data)
          return
        }
      })
      if (
        responce[0] === undefined &&
        responce[1] !== undefined &&
        responce[2] !== undefined
      ) {
        const { setLast } = await import('@/utils/setLast')
        setLast(
          responce[1].data,
          'currentWeight',
          actions[0] as (data: unknown) => void,
        )
      }
      setIsDownLoaded(true)
    }
    get()
  }, [])

  const props: BlockMainContentProps | null = useMemo(() => {
    if (currentWeight && currentWeightDate && startWeight && targetWeight)
      return createWeightProps(
        isMobile || isSmallMobile,
        currentWeight,
        getDate(currentWeightDate),
        startWeight,
        targetWeight,
      )
    return null
  }, [
    currentWeight,
    currentWeightDate,
    isMobile,
    isSmallMobile,
    startWeight,
    targetWeight,
  ])

  const onSave = useCallback(
    async (newValue: number) => {
      const timestamp = Date.now()
      dispatch(updateBalance(200))
      const { setLast } = await import('@/utils/setLast')
      const { auth } = await import('@/auth')
      if (auth.currentUser) setLast(newValue, 'currentWeight')
      setCurrentWeight(newValue)
      setCurrentWeightDate(timestamp)
    },
    [dispatch],
  )

  return (
    <>
      {isDownloaded && (
        <Block>
          {startWeight && targetWeight && props ? (
            <BlockMainContent {...props} onSave={onSave} />
          ) : (
            <BlockNoData
              variant="weight"
              startWeight={!startWeight}
              targetWeight={!targetWeight}
            />
          )}
        </Block>
      )}
    </>
  )
}

export default memo(BlockWeight)
