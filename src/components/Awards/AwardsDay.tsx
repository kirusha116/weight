import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks'
import { lazy, memo, useEffect } from 'react'

const Item = lazy(() => import('../Item'))

function AwardsDay({ styled }: { styled?: boolean }) {
  const awardsDay = useAppSelector(({ awardsDay }) => awardsDay)
  const balance = useAppSelector(({ balance }) => balance)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const get = async () => {
      if (awardsDay === null) {
        const { getAwardsDay } = await import('@/store/awardsDaySlice')
        dispatch(getAwardsDay())
      }
    }
    get()
  }, [awardsDay, dispatch])

  return (
    <>
      {awardsDay &&
        [...awardsDay]
          .sort((a, b) => b.price * b.discount - a.price * a.discount)
          .map(({ icon, price, title, discount, id, daily }) => (
            <Item
              style={{ width: styled ? 'calc(50% - 2px)' : '' }}
              key={id}
              icon={icon}
              title={title}
              oldPrice={'-' + Math.abs(price).toString()}
              discount={'-' + Math.round((1 - discount) * 100) + '%'}
              price={'-' + Math.abs(discount * price).toString()}
              onButtonClick={async () => {
                if (balance === null) return
                const newBalance =
                  Number(balance) + Number(discount) * Number(price)
                if (newBalance < 0) {
                  const { warningToast } = await import('@/utils/warningToast')
                  warningToast('Не хватает звёздочек(')
                  return
                }
                const { successToast } = await import('@/utils/successToast')
                const { updateBalance, updateAwardsDay } = await import(
                  '@/store/store'
                )
                dispatch(updateBalance(newBalance))
                dispatch(updateAwardsDay({ id, daily }))
                successToast(
                  'Куплено! -' + Math.abs(Number(discount) * Number(price)),
                )
              }}
            />
          ))}
    </>
  )
}

export default memo(AwardsDay)
