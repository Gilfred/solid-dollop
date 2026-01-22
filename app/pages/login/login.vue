<template>
  <div>
    <h1>Connexion</h1>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Mot de passe" />
    <button @click="handleLogin">Se connecter</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '../../../composables/useAuth'

const { login, user } = useAuth()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await login(email.value, password.value)
    navigateTo(user.value?.role === 'admin' ? '/admin' : '/user')
  } catch (err) {
    console.error('Erreur login:', err)
  }
}
</script>
