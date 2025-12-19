<script setup lang="ts">
  import * as z from "zod";
  import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui";

  const { registerUser } = useAuthActions();
  const { mutate, isPending } = registerUser();
  const fields: AuthFormField[] = [
    {
      name: "name",
      type: "text",
      label: "Full Name",
      placeholder: "Enter your full name",
      required: true,
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      label: "Phone Number",
      placeholder: "Enter your phone number",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Create a password",
      required: true,
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Repeat your password",
      required: true,
    },
  ];

  const schema = z
    .object({
      name: z.string("Fullname is required").min(2, "Name is too short"),
      email: z.string("Email is required").email("Invalid email address"),
      phone: z.string("Phone number is required"),
      password: z
        .string("Password is required")
        .min(8, "Must be at least 8 characters"),
      confirmPassword: z.string("Confirm password is requred"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  type Schema = z.output<typeof schema>;

  function onSubmit(payload: FormSubmitEvent<Schema>) {
    mutate({
      ...payload.data,
      password_confirmation: payload.data.confirmPassword,
    });
  }
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4 min-h-[90vh]">
    <UPageCard class="w-full max-w-sm px-4">
      <UAuthForm
        :schema="schema"
        title="Create an account"
        description="Fill in the details below to get started."
        icon="i-heroicons-user-plus"
        :fields="fields"
        :submit="{
          label: 'Register',
          variant: 'solid',
          disabled: isPending,
        }"
        :disabled="isPending"
        @submit="onSubmit"
      />
      <p class="text-sm text-gray-500 text-center">
        Already have an account?
        <NuxtLink
          class="text-blue-500 font-semibold hover:underline"
          to="/login"
        >
          Login Here
        </NuxtLink>
      </p>
    </UPageCard>
  </div>
</template>
