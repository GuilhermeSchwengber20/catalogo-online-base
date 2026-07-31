import type { ApiResponse } from '~/types'

interface UploadResponse {
  url: string
  publicId: string
}

export const UploadService = {
  async uploadImages(files: File[]): Promise<ApiResponse<UploadResponse[]>> {
    const formData = new FormData()

    files.forEach((file) => {
      formData.append('images', file)
    })

    const { $api } = useNuxtApp()

    return $api<ApiResponse<UploadResponse[]>>('/uploads/images', {
      method: 'POST',
      body: formData
    })
  }
}
