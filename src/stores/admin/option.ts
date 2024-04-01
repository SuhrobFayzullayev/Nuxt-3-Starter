import * as zod from "zod";
import { handleArrayI18n, type DefaultObject } from "~/helpers/functions";

import { googleMapRegex } from "~/helpers/regex";
import type { AviableOptionKeys } from "~/helpers/types";

interface Key {
  id: AviableOptionKeys;
  title: string;
  rules: unknown;
}

export const keys: Key[] = [
  {
    id: "phone",
    title: "common_schema.phone",
    rules: zod
      .string()
      .trim()
      .nonempty("help.field_is_required")
      .length(17, "help.must_be_uzbek_number"),
  },
  {
    id: "phone_2",
    title: "common_schema.phone",
    rules: zod
      .string()
      .trim()
      .nonempty("help.field_is_required")
      .length(17, "help.must_be_uzbek_number"),
  },
  {
    id: "email",
    title: "common_schema.email",
    rules: zod
      .string()
      .trim()
      .email("help.field_must_be_email")
      .nonempty("help.field_is_required"),
  },
  {
    id: "email_2",
    title: "common_schema.email",
    rules: zod
      .string()
      .trim()
      .email("help.field_must_be_email")
      .nonempty("help.field_is_required"),
  },
  {
    id: "address",
    title: "common_schema.address",
    rules: zod.string().trim().nonempty("help.field_is_required"),
  },
  {
    id: "address_2",
    title: "common_schema.address",
    rules: zod.string().trim().nonempty("help.field_is_required"),
  },
  {
    id: "facebook",
    title: "common_schema.facebook",
    rules: zod
      .string()
      .trim()
      .nonempty("help.field_is_required")
      .url("help.field_must_be_url"),
  },
  {
    id: "instagram",
    title: "common_schema.instagram",
    rules: zod
      .string()
      .trim()
      .nonempty("help.field_is_required")
      .url("help.field_must_be_url"),
  },
  {
    id: "telegram",
    title: "common_schema.telegram",
    rules: zod
      .string()
      .trim()
      .nonempty("help.field_is_required")
      .url("help.field_must_be_url"),
  },
  {
    id: "landmarks",
    title: "common_schema.landmarks",
    rules: zod.string().trim().nonempty("help.field_is_required"),
  },
  {
    id: "google_map",
    title: "common_schema.google_map",
    rules: zod
      .string()
      .trim()
      .nonempty("help.field_is_required")
      .regex(googleMapRegex, "help.field_must_be_google_map_iframe"),
  },
];

export const formSchema = zod.object({
  key: zod.string().trim().nonempty("help.field_is_required"),
  value_en: zod.string().trim().optional().or(zod.literal("")),
  value_ru: zod.string().trim().optional().or(zod.literal("")),
  value_uz: zod.string().trim().optional().or(zod.literal("")),
  default_value: zod.string().trim().optional().or(zod.literal("")),
});

export interface Response extends zod.infer<typeof formSchema> {
  id: number;
  value: string;
}

export const useAdminOptionStore = defineStore("adminOption", () => {
  const { $authFetch } = useNuxtApp();
  const router = useRouter();
  const localePath = useLocalePath();
  const { t, locale } = useI18n();

  const isLoading = ref(false);
  const items = ref<Response[]>([]);
  const item = ref<Response | null>(null);

  const createOne = async (payload: zod.infer<typeof formSchema>) => {
    isLoading.value = true;

    const formData = new FormData();
    let key: keyof typeof payload;
    for (key in payload) {
      const value = payload[key];
      if (value !== null && value !== undefined) formData.append(key, value);
    }

    const { error } = await $authFetch("/options").post(formData);

    if (!error.value) router.push(localePath("/admin/options"));
    else ElMessage.error(t("general.fail"));

    isLoading.value = false;
  };

  const fetchAll = async () => {
    isLoading.value = true;

    const { data, error } = await $authFetch(`/options`).get().json<{
      data: Response[];
      status: "success" | "error";
    }>();

    if (!error.value && data.value && data.value.status === "success")
      items.value = handleArrayI18n(
        data.value.data as unknown as DefaultObject[],
        ["value"],
        locale.value
      ) as unknown as Response[];
    else ElMessage.error(t("general.fail"));

    isLoading.value = false;
  };

  const fetchOne = async (id: string | string[]) => {
    isLoading.value = true;

    const { data, error } = await $authFetch(`/options/${id}`).get().json();

    if (!error.value && data.value) {
      item.value = data.value;
    } else ElMessage.error(t("general.fail"));

    isLoading.value = false;
  };

  const updateOne = async (
    id: string | string[],
    payload: zod.infer<typeof formSchema>
  ) => {
    isLoading.value = true;

    const formData = new FormData();
    let key: keyof typeof payload;
    for (key in payload) {
      const value = payload[key];
      if (value !== null && value !== undefined) formData.append(key, value);
    }
    formData.append("_method", "PUT");

    const { error } = await $authFetch(`/options/${id}`).post(formData);

    if (!error.value) router.push(localePath("/admin/options"));
    else ElMessage.error(t("general.fail"));

    isLoading.value = false;
  };

  const deleteOne = async (id: number) => {
    isLoading.value = true;

    const { error } = await $authFetch(`/options/${id}`).delete();

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
    createOne,
    fetchAll,
    fetchOne,
    updateOne,
    deleteOne,
  };
});
