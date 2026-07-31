export function generateWhatsappMessage(phone: string, message: string): string {
  const baseUrl = 'https://wa.me'
  const encoded = encodeURIComponent(message)
  return `${baseUrl}/${phone}?text=${encoded}`
}
