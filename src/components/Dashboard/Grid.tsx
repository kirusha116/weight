import { lazy, Suspense } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { BlockHeart } from '../BlockHeart'

const BlockWeight = lazy(() => import('./BlockWeight'))
const BlockCallories = lazy(() => import('./BlockCallories'))
const BlockTasks = lazy(() => import('./BlockTasks'))
const BlockAwards = lazy(() => import('./BlockAwards'))

export default function Grid() {
  const isMobile = !useMediaQuery('(min-width: 768px)')
  return (
    <>
      {isMobile && (
        <div>
          <Suspense fallback={<BlockHeart />}>
            <BlockWeight />
          </Suspense>
          <Suspense fallback={<BlockHeart />}>
            <BlockTasks />
          </Suspense>
          <Suspense fallback={<BlockHeart />}>
            <BlockAwards />
          </Suspense>
          <Suspense fallback={<BlockHeart />}>
            <BlockCallories />
          </Suspense>
        </div>
      )}
      {!isMobile && (
        <div className="flex">
          <div className="w-1/2">
            <Suspense fallback={<BlockHeart />}>
              <BlockWeight />
            </Suspense>
            <Suspense fallback={<BlockHeart />}>
              <BlockTasks />
            </Suspense>
          </div>
          <div className="w-1/2">
            <Suspense fallback={<BlockHeart />}>
              <BlockCallories />
            </Suspense>
            <Suspense fallback={<BlockHeart />}>
              <BlockAwards />
            </Suspense>
          </div>
        </div>
      )}
    </>
  )
}
