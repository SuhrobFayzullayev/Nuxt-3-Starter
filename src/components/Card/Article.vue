<script setup lang="ts">
interface Props {
  // props type
  // active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  // props default value
  // {active: false}
});
</script>

<template>Article Card</template>
