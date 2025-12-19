<script setup lang="ts">
  import * as z from "zod";
  import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui";

  const { loginUser } = useAuthActions();
  const { mutate, isPending } = loginUser();
  const fields: AuthFormField[] = [
    {
      name: "email",
      type: "email",
      label: "Email",
      autocomplete: "on",
      placeholder: "Enter your email",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
    },
  ];

  const schema = z.object({
    email: z.string("Email is required").email(),
    password: z
      .string("Password is required")
      .min(8, "Must be at least 8 characters"),
  });
  type Schema = z.output<typeof schema>;
  function onSubmit(payload: FormSubmitEvent<Schema>) {
    mutate(payload.data);
  }
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4 min-h-[90vh]">
    <UPageCard class="w-full max-w-sm px-4">
      <UAuthForm
        :schema="schema"
        title="Login"
        description="Enter your credentials to access your account."
        icon="i-heroicons-user"
        :fields="fields"
        :loading="false"
        :submit="{
          label: 'Login',
          variant: 'solid',
          disabled: isPending,
        }"
        :disabled="isPending"
        @submit="onSubmit"
      />
      <p class="text-sm text-gray-500 text-center">
        Have no accounts?
        <NuxtLink
          class="text-blue-500 font-semibold hover:underline"
          to="/register"
          >Register Here</NuxtLink
        >
      </p>
    </UPageCard>
  </div>
</template>
