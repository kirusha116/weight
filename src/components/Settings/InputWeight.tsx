import { settings, settingsLabels } from '@/constants/settings'
import { Input } from '../ui/input'
import type { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form'
import { Label } from '../ui/label'
import type { InForm } from '@/types/InForm'

export default function InputWeight({
  settingsKey,
  register,
  setValue,
}: {
  settingsKey: (typeof settings)[keyof typeof settings]
  register: UseFormRegisterReturn<(typeof settings)[keyof typeof settings]>
  setValue: UseFormSetValue<InForm>
}) {
  return (
    <>
      <Label className="text-md">{settingsLabels[settingsKey]}</Label>
      <Input
        className="bg-white mt-2 mb-4"
        {...register}
        type="text"
        inputMode="decimal"
        lang="en"
        step="any"
        enterKeyHint="next"
        onPaste={e => e.preventDefault()}
        onInput={e => {
          const input = e.target as HTMLInputElement
          let val = input.value.replace(/[^0-9.,]/g, '')
          val = val.replace(',', '.')
          const parts = val.split('.')
          if (parts.length > 2) val = parts[0] + '.' + parts.slice(1).join('')
          if (Number(val) % 1)
            val = (Math.floor(Number(val) * 10) / 10).toString()
          setValue(settingsKey, val, { shouldValidate: true })
        }}
      />
    </>
  )
}
