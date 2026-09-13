<script setup lang="ts">
import type { PaginatedResponse, Skill } from '~/types/skill'

const { t } = useI18n()

useHead({
  title: t('landingPageTitle'),
})

const api = useApi()
const { data: popularSkills } = await useAsyncData<PaginatedResponse<Skill>>(
  'landing-popular-skills',
  () => api('/competences', { params: { limit: 3, type: 'personal' } }),
)
const skills = computed(() => popularSkills.value?.results ?? [])

function formatDuration(minutes?: number | null) {
  if (!minutes) return null
  if (minutes < 60) return `${minutes} min`
  const hours = minutes / 60
  return `${Number.isInteger(hours) ? hours : hours.toFixed(1)}h`
}

const bonusPoints = 10

const featureCards = computed(() => [
  {
    tag: t('landingFeatureTeachTag'),
    badge: t('landingFeatureTeachBadge'),
    badgeClass: 'bg-primary-fade text-primary',
    icon: '📚',
    title: t('landingFeatureTeachTitle'),
    description: t('landingFeatureTeachDescription'),
  },
  {
    tag: t('landingFeatureLearnTag'),
    badge: t('landingFeatureLearnBadge'),
    badgeClass: 'bg-info/10 text-info',
    icon: '💡',
    title: t('landingFeatureLearnTitle'),
    description: t('landingFeatureLearnDescription'),
  },
])

// Reprend les catégories réelles de lib/helper.dart (getIconFromName)
const activities = computed(() => [
  { emoji: '⚽', label: t('landingActivitySport'), bg: 'color-mix(in srgb, var(--color-primary) 16%, white)' },
  { emoji: '🎵', label: t('landingActivityMusic'), bg: 'color-mix(in srgb, var(--color-info) 16%, white)' },
  { emoji: '🎨', label: t('landingActivityArt'), bg: 'color-mix(in srgb, var(--color-danger) 14%, white)' },
  { emoji: '🍳', label: t('landingActivityCooking'), bg: 'color-mix(in srgb, var(--color-success) 16%, white)' },
  { emoji: '💻', label: t('landingActivityTech'), bg: 'color-mix(in srgb, var(--color-positive) 16%, white)' },
  { emoji: '🧹', label: t('landingActivityHome'), bg: 'color-mix(in srgb, var(--color-primary-2) 22%, white)' },
  { emoji: '🧘', label: t('landingActivityWellbeing'), bg: 'color-mix(in srgb, var(--color-info) 10%, white)' },
  { emoji: '🧑‍🤝‍🧑', label: t('landingActivitySocial'), bg: 'color-mix(in srgb, var(--color-primary) 10%, white)' },
])

const steps = computed(() => [
  t('landingStep1'),
  t('landingStep2'),
  t('landingStep3'),
])
</script>

