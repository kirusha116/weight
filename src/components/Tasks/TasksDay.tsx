import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks'
import { lazy, memo, useEffect } from 'react'

const Item = lazy(() => import('../Item'))

function TasksDay({ styled }: { styled?: boolean }) {
  const tasksDay = useAppSelector(({ tasksDay }) => tasksDay)
  const balance = useAppSelector(({ balance }) => balance)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const get = async () => {
      if (tasksDay === null) {
        const { getTasksDay } = await import('@/store/tasksDaySlice')
        dispatch(getTasksDay())
      }
    }
    get()
  }, [tasksDay, dispatch])

  return (
    <>
      {tasksDay &&
        [...tasksDay]
          .sort((a, b) => a.price * a.discount - b.price * b.discount)
          .map(({ icon, id, price, title, discount, daily }) => (
            <Item
              style={{ width: styled ? 'calc(50% - 2px)' : '' }}
              key={id}
              icon={icon}
              title={title}
              oldPrice={'+' + Math.abs(price).toString()}
              discount={'+' + Math.round((discount - 1) * 100) + '%'}
              price={'+' + Math.abs(discount * price).toString()}
              onButtonClick={async () => {
                if (balance === null) return
                const newBalance =
                  Number(balance) + Number(discount) * Number(price)
                const { successToast } = await import('@/utils/successToast')
                const { updateBalance, updateTasksDay } = await import(
                  '@/store/store'
                )
                dispatch(updateBalance(newBalance))
                dispatch(updateTasksDay({ id, daily }))
                successToast('Молодец! +' + Math.abs(Number(price)))
              }}
            />
          ))}
    </>
  )
}
export default memo(TasksDay)
