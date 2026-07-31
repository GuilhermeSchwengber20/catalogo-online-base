<!-- <template>
  <div class="flex flex-col gap-3">

    <div
      class="relative aspect-video rounded-lg border-2 border-dashed border-warm-300 bg-warm-50 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors"
      :class="{ 'opacity-50 pointer-events-none': uploading }"
      @click="triggerInput"
    >

      <template v-if="!preview">
        <UIcon
          name="i-lucide-image-plus"
          class="w-8 h-8 text-warm-300"
        />
        <p class="text-sm text-warm-500">
          Clique para selecionar uma imagem
        </p>
        <p class="text-xs text-warm-400">
          JPEG, PNG, WebP ou GIF · Máximo 5MB
        </p>
      </template>

      <template v-else>
        <img
          :src="preview"
          alt="Preview"
          class="w-full h-full object-cover rounded-lg"
        >
      </template>

      <div
        v-if="uploading"
        class="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center"
      >
        <UIcon
          name="i-lucide-loader-circle"
          class="w-8 h-8 text-white animate-spin"
        />
      </div>
    </div>

    <div
      v-if="errorMsg"
      class="text-sm text-error"
    >
      {{ errorMsg }}
    </div>

    <div
      v-if="preview && !uploading"
      class="flex items-center gap-2"
    >
      <UButton
        size="sm"
        color="error"
        variant="ghost"
        icon="i-lucide-trash-2"
        @click="removeImage"
      >
        Remover
      </UButton>

      <span class="text-sm text-warm-500">{{ currentFileName }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UploadService } from '~/services/UploadService'

const emit = defineEmits<{
  uploaded: [url: string]
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const preview = ref('')
const uploading = ref(false)
const errorMsg = ref('')
const currentFileName = ref('')

function triggerInput() {
  fileInput.value?.click()
}

async function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  errorMsg.value = ''
  currentFileName.value = file.name

  preview.value = URL.createObjectURL(file)

  uploading.value = true
  try {
    const response = await UploadService.uploadImage(file)
    if (response.success) {
      emit('uploaded', response.data.url)
    } else {
      errorMsg.value = response.message || 'Erro ao fazer upload'
      preview.value = ''
    }
  } catch {
    errorMsg.value = 'Erro ao conectar com o servidor'
    preview.value = ''
  } finally {
    uploading.value = false
  }
}

function removeImage() {
  preview.value = ''
  currentFileName.value = ''
  errorMsg.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script> -->
