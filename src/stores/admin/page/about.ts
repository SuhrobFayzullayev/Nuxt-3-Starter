import * as zod from "zod";
import { youtubeIframeRegex } from "~/helpers/regex";
export const formSchema = zod.object({
  content_en: zod.string().trim().nonempty("help.field_is_required"),
  content_ru: zod.string().trim().nonempty("help.field_is_required"),
  content_uz: zod.string().trim().nonempty("help.field_is_required"),

  strategies: zod.array(
    zod.object({
      key: zod.string().trim().nonempty("help.field_is_required"),

      value_en: zod.string().trim().nonempty("help.field_is_required"),
      value_ru: zod.string().trim().nonempty("help.field_is_required"),
      value_uz: zod.string().trim().nonempty("help.field_is_required"),
    })
  ),

  image: zod.union([zod.string(), zod.instanceof(File).optional()]),

  video_title_en: zod.string().trim().nonempty("help.field_is_required"),
  video_title_ru: zod.string().trim().nonempty("help.field_is_required"),
  video_title_uz: zod.string().trim().nonempty("help.field_is_required"),

  youtube_link: zod
    .string()
    .trim()
    .nonempty("help.field_is_required")
    .regex(youtubeIframeRegex, "help.field_must_be_youtube_iframe"),

  video_image: zod.union([zod.string(), zod.instanceof(File).optional()]),

  meta_title_en: zod.string().trim().optional(),
  meta_title_ru: zod.string().trim().optional(),
  meta_title_uz: zod.string().trim().optional(),

  meta_description_en: zod.string().trim().optional(),
  meta_description_ru: zod.string().trim().optional(),
  meta_description_uz: zod.string().trim().optional(),

  meta_keyword_en: zod.string().trim().optional(),
  meta_keyword_ru: zod.string().trim().optional(),
  meta_keyword_uz: zod.string().trim().optional(),
});

export interface Response extends zod.infer<typeof formSchema> {
  id: number;
  image: string;
  video_image: string;
  title: string;
}

export const useAdminPageAboutStore = defineStore("adminPageAbout", () => {
  const { $authFetch } = useNuxtApp();
  const { t } = useI18n();

  const isLoading = ref(false);
  const item = ref<Response | null>(null);

  const fetchOne = async (id: string | string[]) => {
    isLoading.value = true;

    const { data, error } = await $authFetch(`/about/${id}`)
      .get()
      .json<{ status: "success" | "error"; data: Response }>();

    if (!error.value && data.value && data.value.status === "success")
      item.value = data.value.data;
    else ElMessage.error(t("general.fail"));

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
      if (value !== null && value !== undefined) {
        if (Array.isArray(value)) formData.append(key, JSON.stringify(value));
        else formData.append(key, value);
      }
    }
    formData.append("_method", "PUT");

    const { error } = await $authFetch(`/about/${id}`).post(formData);

    if (!error.value) ElMessage.success(t("message.updated_successfully"));
    else ElMessage.error(t("general.fail"));

    isLoading.value = false;
  };

  return {
    isLoading,
    item,
    fetchOne,
    updateOne,
  };
});
