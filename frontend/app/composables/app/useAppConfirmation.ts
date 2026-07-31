import ConfirmationDialog from '~/components/admin/ConfirmationDialog.vue'

export interface ConfirmationConfig {
  resource: string
  nome: string
  ativo: boolean
}

export function useAppConfirmation() {
  const overlay = useOverlay()

  function confirmToggle({ resource, nome, ativo }: ConfirmationConfig) {
    const modal = overlay.create(ConfirmationDialog, {
      destroyOnClose: true
    })
    return modal.open({
      title: ativo ? `Desativar ${resource}` : `Ativar ${resource}`,
      description: ativo
        ? `Tem certeza que deseja desativar ${nome}?`
        : `Tem certeza que deseja ativar ${nome}?`,
      confirmationLabel: ativo ? 'Desativar' : 'Ativar'
    })
  }

  return {
    confirmToggle
  }
}
