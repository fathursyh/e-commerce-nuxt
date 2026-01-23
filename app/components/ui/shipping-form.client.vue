<script setup lang="ts">
  import { z } from "zod";
  import type { FormSubmitEvent } from "#ui/types";
  const emits = defineEmits(["close"]);
  const { saveAddress } = useAddressActions();
  const { mutateAsync, isPending } = saveAddress();
  const toast = useToast();
  const countries = [
    { label: "Indonesia", value: "ID" },
    { label: "United States", value: "US" },
    { label: "Singapore", value: "SG" },
  ];

  const addressTypes = [
    { label: "Shipping", value: "shipping", icon: "i-heroicons-truck" },
    { label: "Billing", value: "billing", icon: "i-heroicons-credit-card" },
  ];

  const schema = z.object({
    address_type: z.enum(["shipping", "billing"]),
    first_name: z.string().min(1, "First name is required").max(255),
    last_name: z.string().min(1, "Last name is required").max(255),
    phone: z.string().min(1, "Phone is required").max(20),
    address_line1: z.string().min(1, "Address is required").max(255),
    address_line2: z.union([z.string().max(255), z.null(), z.undefined()]),
    city: z.string().min(1, "City is required").max(255),
    state: z.string().min(1, "State is required").max(255),
    postal_code: z.string().min(1, "Zip code is required").max(20),
    country: z.string().length(2, "Invalid country code"),
    is_default: z.boolean(),
  });

  type Schema = z.output<typeof schema>;

  const state = reactive<Schema>({
    address_type: "shipping",
    first_name: "",
    last_name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "ID",
    is_default: false,
  });

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
      await mutateAsync(event.data);
      toast.add({
        title: "New Address Added",
        description: `Your ${event.data.address_type} has been successfully added.`,
      });
      emits("close");
    } catch (err) {
      toast.add({
        color: "error",
        title: "Address Failed",
        description: "Something's wrong when adding your address.",
      });
      console.error(err);
    }
  }
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-5" @submit="onSubmit">
    <!-- Address Type Section -->
    <div class="space-y-2">
      <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
        Address Type
      </label>
      <UFormField name="address_type">
        <URadioGroup
          v-model="state.address_type"
          :items="addressTypes"
          class="grid grid-cols-2 gap-3"
        >
          <template #label="{ item }">
            <div class="flex items-center gap-2">
              <UIcon :name="item.icon" class="w-4 h-4" />
              <span>{{ item.label }}</span>
            </div>
          </template>
        </URadioGroup>
      </UFormField>
    </div>

    <UDivider />

    <!-- Personal Information -->
    <div class="space-y-3">
      <h3
        class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide"
      >
        Personal Information
      </h3>

      <div class="grid grid-cols-2 gap-3">
        <UFormField label="First Name" name="first_name" required>
          <UInput
            v-model="state.first_name"
            placeholder="John"
            icon="i-heroicons-user"
          />
        </UFormField>

        <UFormField label="Last Name" name="last_name" required>
          <UInput
            v-model="state.last_name"
            placeholder="Doe"
            icon="i-heroicons-user"
          />
        </UFormField>
      </div>

      <UFormField label="Phone Number" name="phone" required>
        <UInput
          v-model="state.phone"
          placeholder="+62 812 3456 7890"
          icon="i-heroicons-phone"
        />
      </UFormField>
    </div>

    <UDivider />

    <!-- Address Details -->
    <div class="space-y-3">
      <h3
        class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide"
      >
        Address Details
      </h3>

      <UFormField label="Street Address" name="address_line1" required>
        <UInput
          v-model="state.address_line1"
          placeholder="123 Main Street"
          icon="i-heroicons-map-pin"
        />
      </UFormField>

      <UFormField
        label="Address Line 2"
        name="address_line2"
        help="Apartment, suite, floor (optional)"
      >
        <UInput v-model="state.address_line2" placeholder="Floor 3" />
      </UFormField>

      <div class="grid grid-cols-3 gap-3">
        <UFormField label="City" name="city" required>
          <UInput v-model="state.city" placeholder="Jakarta" />
        </UFormField>

        <UFormField label="State" name="state" required>
          <UInput v-model="state.state" placeholder="DKI" />
        </UFormField>

        <UFormField label="ZIP" name="postal_code" required>
          <UInput v-model="state.postal_code" placeholder="12345" />
        </UFormField>
      </div>

      <UFormField label="Country" name="country" required>
        <USelectMenu
          v-model="state.country"
          :items="countries"
          value-key="value"
          label-key="label"
          icon="i-heroicons-globe-alt"
        />
      </UFormField>
    </div>

    <!-- Default Address Option -->
    <div class="pt-2">
      <UFormField name="is_default">
        <UCheckbox v-model="state.is_default" label="Set as default address" />
      </UFormField>
    </div>

    <!-- Action Buttons -->
    <div
      class="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800"
    >
      <UButton
        label="Cancel"
        variant="ghost"
        color="neutral"
        @click="$emit('close')"
      />

      <UButton
        type="submit"
        label="Save Address"
        color="primary"
        :loading="isPending"
        icon="i-heroicons-check"
      />
    </div>
  </UForm>
</template>
