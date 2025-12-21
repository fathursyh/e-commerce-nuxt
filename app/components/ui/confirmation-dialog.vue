<template>
  <UModal
    :dismissible="false"
    title="Delete Confirmation"
    :close="false"
    portal="body"
  >
    <slot />
    <template #body>
      <h3>{{ text }}</h3>
    </template>
    <template #footer="{ close }">
      <div class="w-full flex gap-4 justify-end">
        <UButton variant="ghost" color="neutral" @click="close">Cancel</UButton>
        <UButton
          color="error"
          :ui="{ base: 'min-w-24 justify-center' }"
          @click="
            () => {
              $emit('on-confirm');
              close();
            }
          "
          >{{ confirmText || "OK" }}</UButton
        >
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
  defineEmits(["on-confirm"]);
  defineProps<{
    text: string;
    confirmText?: string;
  }>();
</script>
