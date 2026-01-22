import { settings, settingsLabels } from '@/constants/settings'
import { Input } from '../ui/input'
import type { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form'
import { Label } from '../ui/label'
import type { InForm } from '@/types/InForm'

export default function InputCallories({
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
          const val = input.value.replace(/[^0-9]/g, '')
          setValue(settingsKey, val, { shouldValidate: true })
        }}
      />
    </>
  )
}
