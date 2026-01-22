// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const { user } = useAuth()

  // Pages publiques
  const publicPages = ['/login/login']
  if (publicPages.includes(to.path)) return

  // Si pas connecté → redirige vers login
  if (!user.value) return navigateTo('/login/login')

  // Gestion des rôles
  if (to.path === '/admin' && user.value.role !== 'admin') {
    return navigateTo('/')  // utilisateur normal ne peut pas aller sur /admin
  }
  if (to.path === '/' && user.value.role !== 'user') {
    return navigateTo('/admin') // admin ne va pas sur /user
  }
})
