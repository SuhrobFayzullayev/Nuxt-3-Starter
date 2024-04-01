<script setup lang="ts">
import { menu } from "~/constants";
const localePath = useLocalePath();

definePageMeta({
  layout: "default-admin",
  middleware: "admin-auth",
});

onMounted(() => {
  return navigateTo(localePath(`${menu.admin[0].path}`));
});
</script>
<template></template>
