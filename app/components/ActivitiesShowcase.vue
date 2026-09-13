<script setup lang="ts">
const { t } = useI18n()

// Mêmes catégories/icônes que la landing page (lib/helper.dart getIconFromName)
const activities = computed(() => [
  { emoji: '⚽', label: t('landingActivitySport'), bg: 'color-mix(in srgb, var(--color-primary) 18%, white)' },
  { emoji: '🎵', label: t('landingActivityMusic'), bg: 'color-mix(in srgb, var(--color-info) 18%, white)' },
  { emoji: '🎨', label: t('landingActivityArt'), bg: 'color-mix(in srgb, var(--color-danger) 16%, white)' },
  { emoji: '🍳', label: t('landingActivityCooking'), bg: 'color-mix(in srgb, var(--color-success) 18%, white)' },
  { emoji: '💻', label: t('landingActivityTech'), bg: 'color-mix(in srgb, var(--color-positive) 18%, white)' },
  { emoji: '🧹', label: t('landingActivityHome'), bg: 'color-mix(in srgb, var(--color-primary-2) 24%, white)' },
  { emoji: '🧘', label: t('landingActivityWellbeing'), bg: 'color-mix(in srgb, var(--color-info) 12%, white)' },
  { emoji: '🧑‍🤝‍🧑', label: t('landingActivitySocial'), bg: 'color-mix(in srgb, var(--color-primary) 12%, white)' },
])
</script>

<template>
  <div class="max-w-xs text-center">
    <div class="grid grid-cols-4 gap-4">
      <span
        v-for="(activity, i) in activities"
        :key="activity.label"
        class="animate-float flex h-16 w-16 items-center justify-center rounded-2xl text-3xl shadow-sm"
        :style="{
          backgroundColor: activity.bg,
          animationDelay: `${i * 300}ms`,
          animationDuration: `${3.2 + (i % 3) * 0.5}s`,
        }"
        :title="activity.label"
      >
        {{ activity.emoji }}
      </span>
    </div>
    <p class="mt-6 text-sm font-medium text-text-secondary">
      {{ t('activitiesShowcaseCaption') }}
    </p>
  </div>
</template>
