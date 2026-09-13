<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <noscript>
    <component :is="'style'">
      .scroll-reveal { opacity: 1 !important; transform: none !important; }
    </component>
  </noscript>
</template>
