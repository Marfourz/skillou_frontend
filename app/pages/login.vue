<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const { t } = useI18n()
const authStore = useAuthStore()

useHead({ title: t('authLoginTitle') })

const schema = toTypedSchema(
  z.object({
    username: z.string({ required_error: t('authUsernameRequired') }).min(1, t('authRequiredField')),
    password: z.string({ required_error: t('authPasswordRequired') }).min(1, t('authPasswordRequired')),
  }),
)

const { handleSubmit, defineField, errors } = useForm({ validationSchema: schema })
const [username, usernameAttrs] = defineField('username')
const [password, passwordAttrs] = defineField('password')

const loading = ref(false)
const serverError = ref('')

const onSubmit = handleSubmit(async (values) => {
  serverError.value = ''
  loading.value = true
  try {
    await authStore.login(values.username, values.password)
    await navigateTo('/home')
  } catch (error: any) {
    serverError.value = error?.response?.status === 401
      ? t('authLoginInvalidCredentials')
      : t('snackbarGenericError')
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
    <h1 class="text-center text-3xl">{{ t('authLoginTitle') }}</h1>

    <form class="mt-8 space-y-4" @submit="onSubmit">
      <AppTextField
        v-model="username"
        v-bind="usernameAttrs"
        :placeholder="t('authUsernameHint')"
        :error="errors.username"
      />
      <AppTextField
        v-model="password"
        v-bind="passwordAttrs"
        type="password"
        :placeholder="t('authPasswordHint')"
        :error="errors.password"
      />

      <div class="text-right">
        <NuxtLink to="/forgot-password" class="text-sm font-medium text-primary">
          {{ t('authForgotPasswordTitle') }}
        </NuxtLink>
      </div>

      <div
        v-if="serverError"
        class="flex items-start gap-2 rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger"
      >
        <svg class="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="8" x2="12" y2="13" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span>{{ serverError }}</span>
      </div>

      <AppButton type="submit" :loading="loading" class="w-full">
        {{ loading ? t('commonLoading') : t('authLoginTitle') }}
      </AppButton>
    </form>

    <p class="mt-6 text-center text-sm text-text-secondary">
      {{ t('authNoAccountPrompt') }}
      <NuxtLink to="/signup" class="font-semibold text-primary">{{ t('authSignupLink') }}</NuxtLink>
    </p>
  </div>
</template>
