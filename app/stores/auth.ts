export const useAuthStore = defineStore('auth', () => {
  const token = useAuthToken()
  const isAuthenticated = computed(() => !!token.value)

  async function login(username: string, password: string) {
    const api = useApi()
    const { access } = await api<{ access: string }>('/api/token', {
      method: 'POST',
      body: { username, password },
    })
    token.value = access
  }

  interface SignupPayload {
    email: string
    username: string
    password: string
    city?: string
    adress?: string
    locationLat?: string
    locationLon?: string
  }

  async function signup(payload: SignupPayload) {
    const api = useApi()
    const { access_token } = await api<{ access_token: string }>('/api/signup', {
      method: 'POST',
      body: payload,
    })
    token.value = access_token
  }

  function logout() {
    token.value = null
  }

  return { token, isAuthenticated, login, signup, logout }
})
