<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="p-10">
    <h1 class="text-3xl">Skillou</h1>
    <p>Scaffold Nuxt en place.</p>
    <p class="text-primary">Couleur primaire (Tailwind + token)</p>
    <p>{{ t('navHome') }}</p>
  </div>
</template>
