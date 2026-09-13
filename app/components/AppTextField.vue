<script setup lang="ts">
defineOptions({ inheritAttrs: false })

defineProps<{
  modelValue?: string
  type?: string
  placeholder?: string
  error?: string
}>()

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div>
    <input
      :value="modelValue"
      v-bind="$attrs"
      :type="type || 'text'"
      :placeholder="placeholder"
      class="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-tertiary focus:border-primary focus:outline-none"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
    <p v-if="error" class="mt-1 text-xs text-danger">{{ error }}</p>
  </div>
</template>
