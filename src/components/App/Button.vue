<script setup lang="ts">
interface IProps {
  type?: "button" | "submit";
  loading?: boolean;
  label?: string;
  variant?: "default" | "primary";
  size?: "large" | "small";
  isPlain?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  type: "submit",
  loading: false,
  variant: "primary",
  isCircle: false,
  size: "large",
  isPlain: false,
});

const emit = defineEmits<{
  (e: "submit"): void;
}>();
</script>

<template>
  <el-button
    :plain="props.isPlain"
    round
    @click="emit('submit')"
    :size="props.size"
    :disabled="props.loading"
    :loading="props.loading"
    :type="props.variant"
    :native-type="props.type"
    class="app-button flex items-center"
  >
    {{ props.label }}
    <slot />
  </el-button>
</template>
