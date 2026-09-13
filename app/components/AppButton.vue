<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'outline' | 'ghost'
  loading?: boolean
  disabled?: boolean
}>(), {
  type: 'button',
  variant: 'primary',
  loading: false,
  disabled: false,
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
    :class="{
      'bg-primary text-white hover:opacity-90': variant === 'primary',
      'border border-border text-text hover:bg-surface-muted': variant === 'outline',
      'text-primary hover:underline': variant === 'ghost',
    }"
  >
    <slot />
  </button>
</template>
