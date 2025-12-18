<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-4">
                <div v-for="n in 2" :key="n" class="rounded-lg p-4 bg-white">
                    <div class="flex gap-4">
                        <USkeleton class="w-24 h-24 rounded-lg" />

                        <div class="flex-1 space-y-3">
                            <USkeleton class="h-5 w-40" /> <!-- Title -->
                            <USkeleton class="h-4 w-24" /> <!-- Color -->
                            <USkeleton class="h-4 w-20" /> <!-- Size -->
                            <USkeleton class="h-5 w-16" /> <!-- Price -->
                        </div>

                        <div class="flex flex-col items-end justify-between">

                            <USkeleton class="h-6 w-6 rounded-full" /> <!-- Trash -->

                            <div class="flex items-center gap-2">
                                <USkeleton class="h-6 w-6 rounded-md" /> <!-- - -->
                                <USkeleton class="h-5 w-8" /> <!-- Qty -->
                                <USkeleton class="h-6 w-6 rounded-md" /> <!-- + -->
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="lg:col-span-1 space-y-4">
                <div class="rounded-lg p-4 bg-white space-y-4">
                    <USkeleton class="h-6 w-40" /> <!-- Header -->
                    <USkeleton class="h-5 w-full" />
                    <USkeleton class="h-5 w-full" />
                    <USkeleton class="h-5 w-full" />
                    <USkeleton class="h-6 w-32" />
                    <USkeleton class="h-10 w-full rounded-md" /> <!-- Checkout button -->
                    <USkeleton class="h-10 w-full rounded-md" /> <!-- Continue Shopping -->
                </div>
                <div class="rounded-lg p-4 bg-white space-y-3">
                    <USkeleton class="h-10 w-full rounded-md" /> <!-- Input -->
                    <USkeleton class="h-10 w-full rounded-md" /> <!-- Apply button -->
                </div>
            </div>
        </div>
    </div>
</template>