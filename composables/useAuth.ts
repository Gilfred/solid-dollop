// composables/useAuth.ts
import { ref } from 'vue'

export const useAuth = () => {
  const user = ref<{ email: string; role: 'admin' | 'user' } | null>(null)
  const token = ref<string | null>(null)

  const login = async (email: string, password: string) => {
    const res = await $fetch('/api/auth', {
      method: 'POST',
      body: { email, password }
    })
    token.value = res.token
    user.value = res.user
  }

  const register = async (email: string, password: string, role: 'admin' | 'user' = 'user') => {
    const res = await $fetch('/api/register', {
      method: 'POST',
      body: { email, password, role }
    })
    token.value = res.token
    user.value = res.user
  }

  const logout = () => {
    user.value = null
    token.value = null
  }

  return { user, token, login, register, logout }
}
