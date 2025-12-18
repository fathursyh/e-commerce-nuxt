<template>
  <UCard class="overflow-hidden">
    <template #header>
      <div class="relative">
        <USkeleton class="w-full h-64 rounded-t-lg" />
        <USkeleton class="h-6 w-16 absolute top-3 left-3" />
      </div>
    </template>

    <div>
      <USkeleton class="h-6 w-3/4 mb-2" />

      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <USkeleton class="h-8 w-20" />
          <USkeleton class="h-4 w-12" />
        </div>
        <USkeleton class="h-9 w-28" />
      </div>
    </div>
  </UCard>
</template>