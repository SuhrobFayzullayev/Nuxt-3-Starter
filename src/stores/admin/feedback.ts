export interface Response {
  fullname: string;
  phone: string;
  message: string;
}

export const useAdminFeedbackStore = defineStore("adminFeedback", () => {
  const { $authFetch } = useNuxtApp();
  const { t } = useI18n();

  const isLoading = ref(false);
  const items = ref<Response[]>([]);
  const pagination = reactive({
    currentPage: 1,
    perPage: 1,
    total: 1,
  });

  const fetchAll = async (page = 1) => {
    isLoading.value = true;
    const { data, error } = await $authFetch(`/feedbacks?page=${page}`)
      .get()
      .json<{
        data: {
          data: Response[];
          current_page: number;
          per_page: number;
          total: number;
        };
      }>();

    if (!error.value && data.value) {
      items.value = data.value.data.data;
      pagination.currentPage = data.value.data.current_page;
      pagination.perPage = data.value.data.per_page;
      pagination.total = data.value.data.total;
    }
    isLoading.value = false;
  };

  const deleteOne = async (id: number) => {
    isLoading.value = true;
    const { error } = await $authFetch(`/feedbacks/${id}`).delete();

    if (!error.value) {
      ElMessage({
        type: "error",
        message: t("message.delete_complated"),
      });

      await fetchAll();
    }
    isLoading.value = false;
  };

  return {
    isLoading,
    items,
    pagination,
    fetchAll,
    deleteOne,
  };
});
