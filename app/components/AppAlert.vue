<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'danger' | 'success' | 'info' }>(), { variant: 'danger' })
</script>

<template>
  <div
    class="flex items-start gap-2 rounded-xl px-4 py-3 text-sm"
    :class="{
      'bg-danger/10 text-danger': variant === 'danger',
      'bg-success/10 text-success': variant === 'success',
      'bg-info/10 text-info': variant === 'info',
    }"
  >
    <svg class="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="8" x2="12" y2="13" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
    <span><slot /></span>
  </div>
</template>
