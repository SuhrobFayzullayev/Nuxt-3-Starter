import { handleArrayI18n, type DefaultObject } from "~/helpers/functions";

export interface Response {
  image: string;
  title: string;
  content: string;
  meta_title: string;
  meta_title_en: string;
  meta_description: string;
}

export const useServiceStore = defineStore("service", () => {
  const { $baseFetch } = useNuxtApp();
  const { locale } = useI18n();

  const isLoading = ref(false);
  const items = ref<any>();
  const item = ref<any>();
  const pagination = reactive({
    currentPage: 1,
    pageSize: 1,
  });

  const fetchOne = async (id: string | string[]) => {
    isLoading.value = true;

    const { data, error } = await useAsyncData("service", () =>
      $baseFetch(`/service/${id}`)
    );

    if (!error.value && data.value) {
      let fetchedData: {
        data?: unknown;
      } = data.value;

      item.value = handleArrayI18n(
        [fetchedData.data as DefaultObject],
        [
          "title",
          "content",
          "video_title",
          "meta_title",
          "meta_description",
          "meta_keyword",
        ],
        locale.value
      )[0] as unknown as any;
    }

    isLoading.value = false;
  };

  const fetchAll = async () => {
    isLoading.value = true;

    const { data, error } = await useAsyncData("service", () =>
      $baseFetch(`/services`)
    );

    if (!error.value && data.value) {
      let fetchedData: {
        data?: {
          data: unknown[];
          total?: number;
          per_page?: number;
          current_page?: number;
        };
      } = data.value;

      items.value = handleArrayI18n(
        fetchedData.data?.data as DefaultObject[],
        ["title"],
        locale.value
      ) as unknown as any[];

      pagination.currentPage = fetchedData.data?.current_page!;
      pagination.pageSize = Math.ceil(
        fetchedData.data?.total! / fetchedData.data?.per_page!
      );
    }

    isLoading.value = false;
  };

  return {
    isLoading,
    item,
    items,
    pagination,
    fetchOne,
    fetchAll,
  };
});
