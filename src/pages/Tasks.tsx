import Heart from '@/components/Heart'
import { lazy, memo, Suspense } from 'react'

const Header = lazy(() => import('@/components/Tasks/Header'))
const InnerTasks = lazy(() => import('@/components/Tasks/Tasks'))

function Tasks() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <Suspense fallback={<Heart />}>
        <InnerTasks />
      </Suspense>
    </>
  )
}

export default memo(Tasks)
