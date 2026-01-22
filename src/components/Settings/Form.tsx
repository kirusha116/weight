import { settings } from '@/constants/settings'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { lazy, useEffect } from 'react'
import { updateProfile, type User } from 'firebase/auth'
import { successToast } from '@/utils/successToast'
import type { ReceivedData } from '@/types/ReceivedData'
import type { InForm } from '@/types/InForm'
import { auth } from '@/auth'

const InputString = lazy(() => import('./InputString'))
const InputWeight = lazy(() => import('./InputWeight'))
const InputCallories = lazy(() => import('./InputCallories'))
const FormButtons = lazy(() => import('./FormButtons'))

export default function Form() {
  const name = auth.currentUser?.displayName

  const { register, handleSubmit, reset, setValue, getFieldState } =
    useForm<InForm>({
      defaultValues: {
        name,
        startWeight: '',
        targetWeight: '',
        maxCallories: '',
      },
    })

  useEffect(() => {
    const get = async () => {
      const { getLast } = await import('@/utils/getLast')
      const startWeight = (await getLast('startWeight')) as ReceivedData<number>
      const targetWeight = (await getLast(
        'targetWeight',
      )) as ReceivedData<number>
      const maxCallories = (await getLast(
        'maxCallories',
      )) as ReceivedData<number>
      reset({
        startWeight:
          startWeight !== undefined ? startWeight.data.toString() : '',
        targetWeight:
          targetWeight !== undefined ? targetWeight.data.toString() : '',
        maxCallories:
          maxCallories !== undefined ? maxCallories.data.toString() : '',
      })
    }
    get()
  }, [reset])

  const onSubmit: SubmitHandler<InForm> = async data => {
    if (getFieldState('name').isDirty)
      await updateProfile(auth.currentUser as User, {
        displayName: data.name,
      })
    const { setLast } = await import('@/utils/setLast')
    if (getFieldState('startWeight').isDirty)
      await setLast(Number(data.startWeight), 'startWeight')
    if (getFieldState('targetWeight').isDirty)
      await setLast(Number(data.targetWeight), 'targetWeight')
    if (getFieldState('maxCallories').isDirty)
      await setLast(Number(data.maxCallories), 'maxCallories')

    reset(data)

    successToast('Сохранено!')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputString
        settingsKey={settings.name}
        register={register(settings.name)}
      />

      <InputWeight
        settingsKey={settings.startWeight}
        register={register(settings.startWeight)}
        setValue={setValue}
      />

      <InputWeight
        settingsKey={settings.targetWeight}
        register={register(settings.targetWeight)}
        setValue={setValue}
      />
      <InputCallories
        settingsKey={settings.maxCallories}
        register={register(settings.maxCallories)}
        setValue={setValue}
      />
      <FormButtons reset={reset} />
    </form>
  )
}
