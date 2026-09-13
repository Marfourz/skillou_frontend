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

  function logout() {
    token.value = null
  }

  return { token, isAuthenticated, login, logout }
})
