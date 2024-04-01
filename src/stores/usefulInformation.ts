import { handleArrayI18n, type DefaultObject } from "~/helpers/functions";

export interface ResponseList {
  image: string;
  title: string;
  title_en: string;
  content: string;
  id: number | string;
  images: any;
}

export interface ResponseItem extends ResponseList {
  meta_title: string;
  meta_description: string;
  meta_keyword: string;
}

export const useHelpfulInformationStore = defineStore(
  "helpfulInformation",
  () => {
    const { $baseFetch } = useNuxtApp();
    const { locale } = useI18n();

    const isLoading = ref(false);
    const items = ref<any>();
    const pagination = reactive({
      currentPage: 1,
      pageSize: 1,
    });

    const fetchAll = async () => {
      isLoading.value = true;

      const { data, error } = await useAsyncData("portfolio", () =>
        $baseFetch(`/helpful-information`)
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
        pagination.pageSize = Math.ceil(
          fetchedData.data?.total! / fetchedData.data?.per_page!
        );
      }

      isLoading.value = false;
    };

    return {
      isLoading,
      items,
      pagination,
      fetchAll,
    };
  }
);
