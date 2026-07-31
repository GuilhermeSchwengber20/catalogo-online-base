type ToastColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'

export function useAppToast() {
  function show(message: string, color: ToastColor = 'primary') {
    const { $toast } = useNuxtApp()
    $toast(message, { color })
  }

  function success(message: string) {
    show(message, 'success')
  }

  function error(message: string) {
    show(message, 'error')
  }

  function warning(message: string) {
    show(message, 'warning')
  }

  return {
    show,
    success,
    error,
    warning
  }
}
