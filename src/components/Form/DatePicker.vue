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
}

const { name, label } = defineProps<IProps>();

const { value, errorMessage } = useField<string | number | undefined>(name);
</script>

<template>
  <el-formItem
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
  >
    <el-date-picker
      v-model="value"
      type="date"
      :editable="false"
      :clearable="false"
      format="DD.MM.YYYY"
      value-format="DD.MM.YYYY"
      size="large"
      :placeholder="$t('common_schema.date_picker')"
    />
  </el-formItem>
</template>
