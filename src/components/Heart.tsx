import { InnerHeart } from './InnerHeart'

export default function Heart() {
  return (
    <div className="absolute inset-0 w-screen h-screen bg-black/10 z-100">
      <InnerHeart className="relative left-1/2 top-1/2 -translate-1/2 size-30" />
    </div>
  )
}
