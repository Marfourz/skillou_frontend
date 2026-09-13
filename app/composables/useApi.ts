export function useAuthToken() {
  return useCookie<string | null>('access_token', {
    sameSite: 'lax',
    default: () => null,
  })
}

export function useApi() {
  const config = useRuntimeConfig()
  const token = useAuthToken()

  return $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ options }) {
      if (token.value) {
        options.headers = new Headers(options.headers)
        options.headers.set('Authorization', `Bearer ${token.value}`)
      }
    },
    onResponseError({ response }) {
      // Comme DioClient : ne rediriger que si une session existait déjà
      // (pas lors d'une tentative de login avec de mauvais identifiants).
      if (response.status === 401 && token.value) {
        token.value = null
        return navigateTo('/login')
      }
    },
  })
}
