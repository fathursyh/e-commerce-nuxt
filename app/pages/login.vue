<script setup lang="ts">
  import * as z from "zod";
  import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui";

  const { loginUser } = useAuthActions();

  const fields: AuthFormField[] = [
    {
      name: "email",
      type: "email",
      label: "Email",
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
    email: z
    .string("Email is required")
    .email(),
    password: z
      .string("Password is required")
      .min(8, "Must be at least 8 characters"),
  });

  type Schema = z.output<typeof schema>;

  function onSubmit(payload: FormSubmitEvent<Schema>) {
    loginUser(payload.data);
  }
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4 min-h-[90vh]">
    <UPageCard class="w-full max-w-sm px-4">
      <UAuthForm
        :schema="schema"
        title="Login"
        description="Enter your credentials to access your account."
        icon="i-lucide-user"
        :fields="fields"
        @submit="onSubmit"
      />
    </UPageCard>
  </div>
</template>
