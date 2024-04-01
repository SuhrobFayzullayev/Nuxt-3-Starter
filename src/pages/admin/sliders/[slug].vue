<script setup lang="ts">
import * as zod from "zod";
import { locales } from "~/constants";
import {
  createFormSchema,
  updateFormSchema,
  useAdminSliderStore,
} from "~/stores/admin/slider";

definePageMeta({
  layout: "default-admin",
  middleware: "admin-auth",
});

const store = useAdminSliderStore();
const route = useRoute();
const slug = computed(() => route.params.slug);

const { handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(
    slug.value === "create" ? createFormSchema : updateFormSchema
  ),
});

const onSubmit = handleSubmit((values) => {
  if (slug.value === "create")
    store.createOne(values as zod.infer<typeof createFormSchema>);
  else
    store.updateOne(slug.value, values as zod.infer<typeof updateFormSchema>);
});

onMounted(async () => {
  if (slug.value !== "create") {
    await store.fetchOne(slug.value);

    setValues({
      title_en: store.item?.title_en,
      title_ru: store.item?.title_ru,
      title_uz: store.item?.title_uz,

      sub_title_en: store.item?.sub_title_en,
      sub_title_ru: store.item?.sub_title_ru,
      sub_title_uz: store.item?.sub_title_uz,

      link: store.item?.link || "",
    });
  }
});
</script>

<template>
  <el-form class="admin-form" label-position="top" @submit="onSubmit">
    <el-row :gutter="20">
      <!-- title -->
      <el-col :lg="8" v-for="{ id } in locales" :key="id + 'title'">
        <form-input
          :name="`title_${id}`"
          :label="`${$t('common_schema.title')} (${$t(`lang.${id}`)})`"
        />
      </el-col>

      <!-- sub-title -->
      <el-col :lg="8" v-for="{ id } in locales" :key="id + 'sub-title'">
        <form-input
          :name="`sub_title_${id}`"
          :label="`${$t('common_schema.sub_title')} (${$t(`lang.${id}`)})`"
        />
      </el-col>

      <!-- link -->
      <el-col>
        <form-input
          name="link"
          :label="`${$t('common_schema.link')} (${$t('general.optional')})`"
        />
      </el-col>

      <!-- image -->
      <el-col>
        <form-upload
          name="image"
          :accept="['png', 'jpeg', 'jpg', 'svg']"
          :label="$t('general.upload_image')"
          :default-url="slug !== 'create' ? store.item?.image : undefined"
        />
      </el-col>

      <el-col class="mt-6">
        <el-button
          native-type="submit"
          size="large"
          type="primary"
          :loading="store.isLoading"
        >
          {{ $t("btn.save") }}
        </el-button>
      </el-col>
    </el-row>

    <br />
    <br />
    <br />
  </el-form>
</template>
