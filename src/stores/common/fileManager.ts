export interface BlobInfo {
  id: () => string;
  name: () => string;
  filename: () => string;
  blob: () => Blob;
  base64: () => string;
  blobUri: () => string;
  uri: () => string | undefined;
}

export const useFileManagerStore = defineStore("fileManager", () => {
  const { $authFetch } = useNuxtApp();
  const { t } = useI18n();

  const { apiURL, storageURL } = useRuntimeConfig().public;
  const isLoading = ref(false);

  const uploadImage = async (
    blobInfo: BlobInfo,
    success: (arg: string) => void,
    failure: (arg: string) => void
  ) => {
    isLoading.value = true;

    const formData = new FormData();
    formData.append("file", blobInfo.blob(), blobInfo.filename());

    const { data, error } = await $authFetch("/file-manager/upload")
      .post(formData)
      .json<{ data: unknown }>();

    if (error.value) {
      isLoading.value = true;

      failure(t("help.upload_eror_image"));
      return;
    }

    if (!data.value || typeof data.value.data !== "string") {
      isLoading.value = true;

      failure(t("help.invalid_json"));
      return;
    }

    const dataPath = data.value.data;
    success(`${apiURL}/${storageURL}/${dataPath}`);

    isLoading.value = true;
  };

  const uploadFile = async (file: File) => {
    isLoading.value = true;

    const formData = new FormData();
    formData.append("file", file);

    const { data, error } = await $authFetch("/file-manager/upload")
      .post(formData)
      .json<{ data: unknown }>();

    if (!error.value && data.value && typeof data.value.data === "string") {
      isLoading.value = false;

      return data.value.data;
    }

    isLoading.value = false;
  };

  const uploadFiles = async (file: File[]) => {
    isLoading.value = true;

    if (!file.length) return Promise.resolve([]);

    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("files[]", file[i]);
    }

    const { data, error } = await $authFetch("/file-manager/multiple-upload")
      .post(formData)
      .json<{ data: unknown }>();

    if (!error.value && data.value && Array.isArray(data.value.data)) {
      isLoading.value = false;

      return data.value.data;
    }

    isLoading.value = false;
  };

  const deleteFile = async (path: string, success: () => void) => {
    isLoading.value = true;

    const { error } = await $authFetch(
      `/file-manager/delete?file_path=${path}`
    ).delete();

    if (!error.value) {
      isLoading.value = false;

      success();
    } else {
      ElMessage.error(t("help.no_such_file_exists"));

      isLoading.value = false;
    }
  };

  return {
    isLoading,
    uploadImage,
    uploadFile,
    uploadFiles,
    deleteFile,
  };
});
