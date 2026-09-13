<script setup lang="ts">
withDefaults(defineProps<{ panelClass?: string, side?: 'left' | 'right' }>(), {
  panelClass: 'bg-primary-fade',
  side: 'right',
})
</script>

<template>
  <div class="grid min-h-screen lg:grid-cols-2">
    <div
      class="hidden items-center justify-center p-12 lg:flex"
      :class="[panelClass, side === 'right' ? 'lg:order-2' : 'lg:order-1']"
    >
      <slot name="illustration" />
    </div>
    <div
      class="flex flex-col justify-center px-6 py-12"
      :class="side === 'right' ? 'lg:order-1' : 'lg:order-2'"
    >
      <div class="mx-auto w-full max-w-md">
        <slot />
      </div>
    </div>
  </div>
</template>
