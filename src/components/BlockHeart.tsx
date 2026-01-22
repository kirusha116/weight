import { Block } from './Dashboard/Block'
import { InnerHeart } from './InnerHeart'

export function BlockHeart() {
  return (
    <Block>
      <div className="relative py-5 z-100">
        <InnerHeart className="mx-auto size-25" />
      </div>
    </Block>
  )
}
