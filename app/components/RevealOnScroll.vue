<script setup lang="ts">
const el = ref<HTMLElement | null>(null)
const visible = ref(false)

onMounted(() => {
  if (!el.value) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        visible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.15 },
  )
  observer.observe(el.value)

  onBeforeUnmount(() => observer.disconnect())
})
</script>

<template>
  <div
    ref="el"
    class="scroll-reveal transition-all duration-700 ease-out"
    :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
  >
    <slot />
  </div>
</template>
