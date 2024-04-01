<script setup lang="ts">
import {
  type fileCheckTypes,
  useFilesCheck,
} from "~/composables/useFilesCheck";

const props = defineProps<{
  name: string;
  label: string;
  accept: Array<keyof typeof fileCheckTypes>;
  limitSize?: number; // MB
  defaultUrl?: string;
}>();

const { value: inputValue, errorMessage: error } = useField<
  File | null | undefined
>(props.name);

const { checkFiles } = useFilesCheck({
  accept: props.accept,
  limitSize: props.limitSize,
});

const { storageURL, apiURL } = useRuntimeConfig().public;
const fileInput = ref<HTMLInputElement>();

const handleChange = () => {
  if (!fileInput.value) return;
  const files = checkFiles(fileInput.value.files);
  if (files) inputValue.value = files[0];
  else inputValue.value = null;

  fileInput.value.value = "";
  if (!/safari/i.test(navigator.userAgent)) {
    fileInput.value.type = "";
    fileInput.value.type = "file";
  }
};
</script>

<template>
  <div class="relative flex flex-col items-start justify-start">
    <div class="flex flex-wrap items-center gap-4">
      <input
        ref="fileInput"
        type="file"
        :accept="accept.map((type) => `.${type}`).join(',')"
        class="hidden"
        @change="handleChange"
      />

      <el-button
        size="large"
        :type="!!error ? 'danger' : 'primary'"
        @click="fileInput?.click()"
      >
        {{ label }}
      </el-button>

      <span v-if="inputValue" class="text-cblack">
        {{ inputValue.name }}
      </span>
    </div>

    <span v-if="!!error" class="m-1 text-xs text-[var(--el-color-danger)]">
      {{ $t("help.field_is_required") }}
    </span>

    <base-link
      v-if="defaultUrl && !inputValue"
      class="mt-1 text-cblue"
      :to="`${apiURL}${storageURL}/${defaultUrl}`"
      target="_blank"
    >
      {{ defaultUrl }}
    </base-link>
  </div>
</template>
