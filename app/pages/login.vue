<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

definePageMeta({ middleware: 'guest' })

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
    serverError.value = error?.status === 401
      ? t('authLoginInvalidCredentials')
      : getApiErrorMessage(error, t('snackbarGenericError'))
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

      <AppAlert v-if="serverError">{{ serverError }}</AppAlert>

      <AppButton type="submit" :loading="loading" class="w-full">
        {{ loading ? t('commonLoading') : t('authLoginTitle') }}
      </AppButton>
    </form>

    <p class="mt-6 text-center text-sm text-text-secondary">
      {{ t('authNoAccountPrompt') }}
      <NuxtLink to="/signup" class="font-semibold text-primary">{{ t('authSignupLink') }}</NuxtLink>
    </p>
  </AppAuthShell>
</template>