<template>
  <div>
    <header class="sticky top-0 z-10 border-b border-border bg-surface/90 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <img src="/images/logo.png" alt="Skillou" class="h-11 w-auto mix-blend-multiply">
        <nav class="hidden items-center gap-6 sm:flex">
          <a href="#comment-ca-marche" class="text-sm font-medium text-text-secondary transition-colors hover:text-text">
            {{ t('landingNavHowItWorks') }}
          </a>
          <a href="#mobile" class="text-sm font-medium text-text-secondary transition-colors hover:text-text">
            {{ t('landingNavDownloadApp') }}
          </a>
        </nav>
        <div class="flex items-center gap-4">
          <NuxtLink to="/login" class="text-sm font-medium text-text">
            {{ t('authLoginTitle') }}
          </NuxtLink>
          <NuxtLink
            to="/signup"
            class="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            {{ t('authSignupButton') }}
          </NuxtLink>
        </div>
      </div>
    </header>

    <section class="mx-auto max-w-6xl px-6 py-10 sm:py-14">
      <div class="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <span class="inline-flex items-center gap-2 rounded-full bg-primary-fade px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            <span class="h-1.5 w-1.5 rounded-full bg-success"></span>
            {{ t('landingHeroEyebrow') }}
          </span>
          <h1 class="mt-5 text-4xl leading-tight sm:text-5xl">
            <span class="text-primary">{{ t('landingHeroTitleTeach') }}</span> {{ t('landingHeroTitleTeachRest') }}
            <span class="text-primary">{{ t('landingHeroTitleLearn') }}</span> {{ t('landingHeroTitleLearnRest') }}
          </h1>
          <p class="mt-5 max-w-md text-text-secondary">
            {{ t('landingHeroDescription') }}
          </p>
          <div class="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <NuxtLink
              to="/signup"
              class="rounded-full bg-primary px-6 py-3 text-base font-semibold text-white transition-transform hover:scale-105"
            >
              {{ t('landingSignupCta') }} →
            </NuxtLink>
            <NuxtLink to="/login" class="text-sm font-medium text-text-secondary hover:text-text">
              {{ t('landingAlreadyHaveAccount') }} {{ t('authLoginLink') }}
            </NuxtLink>
          </div>
          <div class="mt-10 flex flex-wrap items-center gap-3">
            <span
              v-for="(activity, i) in activities"
              :key="activity.label"
              class="animate-float flex h-11 w-11 items-center justify-center rounded-2xl text-xl shadow-sm"
              :style="{
                backgroundColor: activity.bg,
                animationDelay: `${i * 350}ms`,
                animationDuration: `${3.2 + (i % 3) * 0.5}s`,
              }"
              :title="activity.label"
            >
              {{ activity.emoji }}
            </span>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <RevealOnScroll v-for="card in featureCards" :key="card.title">
            <div class="rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <div class="flex items-center justify-between">
                <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-fade text-lg">
                  {{ card.icon }}
                </span>
                <span class="rounded-full px-2.5 py-1 text-[11px] font-semibold" :class="card.badgeClass">
                  {{ card.badge }}
                </span>
              </div>
              <span class="mt-4 block text-xs font-semibold uppercase tracking-wide text-text-tertiary">
                {{ card.tag }}
              </span>
              <h3 class="mt-1 text-lg">{{ card.title }}</h3>
              <p class="mt-2 text-sm text-text-secondary">{{ card.description }}</p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>

    <section class="bg-surface">
      <div class="mx-auto max-w-6xl px-6 py-12">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span class="text-xs font-semibold uppercase tracking-wide text-primary">{{ t('landingCatalogEyebrow') }}</span>
            <h2 class="mt-2 text-3xl">{{ t('landingCatalogTitle') }}</h2>
            <p class="mt-2 text-text-secondary">{{ t('landingCatalogSubtitle') }}</p>
          </div>
          <NuxtLink to="/search" class="text-sm font-semibold text-primary hover:underline">
            {{ t('landingCatalogExploreLink') }} →
          </NuxtLink>
        </div>

        <div v-if="skills.length" class="mt-10 grid gap-6 sm:grid-cols-3">
          <RevealOnScroll v-for="skill in skills" :key="skill.id">
            <div class="flex h-full flex-col rounded-2xl border border-border bg-bg p-5">
              <div class="flex items-center justify-between">
                <span
                  class="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
                  :style="{ backgroundColor: skill.category?.color || 'var(--color-primary)' }"
                >
                  {{ (skill.category?.name || '?').charAt(0).toUpperCase() }}
                </span>
                <span class="text-xs font-medium text-text-tertiary">
                  {{ skill.points ? t('commonPoints', { points: skill.points }) : t('itemCardNoPoints') }}
                  <template v-if="formatDuration(skill.duration)"> · {{ formatDuration(skill.duration) }}</template>
                </span>
              </div>
              <h3 class="mt-4 text-lg">{{ skill.title || t('profileSkillUntitled') }}</h3>
              <p class="mt-2 flex-1 text-sm text-text-secondary">
                {{ skill.description || t('profileNoDescription') }}
              </p>
              <div class="mt-4 flex items-center justify-between border-t border-border pt-3">
                <span class="flex items-center gap-2 text-xs text-text-tertiary">
                  <span class="flex h-6 w-6 items-center justify-center rounded-full bg-surface-muted text-[10px] font-semibold text-text-secondary">
                    {{ (skill.user?.user?.username || '?').charAt(0).toUpperCase() }}
                  </span>
                  {{ skill.user?.user?.username || t('profileDefaultUsername') }}
                </span>
                <span class="rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success">
                  {{ t('landingCatalogAvailableBadge') }}
                </span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
        <p v-else class="mt-10 rounded-2xl border border-dashed border-border bg-bg px-6 py-10 text-center text-text-secondary">
          {{ t('landingCatalogEmpty') }}
        </p>
      </div>
    </section>

    <section id="comment-ca-marche" class="mx-auto max-w-3xl px-6 py-14">
      <RevealOnScroll>
        <div class="rounded-3xl border border-border bg-gradient-to-br from-surface to-success/5 p-8 sm:p-10">
          <span class="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
            {{ t('landingPointsBadge') }}
          </span>
          <div class="mt-6 flex flex-col items-start gap-6 sm:flex-row">
            <div class="flex shrink-0 flex-col items-center justify-center rounded-2xl bg-success/10 px-6 py-4 text-success">
              <span class="text-2xl font-bold">{{ t('landingPointsBonusAmount', { points: bonusPoints }) }}</span>
              <span class="text-[10px] font-semibold uppercase tracking-wide">{{ t('landingPointsBonusLabel') }}</span>
              <span class="mt-1 rounded-full bg-success px-2 py-0.5 text-[10px] font-semibold text-white">
                {{ t('landingPointsBonusTag') }}
              </span>
            </div>
            <div>
              <h2 class="text-2xl">{{ t('onboardingTitle3') }}</h2>
              <p class="mt-1 font-medium text-primary">{{ t('onboardingDescription3') }}</p>
              <p class="mt-3 text-sm text-text-secondary">
                {{ t('landingPointsBody', { points: bonusPoints }) }}
              </p>
              <ul class="mt-5 space-y-2 text-sm text-text-secondary">
                <li v-for="(step, i) in steps" :key="step" class="flex items-center gap-2">
                  <span class="flex h-5 w-5 items-center justify-center rounded-full bg-success/10 text-xs text-success">✓</span>
                  {{ i + 1 }}. {{ step }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>

    <section id="mobile" class="bg-surface-muted">
      <div class="mx-auto max-w-3xl px-6 py-12 text-center">
        <span class="text-xs font-semibold uppercase tracking-wide text-primary">{{ t('landingMobileEyebrow') }}</span>
        <h2 class="mt-2 text-2xl">{{ t('landingMobileTitle') }}</h2>
        <p class="mx-auto mt-3 max-w-md text-sm text-text-secondary">
          {{ t('landingMobileDescription') }}
        </p>
        <div class="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <span
            class="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-text px-6 py-3 text-sm font-medium text-white opacity-50 sm:w-auto"
            :title="t('landingComingSoon')"
          >
            {{ t('landingMobileAppStoreSoon') }}
          </span>
          <span
            class="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-text px-6 py-3 text-sm font-medium text-white opacity-50 sm:w-auto"
            :title="t('landingComingSoon')"
          >
            {{ t('landingMobileGooglePlaySoon') }}
          </span>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-6 py-12">
      <RevealOnScroll>
        <div class="rounded-3xl bg-gradient-to-br from-primary to-primary-2 px-8 py-12 text-center text-white sm:px-16">
          <span class="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            {{ t('landingCtaEyebrow') }}
          </span>
          <h2 class="mt-4 text-3xl text-white">{{ t('landingCtaTitle') }}</h2>
          <p class="mx-auto mt-3 max-w-md text-white/90">
            {{ t('landingCtaDescription', { points: bonusPoints }) }}
          </p>
          <NuxtLink
            to="/signup"
            class="mt-6 inline-block rounded-full bg-white px-8 py-3 text-base font-semibold text-primary transition-transform hover:scale-105"
          >
            {{ t('authSignupButton') }}
          </NuxtLink>
        </div>
      </RevealOnScroll>
    </section>

    <footer class="border-t border-border">
      <div class="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-8 text-center">
        <img src="/images/logo.png" alt="Skillou" class="h-6 w-auto mix-blend-multiply opacity-80">
        <p class="text-xs text-text-tertiary">{{ t('landingFooterTagline') }}</p>
        <p class="text-xs text-text-tertiary">© {{ new Date().getFullYear() }} Skillou. Tous droits réservés.</p>
      </div>
    </footer>
  </div>
</template>
