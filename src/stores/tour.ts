import { handleArrayI18n, type DefaultObject } from "~/helpers/functions";

export interface ResponseList {
  image: string;
  title: string;
  price: string;
  id: number | string;
}

export interface ResponseItem extends ResponseList {
  images: string[] | JSON[];
  content: string;
  tour_description: string;
  meta_title: string;
  meta_description: string;
}

export const useTourStore = defineStore("tour", () => {
  const { $baseFetch } = useNuxtApp();
  const { locale } = useI18n();

  const isLoading = ref(false);
  const items = ref<ResponseList[]>();
  const item = ref<ResponseItem>();
  const pagination = reactive({
    currentPage: 1,
    pageSize: 1,
    total: 1,
  });

  const fetchOne = async (id: string | string[]) => {
    isLoading.value = true;

    const { data, error } = await useAsyncData("tour", () =>
      $baseFetch(`/front/tours/${id}`)
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
          "meta_title",
          "meta_description",
          "tour_description",
        ],
        locale.value
      )[0] as unknown as ResponseItem;
    }

    isLoading.value = false;
  };

  const fetchAll = async () => {
    isLoading.value = true;

    const { data, error } = await useAsyncData("tour", () =>
      $baseFetch(`/front/tours`)
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
      ) as unknown as ResponseList[];

      pagination.currentPage = fetchedData.data?.current_page!;
      pagination.pageSize = fetchedData.data?.per_page!;
      pagination.total = fetchedData.data?.total!;
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
