import Header from '@/components/Statistics/Header'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { ArrowBigDown, ArrowBigUp, Minus } from 'lucide-react'
import { useEffect, useState } from 'react'

type WeigthHistory = { data: number; timestamp: number }

export default function Statistics() {
  const [history, setHistory] = useState<WeigthHistory[]>()

  useEffect(() => {
    async function loadHistory() {
      const history: WeigthHistory[] = []
      const { auth } = await import('@/auth')
      const { db } = await import('@/db')
      if (auth.currentUser) {
        const querySnapShot = await getDocs(
          query(
            collection(
              db,
              `${auth.currentUser.uid}_new/currentWeight/currentWeight`,
            ),
            orderBy('timestamp'),
          ),
        )
        querySnapShot.forEach(elem =>
          history.push(elem.data() as WeigthHistory),
        )
      }
      setHistory(history)
    }
    loadHistory()
  })
  return (
    <>
      <Header />
      <ul className="flex flex-col-reverse">
        {history?.map((elem, index, arr) => {
          const arrow = (index => {
            if (!index || elem.data === arr[index - 1].data)
              return () => <Minus className="stroke-gray-400 fill-gray-400 " />
            if ((elem.data as number) > (arr[index - 1].data as number))
              return () => (
                <ArrowBigUp className="stroke-red-300 fill-red-300" />
              )
            return () => (
              <ArrowBigDown className="stroke-green-300 fill-green-300" />
            )
          })(index)
          return (
            <li
              key={elem.data}
              className={
                'flex mb-1 items-center rounded-lg bg-white border shadow-xs px-3 py-2 relative w-full'
              }
            >
              <div className="h-8 rounded-md aspect-square border-rose-300 border-2 mr-4 flex justify-center items-center">
                {arrow()}
              </div>
              <p>
                <b>
                  {new Date(elem.data).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </b>
              </p>
              <div className="grow"></div>
              <p>
                <b>{`${elem.data?.toString()}${
                  !((elem.data as number) % 1) ? '.0' : ''
                } кг`}</b>
              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}
