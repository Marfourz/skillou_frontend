<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

definePageMeta({ middleware: 'guest' })

const { t } = useI18n()
const api = useApi()

useHead({ title: t('authForgotPasswordTitle') })

const schema = toTypedSchema(
  z.object({
    email: z.string({ required_error: t('authEmailInvalid') }).email(t('authEmailInvalid')),
  }),
)

const { handleSubmit, defineField, errors } = useForm({ validationSchema: schema })
const [email, emailAttrs] = defineField('email')

const loading = ref(false)
const sent = ref(false)
const serverError = ref('')

const onSubmit = handleSubmit(async (values) => {
  serverError.value = ''
  loading.value = true
  try {
    await api('/auth/password/reset/', {
      method: 'POST',
      body: { email: values.email },
    })
    sent.value = true
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

    <div v-if="!sent">
      <h1 class="text-3xl">{{ t('authForgotPasswordTitle') }}</h1>
      <p class="mt-2 text-sm text-text-secondary">{{ t('authForgotPasswordSubtitle') }}</p>

      <form class="mt-8 space-y-4" @submit="onSubmit">
        <AppTextField
          v-model="email"
          v-bind="emailAttrs"
          type="email"
          :placeholder="t('authEmailHint')"
          :error="errors.email"
        />

        <AppAlert v-if="serverError">{{ serverError }}</AppAlert>

        <AppButton type="submit" :loading="loading" class="w-full">
          {{ loading ? t('commonLoading') : t('authSendResetLinkButton') }}
        </AppButton>
      </form>
    </div>

    <div v-else class="text-center">
      <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-fade">
        <svg class="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 6h16v12H4z" />
          <path d="M4 7l8 6 8-6" />
        </svg>
      </div>
      <h1 class="mt-6 text-2xl">{{ t('authEmailSentTitle') }}</h1>
      <p class="mt-3 text-sm text-text-secondary">{{ t('authEmailSentSubtitle') }}</p>
      <NuxtLink to="/login" class="mt-8 inline-block text-sm font-semibold text-primary">
        {{ t('authBackToLoginButton') }}
      </NuxtLink>
    </div>
  </AppAuthShell>
</template>
