import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks'
import { useMediaQuery } from 'usehooks-ts'
import { lazy, memo, useEffect } from 'react'

const Item = lazy(() => import('../Item'))
const TasksDay = lazy(() => import('./TasksDay'))

function Tasks() {
  const isMobile = !useMediaQuery('(min-width: 768px)')

  const tasks = useAppSelector(({ tasks }) => tasks)
  const balance = useAppSelector(({ balance }) => balance)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const get = async () => {
      if (tasks === null) {
        const { getTasks } = await import('@/store/tasksSlice')
        dispatch(getTasks())
      }
    }
    get()
  }, [tasks, dispatch])

  return (
    <div className="flex flex-wrap gap-1">
      {tasks && <TasksDay styled={!isMobile} />}
      {tasks &&
        [...tasks]
          .sort((a, b) => a.price * a.discount - b.price * b.discount)
          .map(({ icon, title, price, id, daily }) => (
            <Item
              style={{ width: isMobile ? '' : 'calc(50% - 2px)' }}
              key={id}
              icon={icon}
              title={title}
              price={'+' + Math.abs(price).toString()}
              onButtonClick={async () => {
                if (balance === null) return
                const newBalance = Number(balance) + Number(price)
                console.log(newBalance)
                const { successToast } = await import('@/utils/successToast')
                const { updateBalance, updateTasks } = await import(
                  '@/store/store'
                )
                dispatch(updateBalance(newBalance))
                dispatch(updateTasks({ id, daily }))
                successToast('Молодец! +' + Math.abs(Number(price)))
              }}
            />
          ))}
    </div>
  )
}

export default memo(Tasks)
