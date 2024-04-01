import * as zod from "zod";
import { handleArrayI18n, type DefaultObject } from "~/helpers/functions";

export const formSchema = zod.object({
  link: zod
    .string()
    .trim()
    .url("help.field_must_be_url")
    .optional()
    .or(zod.literal("")),
});

export const createFormSchema = formSchema.extend({
  image: zod
    .instanceof(File)
    .refine((file: File) => file instanceof File, "help.field_is_required"),
});

export const updateFormSchema = formSchema.extend({
  image: zod.union([zod.string(), zod.instanceof(File).optional()]),
});

export interface Response extends zod.infer<typeof formSchema> {
  id: number;
  image: string;
}

export const useAdminPartnerStore = defineStore("adminPartner", () => {
  const { $authFetch } = useNuxtApp();
  const router = useRouter();
  const localePath = useLocalePath();
  const { t, locale } = useI18n();

  const isLoading = ref(false);
  const items = ref<Response[]>([]);
  const item = ref<Response | null>(null);
  const pagination = reactive({
    currentPage: 1,
    perPage: 1,
    total: 1,
  });

  const createOne = async (payload: zod.infer<typeof createFormSchema>) => {
    isLoading.value = true;

    const formData = new FormData();
    let key: keyof typeof payload;
    for (key in payload) {
      const value = payload[key];
      if (value !== null && value !== undefined) formData.append(key, value);
    }

    const { error } = await $authFetch("/partners").post(formData);

    if (!error.value) router.push(localePath("/admin/partners"));
    else ElMessage.error(t("general.fail"));

    isLoading.value = false;
  };

  const fetchAll = async (page: string | number = 1) => {
    isLoading.value = true;

    const { data, error } = await $authFetch(`/partners?page=${page}`)
      .get()
      .json<{
        data: {
          data: Response[];
          current_page: number;
          per_page: number;
          total: number;
        };
        status: "success" | "error";
      }>();

    if (!error.value && data.value && data.value.status === "success") {
      items.value = data.value.data.data;

      pagination.currentPage = data.value?.data.current_page;
      pagination.perPage = data.value?.data.per_page;
      pagination.total = data.value?.data.total;
    } else ElMessage.error(t("general.fail"));

    isLoading.value = false;
  };

  const fetchOne = async (id: string | string[]) => {
    isLoading.value = true;

    const { data, error } = await $authFetch(`/partners/${id}`)
      .get()
      .json<{ status: "success" | "error"; data: Response }>();

    if (!error.value && data.value && data.value.status === "success")
      item.value = data.value.data;
    else ElMessage.error(t("general.fail"));

    isLoading.value = false;
  };

  const updateOne = async (
    id: string | string[],
    payload: zod.infer<typeof updateFormSchema>
  ) => {
    isLoading.value = true;

    const formData = new FormData();
    let key: keyof typeof payload;
    for (key in payload) {
      const value = payload[key];
      if (value !== null && value !== undefined) formData.append(key, value);
    }
    formData.append("_method", "PUT");

    const { error } = await $authFetch(`/partners/${id}`).post(formData);

    if (!error.value) router.push(localePath("/admin/partners"));
    else ElMessage.error(t("general.fail"));

    isLoading.value = false;
  };

  const deleteOne = async (id: number) => {
    isLoading.value = true;

    const { error } = await $authFetch(`/partners/${id}`).delete();

    if (!error.value) {
      await fetchAll();

      ElMessage({
        type: "error",
        message: t("message.delete_complated"),
      });
    } else ElMessage.error(t("general.fail"));

    isLoading.value = false;
  };

  return {
    isLoading,
    items,
    item,
    pagination,
    createOne,
    fetchAll,
    fetchOne,
    updateOne,
    deleteOne,
  };
});
