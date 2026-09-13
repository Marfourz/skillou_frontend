<script setup lang="ts">
interface CityResult {
  displayName: string
  city: string
  lat: string
  lon: string
}

interface NominatimResult {
  display_name: string
  lat: string
  lon: string
  address?: Record<string, string>
}

defineProps<{ modelValue: string, placeholder?: string }>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
  'select': [result: CityResult]
}>()

const suggestions = ref<CityResult[]>([])
const loading = ref(false)
const showDropdown = ref(false)
let debounceTimer: ReturnType<typeof setTimeout> | undefined
let selecting = false

function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
  if (selecting) return

  clearTimeout(debounceTimer)
  const query = value.trim()
  if (query.length < 2) {
    suggestions.value = []
    showDropdown.value = false
    return
  }
  debounceTimer = setTimeout(() => search(query), 500)
}

async function search(query: string) {
  loading.value = true
  try {
    const results = await $fetch<NominatimResult[]>('https://nominatim.openstreetmap.org/search', {
      params: { q: query, format: 'json', addressdetails: 1, limit: 5, featuretype: 'city' },
    })
    suggestions.value = results.map((r) => {
      const address = r.address || {}
      const city = address.city || address.town || address.village || address.municipality || r.display_name.split(',')[0]!.trim()
      return { displayName: r.display_name, city, lat: r.lat, lon: r.lon }
    })
    showDropdown.value = suggestions.value.length > 0
  } catch {
    suggestions.value = []
    showDropdown.value = false
  } finally {
    loading.value = false
  }
}

function select(result: CityResult) {
  selecting = true
  emit('update:modelValue', result.city)
  emit('select', result)
  showDropdown.value = false
  selecting = false
}
</script>

<template>
  <div class="relative">
    <div class="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3">
      <svg class="h-4 w-4 shrink-0 text-text-tertiary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 21s-7-6.5-7-11.5A7 7 0 0 1 19 9.5C19 14.5 12 21 12 21z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </svg>
      <input
        :value="modelValue"
        type="text"
        :placeholder="placeholder"
        class="w-full text-sm text-text placeholder:text-text-tertiary focus:outline-none"
        @input="onInput"
        @focus="showDropdown = suggestions.length > 0"
        @blur="() => setTimeout(() => (showDropdown = false), 150)"
      >
      <div v-if="loading" class="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-border border-t-primary" />
    </div>

    <ul
      v-if="showDropdown"
      class="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-border bg-surface shadow-lg"
    >
      <li
        v-for="suggestion in suggestions"
        :key="suggestion.displayName"
        class="cursor-pointer px-4 py-2 text-sm text-text hover:bg-surface-muted"
        @mousedown.prevent="select(suggestion)"
      >
        {{ suggestion.displayName }}
      </li>
    </ul>
  </div>
</template>
