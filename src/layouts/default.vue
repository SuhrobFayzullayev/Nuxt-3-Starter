<template>
  <div class="w-full mx-auto bg-[var(--base-white)] flex min-h-screen flex-col">
    <!-- Indicator color // #2490CD // -->
    <NuxtLoadingIndicator color="#2490CD" />

    <!-- Header -->
    <LayoutHeader />

    <!-- Dynamic Page -->
    <slot />

    <!-- Footer -->
    <LayoutFooter />
  </div>
</template>
