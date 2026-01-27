<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useAuth } from "../../../composables/useAuth"
import { onMounted, ref } from 'vue'
import { useToast } from '#imports'

const toast = useToast()
const loading = ref(false)

// const { loginWithGoogle, loginWithEmail, fetchSession, createUser } = useAuth()

const { loginWithGoogle, loginWithEmail, createUser, fetchSession } = useAuth()
console.log('SESSION CLIENT 👉', fetchSession)



const schema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Minimum 8 caractères'),
  remember: z.boolean().optional()
})

type Schema = z.output<typeof schema>

const state = ref({
  email: '',
  password: '',
  remember: false
})

const providers = [
  {
    name: 'Google',
    icon: 'i-simple-icons-google',
    color: '#4285F4',
    onClick: async () => {
      loading.value = true
      try {
        await loginWithGoogle()

        toast.add({ title: '✓ Connecté avec Google', color: 'green' })

      } catch (err) {

        toast.add({ title: '✗ Erreur Google', color: 'red' })
      } finally {
        loading.value = false
      }
    }
  },
 
]

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
await loginWithEmail(
    event.data.email,
    event.data.password,
    event.data.remember
  )
  console.log('Login successful', event.data) 

  await fetchSession()
   toast.add({
       title: '✓ Connexion réussie',
       color: 'green'
     })
await navigateTo('/admin')
  } catch {
    toast.add({
      title: '✗ Email ou mot de passe incorrect',
      color: 'red'
    })

    await new Promise(resolve => setTimeout(resolve, 1200))
    toast.add({ title: '✓ Connexion réussie', color: 'green' })
 onMounted(() => {
   fetchSession()
 })

onMounted(() => fetchSession())
  } finally {
    loading.value = false
  }
}

</script>
<template>
  <div class="min-h-screen grid md:grid-cols-2">
    
    <!-- Left Panel - Branding -->
    <div class=" -mt-6 hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 30px 30px;"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10">
        <div class="flex items-center gap-3 mb-12">
          <div class="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <UIcon name="i-heroicons-sparkles" class="w-5 h-5" />
          </div>
          <span class="text-xl font-bold">Luxe & Design</span>
        </div>

        <h2 class="text-4xl font-bold mb-4 leading-tight">
          L'excellence dans<br />la gestion de contenu
        </h2>
        <p class="text-lg text-purple-200">
          Gérez votre blog premium avec des outils modernes et intuitifs.
        </p>
      </div>

      <!-- Testimonial -->
      <div class="relative z-10 ">
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400"></div>
            <div>
              <p class="font-semibold">Sophie Martin</p>
              <p class="text-sm text-purple-200">Designer & Influenceuse</p>
            </div>
          </div>
          <p class="text-sm text-purple-100 leading-relaxed">
            "Une plateforme exceptionnelle qui a transformé ma façon de gérer mon contenu. Interface élégante et fonctionnalités puissantes."
          </p>
          <div class="flex gap-1 mt-4">
            <UIcon v-for="i in 5" :key="i" name="i-heroicons-star-solid" class="w-4 h-4 text-yellow-400" />
          </div>
        </div>
      </div>
    </div>

    <!-- Right Panel - Form -->
    <div class="-mt-5 flex items-center justify-center p-8 bg-white dark:bg-gray-950">
      <div class="w-full max-w-md">
        
        <!-- Mobile Logo -->
        <div class="md:hidden flex items-center justify-center gap-2 mb-8">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
            <UIcon name="i-heroicons-sparkles" class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold">Luxe & Design</span>
        </div>

        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Connexion
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            Accédez à votre tableau de bord
          </p>
        </div>

        <!-- Form -->
        <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-5 w-full">
          
          <div class="space-x-6">
          <UFormGroup label="Adresse email" name="email" required>
            <UInput
              v-model="state.email"
              type="email"
              placeholder="exemple@email.com"
              size="lg"
              :ui="{ base: 'h-12' }"
            />
          </UFormGroup>

          <UFormGroup label="Mot de passe" name="password" required>
            <UInput
              v-model="state.password"
              type="password"
              placeholder="Entrez votre mot de passe"
              size="lg"
              :ui="{ base: 'h-12' }"
            />
          </UFormGroup>
          </div>

          <div class="flex items-center justify-between text-sm">
            <UCheckbox v-model="state.remember" label="Rester connecté" />
            <NuxtLink to="/forgot" class="font-medium text-purple-600 dark:text-indigo-400 hover:underline">
              Mot de passe oublié ?
            </NuxtLink>
          </div>

          <UButton
            type="submit"
            color="primary"
            size="lg"
            block
            :loading="loading"
            class="h-12 font-semibold"
          >
            Se connecter
          </UButton>
        </UForm>

        <!-- Divider -->
        <div class="relative my-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200 dark:border-gray-800"></div>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="px-2 bg-white dark:bg-gray-950 text-gray-500">ou</span>
          </div>
        </div>

        <!-- Social Login -->
        <div class="space-y-3">
          <UButton
            v-for="provider in providers"
            :key="provider.name"
            :icon="provider.icon"
            variant="outline"
            size="lg"
            block
            :loading="loading"
            @click="provider.onClick"
            class="h-12 justify-center font-medium"
          >
            Continuer avec {{ provider.name }}


          </UButton>
        </div>

        <!-- Sign Up -->
        <p class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Pas de compte ?
          <NuxtLink to="/register" class="font-semibold text-purple-600 dark:text-indigo-400 hover:underline">
            Inscrivez-vous gratuitement
          </NuxtLink>

          <UButton
           @click="createUser"
          > s'inscrit 
        </UButton>

        </p>

        <!-- Footer -->
        <div class="-mt-4 pt-6 -pb-4 border-t border-gray-200 dark:border-gray-800">
          <p class="text-xs text-center text-gray-500 dark:text-gray-400">
            En vous connectant, vous acceptez nos
            <NuxtLink to="/terms" class="underline hover:text-purple-600">Conditions</NuxtLink>
            et notre
            <NuxtLink to="/privacy" class="underline hover:text-purple-600">Politique de confidentialité</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template> 