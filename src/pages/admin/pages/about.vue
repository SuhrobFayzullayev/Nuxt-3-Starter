<script setup lang="ts">
import * as zod from "zod";
import { locales } from "~/constants";
import { formSchema, useAdminPageAboutStore } from "~/stores/admin/page/about";

definePageMeta({
  layout: "default-admin",
  middleware: "admin-auth",
});

const store = useAdminPageAboutStore();

const { handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(formSchema),
});

const onSubmit = handleSubmit((values) => {
  store.updateOne("1", values);
});

onMounted(async () => {
  await store.fetchOne("1");

  setValues({
    content_en: store.item?.content_en,
    content_ru: store.item?.content_ru,
    content_uz: store.item?.content_uz,

    strategies: store.item?.strategies,

    video_title_en: store.item?.video_title_en,
    video_title_ru: store.item?.video_title_ru,
    video_title_uz: store.item?.video_title_uz,

    youtube_link: store.item?.youtube_link,

    meta_title_en: store.item?.meta_title_en || "",
    meta_title_ru: store.item?.meta_title_ru || "",
    meta_title_uz: store.item?.meta_title_uz || "",

    meta_description_en: store.item?.meta_description_en || "",
    meta_description_ru: store.item?.meta_description_ru || "",
    meta_description_uz: store.item?.meta_description_uz || "",

    meta_keyword_en: store.item?.meta_keyword_en || "",
    meta_keyword_ru: store.item?.meta_keyword_ru || "",
    meta_keyword_uz: store.item?.meta_keyword_uz || "",
  });
});
</script>

<template>
  <el-form class="admin-form" label-position="top" @submit="onSubmit">
    <el-row :gutter="20">
      <!-- content -->
      <el-col :lg="8" v-for="{ id } in locales">
        <form-tinymce
          :name="`content_${id}`"
          :label="`${$t('common_schema.content')} (${$t(`lang.${id}`)})`"
        />
      </el-col>

      <!-- attributes -->
      <form-dynamic-input-two
        name="strategies"
        :label="$t('common_schema.attributes')"
      />

      <!-- image -->
      <el-col>
        <form-upload
          name="image"
          :accept="['png', 'jpeg', 'jpg', 'svg']"
          :label="$t('general.upload_image')"
          :default-url="store.item?.image"
        />
      </el-col>

      <br />
      <br />
      <br />
      <br />

      <!-- video-title -->
      <el-col :lg="8" v-for="{ id } in locales">
        <form-input
          :name="`video_title_${id}`"
          :label="`${$t('common_schema.video_title')} (${$t(`lang.${id}`)})`"
        />
      </el-col>

      <!-- video-link -->
      <el-col>
        <form-input
          name="youtube_link"
          :label="`${$t('common_schema.video_link')}`"
        />
      </el-col>

      <!-- video-image -->
      <el-col>
        <form-upload
          name="video_image"
          :accept="['png', 'jpeg', 'jpg', 'svg']"
          :label="$t('general.upload_video_image')"
          :default-url="store.item?.video_image"
        />
      </el-col>

      <br />
      <br />
      <br />
      <br />

      <!-- meta-title -->
      <el-col :lg="8" v-for="{ id } in locales">
        <form-input
          :name="`meta_title_${id}`"
          :label="`${$t('common_schema.meta_title')} (${$t(
            `lang.${id}`
          )}) (${$t(`general.optional`)})`"
        />
      </el-col>

      <!-- meta-keyword -->
      <el-col :lg="8" v-for="{ id } in locales">
        <form-input
          :name="`meta_keyword_${id}`"
          :label="`${$t('common_schema.meta_keyword')} (${$t(
            `lang.${id}`
          )}) (${$t(`general.optional`)})`"
        />
      </el-col>

      <!-- meta-description -->
      <el-col :lg="8" v-for="{ id } in locales">
        <form-input
          type="textarea"
          :name="`meta_description_${id}`"
          :label="`${$t('common_schema.meta_description')} (${$t(
            `lang.${id}`
          )}) (${$t(`general.optional`)})`"
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
