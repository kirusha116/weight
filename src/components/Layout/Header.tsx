import { NavLink } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import Heart from '@/components/Heart'
import type { Dialog } from '@/types/Dialog'

export default function Header() {
  const balance = useAppSelector(({ balance }) => balance)

  const dispatch = useAppDispatch()
  const isSmall = !useMediaQuery('(min-width: 480px)')

  const [isAuth, setIsAuth] = useState<boolean>(true)
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false)
  const [isHeartVisible, setIsHeartVisible] = useState<boolean>(false)
  const [Login, setLogin] = useState<Dialog>(null)

  const loadLogin = async () => {
    setIsHeartVisible(true)
    const loadedLogin = await import('../Login')
    setLogin(() => loadedLogin.default)
    setIsHeartVisible(false)
  }
  onAuthStateChanged(getAuth(), () => {
    setIsAuth(!!getAuth().currentUser)
  })

  useEffect(() => {
    const get = async () => {
      if (balance === null) {
        const { getBalance } = await import('@/store/balanceSlice')
        await dispatch(getBalance())
      }
    }
    get()
  }, [balance, dispatch])
  return (
    <header className="lg:container xl:max-w-7xl px-5 pt-5 m-auto flex justify-between items-center">
      <NavLink
        to={'/'}
        className="size-12 leading-12 text-center bg-rose-300 text-2xl text-white rounded-xl"
      >
        <b>KS</b>
      </NavLink>
      <NavLink to={'/'} className="flex flex-col justify-center w-fit ">
        <h1 className="ml-3 text-xl">
          <b>KlyuSEX</b>
        </h1>
        {(!isSmall || isAuth) && (
          <h2 className="ml-3 text-md text-gray-700">Похудение с мотивацией</h2>
        )}
      </NavLink>
      <div className="grow"></div>
      {balance && <p className="flex text-xl">{balance}</p>}
      <Star className="ml-1 size-6 stroke-rose-300 fill-rose-300" />
      {!isAuth && (
        <Button
          variant="rose"
          className="text-base ml-4"
          onClick={() => {
            if (!Login) loadLogin()
            setIsLoginOpen(true)
          }}
        >
          Войти
        </Button>
      )}

      {isHeartVisible && <Heart />}
      {Login && <Login isOpen={isLoginOpen} onOpenChange={setIsLoginOpen} />}
    </header>
  )
}
