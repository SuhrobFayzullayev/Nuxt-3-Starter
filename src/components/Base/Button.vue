<script setup lang="ts">
interface IProps {
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  label?: string;
  isError?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  type: "submit",
  disabled: false,
  loading: false,
  isError: false,
});

const btnDisabled = computed(() => props.disabled || props.loading);

const emit = defineEmits<{
  (e: "submit"): void;
}>();
</script>

<template>
  <el-button
    @click="emit('submit')"
    size="large"
    :disabled="btnDisabled"
    :loading="props.loading"
    :type="props.isError ? 'danger' : 'success'"
    :native-type="props.type"
    :class="[props.isError && 'text-cred']"
  >
    <base-typography
      :label="props.label"
      class="font-semibold"
      :class="[!props.loading && 'px-3']"
      color="white"
      size="xs"
    />
  </el-button>
</template>
