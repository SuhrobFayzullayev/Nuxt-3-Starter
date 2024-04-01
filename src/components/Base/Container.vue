<script setup lang="ts">
withDefaults(
  defineProps<{
    is?: "div" | "main" | "section" | "header" | "footer" | "aside";
  }>(),
  {
    is: "div",
  }
);
</script>

<template>
  <div class="px-6 w-full">
    <component :is="is" class="mx-auto custom-container h-full">
      <slot />
    </component>
  </div>
</template>
