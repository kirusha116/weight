import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import Heart from '../Heart'
import type { WarningDialog } from '@/types/WarningComp'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function Bottom() {
  const [isHeartOpen, setIsHeartOpen] = useState<boolean>(false)
  const [isExitOpen, setIsExitOpen] = useState<boolean>(false)
  const [isResetOpen, setIsResetOpen] = useState<boolean>(false)
  const [WarningDialog, setWarningDialog] = useState<WarningDialog>(null)
  const [isAuth, setIsAuth] = useState<boolean | null>(null)

  const loadWarningDialog = async () => {
    setIsHeartOpen(true)
    const loadedWarningDialog = await import('../WarningDialog')
    setWarningDialog(() => loadedWarningDialog.default)
    setIsHeartOpen(false)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), () => {
      setIsAuth(!!getAuth().currentUser)
    })
    return unsubscribe
  })

  return (
    <>
      {isAuth && (
        <Button
          className="block mt-4 ml-auto mr-0 bg-black text-white"
          onClick={() => {
            if (!WarningDialog) loadWarningDialog()
            setIsExitOpen(true)
          }}
        >
          Выйти из профиля
        </Button>
      )}
      <Button
        className="block mt-4 ml-auto mr-0 bg-black text-white"
        onClick={() => {
          if (!WarningDialog) loadWarningDialog()
          setIsResetOpen(true)
        }}
      >
        Очистить память
      </Button>

      {isHeartOpen && <Heart />}
      {WarningDialog && (
        <WarningDialog
          variant="exit"
          isOpen={isExitOpen}
          onOpenChange={setIsExitOpen}
        />
      )}
      {WarningDialog && (
        <WarningDialog
          variant="reset"
          isOpen={isResetOpen}
          onOpenChange={setIsResetOpen}
        />
      )}
    </>
  )
}
