<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const authStore = useAuthStore()
</script>

<template>
  <div class="mx-auto max-w-3xl px-6 py-12">
    <h1 class="text-2xl">Connecté !</h1>
    <p class="mt-2 text-text-secondary">L'accueil complet arrive avec T11.</p>
    <AppButton variant="outline" class="mt-6" @click="authStore.logout(); navigateTo('/login')">
      Se déconnecter
    </AppButton>
  </div>
</template>
