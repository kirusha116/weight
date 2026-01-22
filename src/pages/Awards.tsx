import Heart from '@/components/Heart'
import { lazy, Suspense } from 'react'

const Header = lazy(() => import('@/components/Awards/Header'))
const InnerAwards = lazy(() => import('@/components/Awards/Awards'))

export default function Awards() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <Suspense fallback={<Heart />}>
        <InnerAwards />
      </Suspense>
    </>
  )
}
