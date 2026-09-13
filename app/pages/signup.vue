<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

definePageMeta({ middleware: 'guest' })

const { t } = useI18n()
const authStore = useAuthStore()

useHead({ title: t('authSignupTitle') })

const schema = toTypedSchema(
  z.object({
    username: z.string({ required_error: t('authRequiredField') }).min(1, t('authRequiredField')),
    email: z.string({ required_error: t('authEmailInvalidGeneric') }).email(t('authEmailInvalidGeneric')),
    password: z.string({ required_error: t('authPasswordRequired') }).min(6, t('authPasswordTooShort')),
    confirmPassword: z.string({ required_error: t('authPasswordRequired') }),
    city: z.string().optional(),
  }).refine(data => data.password === data.confirmPassword, {
    message: t('authPasswordMismatch'),
    path: ['confirmPassword'],
  }),
)

const { handleSubmit, defineField, errors } = useForm({ validationSchema: schema })
const [username, usernameAttrs] = defineField('username')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')
const [city] = defineField('city')

const cityCoords = ref<{ lat: string, lon: string } | null>(null)

function onCitySelected(result: { city: string, lat: string, lon: string }) {
  city.value = result.city
  cityCoords.value = { lat: result.lat, lon: result.lon }
}

const loading = ref(false)
const serverError = ref('')

const onSubmit = handleSubmit(async (values) => {
  serverError.value = ''
  loading.value = true
  try {
    await authStore.signup({
      email: values.email,
      username: values.username,
      password: values.password,
      city: values.city || undefined,
      adress: values.city || undefined,
      locationLat: cityCoords.value?.lat,
      locationLon: cityCoords.value?.lon,
    })
    await navigateTo('/onboarding/availability')
  } catch (error) {
    serverError.value = getApiErrorMessage(error, t('snackbarGenericError'))
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <AppAuthShell>
    <template #illustration>
      <ActivitiesShowcase />
    </template>

    <h1 class="text-center text-3xl">{{ t('authSignupTitle') }}</h1>

    <form class="mt-8 space-y-4" @submit="onSubmit">
      <AppTextField
        v-model="username"
        v-bind="usernameAttrs"
        :placeholder="t('authUsernameHint')"
        :error="errors.username"
      />
      <AppTextField
        v-model="email"
        v-bind="emailAttrs"
        type="email"
        :placeholder="t('authEmailFieldHint')"
        :error="errors.email"
      />
      <AppTextField
        v-model="password"
        v-bind="passwordAttrs"
        type="password"
        :placeholder="t('authPasswordHint')"
        :error="errors.password"
      />
      <AppTextField
        v-model="confirmPassword"
        v-bind="confirmPasswordAttrs"
        type="password"
        :placeholder="t('authConfirmPasswordHint')"
        :error="errors.confirmPassword"
      />
      <CityAutocompleteField
        v-model="city"
        :placeholder="t('authCityHint')"
        @select="onCitySelected"
      />

      <AppAlert v-if="serverError">{{ serverError }}</AppAlert>

      <AppButton type="submit" :loading="loading" class="w-full">
        {{ loading ? t('commonLoading') : t('authSignupButton') }}
      </AppButton>
    </form>

    <p class="mt-6 text-center text-sm text-text-secondary">
      {{ t('authHaveAccountPrompt') }}
      <NuxtLink to="/login" class="font-semibold text-primary">{{ t('authLoginLink') }}</NuxtLink>
    </p>
  </AppAuthShell>
</template>
