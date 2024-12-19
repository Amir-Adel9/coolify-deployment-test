export const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? decodeURIComponent(match[2]) : null
}

export const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`
}

export const deleteCookie = (name: string, options?: { path?: string }) => {
  const path = options?.path || "/"
  const expires = new Date(0).toUTCString()
  document.cookie = `${name}=;expires=${expires};path=${path}`
}
