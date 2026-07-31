type ToastColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      toast: (message: string, options?: { color?: ToastColor }) => {
        const toast = useToast()
        toast.add({
          title: message,
          color: options?.color || 'primary'
        })
      }
    }
  }
})
