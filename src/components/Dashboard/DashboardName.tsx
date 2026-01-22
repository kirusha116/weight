import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/auth'

export default function DashboardName() {
  const navigate = useNavigate()
  const [name, setName] = useState(auth.currentUser?.displayName)

  onAuthStateChanged(auth, () => {
    setName(auth.currentUser?.displayName)
  })
  return (
    <>
      <h1 className="text-2xl leading-6 inline-block">
        {name ? (
          <b>{`Привет, ${name}!`}</b>
        ) : (
          <>
            <b className="mr-2 leading-9">{`Привет!`}</b>
            <Button
              variant="rose"
              className="text-base leading-4"
              onClick={() => navigate('/settings')}
            >
              Указать имя
            </Button>
          </>
        )}
      </h1>
      <h2 className="text-md text-gray-700 mb-6">
        Держись! Каждый маленький шаг - это прогресс!
      </h2>
    </>
  )
}
