import { auth } from '@/auth'
import { warningToast } from '@/utils/warningToast'
import { signOut } from 'firebase/auth'

export const getParams = (
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return {
    title: 'Точно? Точно?',
    description: 'Так данные будут храниться только на телефоне!',
    firstBtnText: 'Отмена',
    firstBtnClick: () => onOpenChange(false),
    secondBtnText: 'Выйти',
    secondBtnClick: () => {
      signOut(auth)
        .then(() => {
          warningToast('Вы вышли из аккаунта')
          onOpenChange(false)
        })
        .catch(error => {
          warningToast(error.code)
          onOpenChange(false)
        })
    },
  }
}
