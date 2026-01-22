import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog.js'
import { Input } from './ui/input.js'
import { useForm, type SubmitHandler } from 'react-hook-form'
import '@/firebase.js'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { Label } from './ui/label.js'
import { Button } from './ui/button.js'
import { useState } from 'react'
import Heart from './Heart'
import { warningToast } from '@/utils/warningToast.js'
import { successToast } from '@/utils/successToast.js'
import { auth } from '@/auth.js'

type Data = {
  email: string
  password: string
}

export default function Login() {
  const [isHeartOpen, setIsHeartOpen] = useState<boolean>(false)

  const onFulfilled = async () => {
    setIsHeartOpen(false)
    successToast('Успешно!')
  }

  const onSubmit: SubmitHandler<Data> = ({ email, password }: Data) => {
    setIsHeartOpen(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(onFulfilled)
      .catch(error => {
        switch (error.code) {
          case 'auth/invalid-credential':
            createUserWithEmailAndPassword(auth, email, password)
              .then(onFulfilled)
              .catch(error => {
                setIsHeartOpen(false)
                warningToast(error.code)
              })
            break
          case 'auth/weak-password':
            setIsHeartOpen(false)
            warningToast('Неверный пароль')
            break
          case 'auth/invalid-email':
            setIsHeartOpen(false)
            warningToast('Неверный email')
            break
          default:
            setIsHeartOpen(false)
            warningToast(error.code)
            break
        }
      })
  }

  const { register, handleSubmit } = useForm<Data>()

  return (
    <>
      <Dialog open={true}>
        <DialogContent
          showCloseButton={false}
          className="sm:max-w-[425px] z-200"
          onOpenAutoFocus={(e: Event) => e.preventDefault()}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader className="mb-7">
              <DialogTitle>Вход по почте</DialogTitle>
            </DialogHeader>
            <Label className="mb-2">Адрес электронной почты</Label>
            <Input {...register('email')} className="mb-5" />
            <Label className="mb-2">Пароль</Label>
            <Input {...register('password')} className="mb-5" />
            <DialogFooter>
              <Button type="submit" variant="rose">
                Войти
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {isHeartOpen && <Heart />}
    </>
  )
}
