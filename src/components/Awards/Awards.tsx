import { useMediaQuery } from 'usehooks-ts'
import { lazy, memo, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks'

const Item = lazy(() => import('../Item'))
const AwardsDay = lazy(() => import('./AwardsDay'))

function Awards() {
  const isMobile = !useMediaQuery('(min-width: 768px)')

  const awards = useAppSelector(({ awards }) => awards)
  const balance = useAppSelector(({ balance }) => balance)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const get = async () => {
      if (awards === null) {
        const { getAwards } = await import('@/store/awardsSlice')
        dispatch(getAwards())
      }
    }
    get()
  }, [awards, dispatch])

  return (
    <div className="flex flex-wrap gap-1">
      {awards && <AwardsDay styled={!isMobile} />}
      {awards &&
        [...awards]
          .sort((a, b) => b.price - a.price)
          .map(({ icon, title, price, id, daily }) => (
            <Item
              style={{ width: isMobile ? '' : 'calc(50% - 2px)' }}
              key={id}
              icon={icon}
              title={title}
              price={'-' + Math.abs(price).toString()}
              onButtonClick={async () => {
                if (balance === null) return
                const newBalance = Number(balance) + Number(price)
                if (newBalance < 0) {
                  const { warningToast } = await import('@/utils/warningToast')
                  warningToast('Не хватает звёздочек(')
                  return
                }
                const { successToast } = await import('@/utils/successToast')
                const { updateBalance, updateAwards } = await import(
                  '@/store/store'
                )
                dispatch(updateBalance(newBalance))
                dispatch(updateAwards({ id, daily }))
                successToast('Куплено! -' + Math.abs(Number(price)))
              }}
            />
          ))}
    </div>
  )
}

export default memo(Awards)
