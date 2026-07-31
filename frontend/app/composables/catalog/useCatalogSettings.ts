
import { CatalogoService } from '~/services/CatalogoService'
import type { PublicSettings } from '~/types/settings'

let pendingRequest: Promise<void> | null = null

export function useCatalogSettings() {
  const settings = useState<PublicSettings | null>('settings', () => null)
  const loaded = useState('settings-loaded', () => false)
  const loading = useState('settings-loading', () => false)

  const whatsappNumber = computed(
    () => settings.value?.telefoneWhatsapp ?? ''
  )

  const showPrices = computed(
    () => settings.value?.mostrarPrecos ?? true
  )

  const storeName = computed(
    () => settings.value?.nomeLoja ?? ''
  )

  async function fetchSettings(force = false) {
    if (!force && loaded.value)
      return

    if (!force && pendingRequest)
      return pendingRequest


    pendingRequest = (async () => {
      loading.value = true

      try {
        const response = await CatalogoService.getPublicSettings()

        if (response.success) {
          settings.value = response.data
          loaded.value = true
        }
      } finally {
        loading.value = false
        pendingRequest = null
      }
    })()

    return pendingRequest
  }

  function clearSettings() {
    settings.value = null
    loaded.value = false
  }

  return {
    settings,
    loaded,
    loading,

    whatsappNumber,
    showPrices,
    storeName,

    fetchSettings,
    clearSettings
  }
}