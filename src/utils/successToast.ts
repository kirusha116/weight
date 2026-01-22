import { toast } from 'sonner'

export function successToast(text: string) {
  toast.success(text, {
    classNames: {
      
      toast:
        'flex justify-center !w-fit relative left-[50%] translate-x-[-50%] ',
      title: 'text-base ml-2 text-nowrap',
    },
  })
}
