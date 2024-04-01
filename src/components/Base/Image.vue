<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string;
    alt?: string;
    type?: "image" | "person";
  }>(),
  {
    alt: "Image not found",
    type: "image",
  }
);

const imgUrl = computed(() => {
  if (props.src) return props.src;
  return `/images/${props.type}-not-found.jpg`;
});
</script>

<template>
  <img
    :src="imgUrl"
    :alt="props.alt"
    loading="lazy"
    :onerror="`this.src='/images/${props.type}-not-found.jpg'`"
    class="w-full"
  />
</template>
