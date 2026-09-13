<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<{
  modelValue?: string
  type?: string
  placeholder?: string
  error?: string
}>()

defineEmits<{ 'update:modelValue': [value: string] }>()

const showPassword = ref(false)
const isPasswordField = computed(() => props.type === 'password')
const inputType = computed(() => (isPasswordField.value && showPassword.value) ? 'text' : (props.type || 'text'))
</script>

<template>
  <div>
    <div class="relative">
      <input
        :value="modelValue"
        v-bind="$attrs"
        :type="inputType"
        :placeholder="placeholder"
        class="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-tertiary focus:border-primary focus:outline-none"
        :class="{ 'pr-11': isPasswordField }"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
      <button
        v-if="isPasswordField"
        type="button"
        tabindex="-1"
        class="absolute inset-y-0 right-0 flex items-center px-3 text-text-tertiary hover:text-text"
        @click="showPassword = !showPassword"
      >
        <svg v-if="showPassword" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.6 18.6 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
        <svg v-else class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>
    </div>
    <p v-if="error" class="mt-1 text-xs text-danger">{{ error }}</p>
  </div>
</template>
