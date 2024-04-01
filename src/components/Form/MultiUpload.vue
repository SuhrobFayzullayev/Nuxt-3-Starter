<script setup lang="ts">
import {
  type fileCheckTypes,
  useFilesCheck,
} from "~/composables/useFilesCheck";
import { useFileManagerStore } from "~/stores/fileManager";

const fileManagerStore = useFileManagerStore();
const { t } = useI18n();

const props = defineProps<{
  name: string;
  label: string;
  accept: Array<keyof typeof fileCheckTypes>;
  limitSize?: number; // MB
}>();

const {
  value: inputValues,
  errorMessage: error,
  setErrors,
} = useField<string | string[] | null | undefined | any>(props.name);

const { checkFiles } = useFilesCheck({
  accept: props.accept,
  limitSize: props.limitSize,
  limitCount: 4,
});

const { storageURL, apiURL } = useRuntimeConfig().public;
const fileInput = ref<HTMLInputElement>();

const handleChange = async () => {
  if (!fileInput.value) return;
  const files = checkFiles(fileInput.value.files);

  if (files) {
    let uploadedImages: string[] | any = [];

    if (files.length)
      uploadedImages = await fileManagerStore.uploadFiles(files);

    if (!inputValues.value || !inputValues.value.length) inputValues.value = [];

    uploadedImages?.map((image: string) => inputValues.value.push(image));
  } else inputValues.value = [];

  fileInput.value.value = "";
  if (!/safari/i.test(navigator.userAgent)) {
    fileInput.value.type = "";
    fileInput.value.type = "file";
  }
};

const deleteImage = async (index: number, path: string) => {
  await fileManagerStore.deleteFile(path, success);

  function success() {
    inputValues.value?.splice(index, 1);
    ElMessage.error(t("message.delete_complated"));

    if (!Array.from(inputValues.value).length)
      setErrors("help.field_is_required");
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
    </div>

    <div v-if="inputValues?.length" class="w-full max-w-2xl mt-7">
      <div
        v-for="(inputValue, index) in inputValues"
        :key="index"
        class="flex items-center justify-between border p-3 mb-3"
      >
        <div class="img-block w-[70px] h-[70px] overflow-hidden">
          <base-image
            :src="`${apiURL}/${storageURL}/${inputValue}`"
            class="w-full h-full object-cover"
          />
        </div>

        <div
          class="text-block w-[calc(100%-120px)] truncate text-left text-blue-500"
        >
          <base-link
            :to="`${apiURL}/${storageURL}/${inputValue}`"
            target="_blank"
            >{{ inputValue }}</base-link
          >
        </div>

        <div
          @click="deleteImage(index, inputValue)"
          class="delete-block bg-cwhite w-[30px] h-[30px] flex justify-center items-center cursor-pointer rounded-md"
        >
          <i-base-delete filled />
        </div>
      </div>
    </div>

    <span v-if="!!error" class="m-1 text-xs text-[var(--el-color-danger)]">
      {{ $t("help.field_is_required") }}
    </span>
  </div>
</template>

<style scoped>
.truncate {
  color: #3b82f6;
}
</style>
