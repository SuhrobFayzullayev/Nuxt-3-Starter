<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { useField } from "vee-validate";

interface IProps {
  name: string;
  label?: string | undefined;
  placeholder?: string | undefined;
  mask?: string;
}

const { name, label, placeholder, mask } = defineProps<IProps>();

const { value, errorMessage } = useField<string | number | undefined>(name);
</script>

<template>
  <el-formItem
    :error="
      errorMessage &&
      $t(
        errorMessage.includes('Required')
          ? 'help.field_is_required'
          : errorMessage
      )
    "
    :label="label"
    size="large"
  >
    <el-input
      v-if="mask?.length"
      v-mask="mask"
      v-model="value"
      :placeholder="placeholder"
      v-bind="$attrs"
    />

    <el-input
      v-else
      v-model="value"
      :placeholder="placeholder"
      v-bind="$attrs"
    />
  </el-formItem>
</template>
