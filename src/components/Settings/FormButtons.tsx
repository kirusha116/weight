import { Button } from '@/components/ui/button'
import type { InForm } from '@/types/InForm'
import type { UseFormReset } from 'react-hook-form'

export default function FormButtons({
  reset,
}: {
  reset: UseFormReset<InForm>
}) {
  return (
    <div className="flex mt-4 justify-end">
      <Button variant="green" className="ml-auto mr-4" type="submit">
        Сохранить
      </Button>
      <Button
        variant="rose"
        onClick={e => {
          e.preventDefault()
          reset()
        }}
      >
        Cбросить
      </Button>
    </div>
  )
}
