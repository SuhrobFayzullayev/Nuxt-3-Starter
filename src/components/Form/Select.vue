<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { useField } from "vee-validate";
import type { SelectOption } from "~/helpers/types";

const props = defineProps<{
  options: SelectOption[];
  name: string;
  label?: string;
  placeholder?: string;
}>();

const { value, errorMessage } = useField<string | number | undefined>(
  props.name
);
</script>

<template>
  <ElFormItem
    :error="
      errorMessage &&
      $t(
        errorMessage.includes('Required')
          ? 'form.error.field_is_required'
          : errorMessage
      )
    "
    :label="label"
    size="large"
    class="app-form-item select"
    required
    inline-message
  >
    <ElSelect
      :placeholder="$t('common_schema.select_or_prompt')"
      filterable
      v-bind="$attrs"
      v-model="value"
      size="large"
      class="w-full"
      :no-match-text="$t('message.no_match_text')"
      :no-data-text="$t('message.no_data')"
    >
      <ElOption
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </ElSelect>
  </ElFormItem>
</template>
