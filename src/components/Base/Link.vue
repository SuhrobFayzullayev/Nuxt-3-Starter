<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

interface IProps {
  to?: RouteLocationRaw;
  target?: "_blank" | "_self";
  download?: boolean;
}

withDefaults(defineProps<IProps>(), {
  to: "#",
  target: "_self",
  download: false,
});
</script>

<template>
  <NuxtLinkLocale :to="to" :target="target">
    <slot />
  </NuxtLinkLocale>
</template>
