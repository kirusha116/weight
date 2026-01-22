import Heart from '@/components/Heart'
import { lazy, Suspense } from 'react'

const DashboardName = lazy(() => import('@/components/Dashboard/DashboardName'))
const Grid = lazy(() => import('@/components/Dashboard/Grid'))

export default function Dashboard() {
  return (
    <>
      <Suspense>
        <DashboardName />
      </Suspense>
      <Suspense fallback={<Heart />}>
        <Grid />
      </Suspense>
    </>
  )
}
