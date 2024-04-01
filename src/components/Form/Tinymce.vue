<script setup lang="ts">
import Editor from "@tinymce/tinymce-vue";
import { type BlobInfo, useFileManagerStore } from "~/stores/fileManager";

const props = withDefaults(
  defineProps<{
    name: string;
    label: string;
    cloudChannel?: string;
  }>(),
  { cloudChannel: "5" }
);

const { tinymceKEY } = useRuntimeConfig().public;
const { value, errorMessage } = useField<string | undefined>(props.name);
const fileManagerStore = useFileManagerStore();

const handleTinyImageUpload = (
  blobInfo: BlobInfo,
  success: any,
  failure: any
) => {
  fileManagerStore.uploadImage(blobInfo, success, failure);
};
</script>

<template>
  <ElFormItem
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
    class="app-form-item"
    inline-message
  >
    <Editor
      v-model="value"
      :api-key="tinymceKEY"
      :cloud-channel="cloudChannel"
      class="h-80 w-full border border-[var(--el-border-color)]"
      :init="{
        width: '100%',
        height: 320,
        menubar: true,
        images_upload_handler: handleTinyImageUpload,
        plugins: [
          'advlist autolink lists code table link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          'undo redo | code | table | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat',
      }"
    />
  </ElFormItem>
</template>
