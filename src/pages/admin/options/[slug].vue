<script setup lang="ts">
import * as zod from "zod";
import { useAdminOptionStore, keys, formSchema } from "~/stores/admin/option";
import { locales } from "~/constants";

definePageMeta({
  layout: "default-admin",
  middleware: "admin-auth",
});

const store = useAdminOptionStore();
const route = useRoute();
const slug = computed(() => route.params.slug);
const isHaveInitialData = ref(false);

const { handleSubmit, setValues, values, errors } = useForm({
  validationSchema: toTypedSchema(formSchema),
});

const onSubmit = handleSubmit((values) => {
  if (slug.value === "create") store.createOne(values);
  else store.updateOne(slug.value, values);
});

watch(
  () => values.key,
  (keyValue) => {
    if (!isHaveInitialData.value) {
      if (
        [
          "phone",
          "phone_2",
          "email",
          "email_2",
          "facebook",
          "instagram",
          "telegram",
          "google_map",
        ].includes(keyValue)
      ) {
        setValues({ default_value: "" });

        // required values
        formSchema.shape.default_value = keys.filter(
          (v) => v.id == keyValue && v
        )[0]?.rules as any;

        // optional values
        formSchema.shape.value_en = zod
          .string()
          .trim()
          .optional()
          .or(zod.literal(""));
        formSchema.shape.value_ru = zod
          .string()
          .trim()
          .optional()
          .or(zod.literal(""));
        formSchema.shape.value_uz = zod
          .string()
          .trim()
          .optional()
          .or(zod.literal(""));
      } else {
        setValues({ value_en: "", value_ru: "", value_uz: "" });

        // required values
        formSchema.shape.value_en = keys.filter((v) => v.id == keyValue && v)[0]
          ?.rules as any;

        formSchema.shape.value_ru = keys.filter((v) => v.id == keyValue && v)[0]
          ?.rules as any;

        formSchema.shape.value_uz = keys.filter((v) => v.id == keyValue && v)[0]
          ?.rules as any;

        // optional values
        formSchema.shape.default_value = zod
          .string()
          .trim()
          .optional()
          .or(zod.literal(""));
      }
    }

    isHaveInitialData.value = false;
  }
);

onMounted(async () => {
  if (slug.value !== "create") {
    await store.fetchOne(slug.value);

    isHaveInitialData.value = true;

    setValues({
      key: store.item?.key,

      value_en: store.item?.value_en || "",
      value_ru: store.item?.value_ru || "",
      value_uz: store.item?.value_uz || "",

      default_value: store.item?.default_value || "",
    });
  }
});
</script>

<template>
  <el-form label-position="top" @submit="onSubmit" class="admin-form">
    <el-row :gutter="20">
      <el-col>
        <form-select
          name="key"
          :label="$t('common_schema.key')"
          :options="
            keys.map((key) => ({
              value: key.id,
              label: key.id.includes('_2')
                ? $t(key.title) + ' 2'
                : $t(key.title),
            }))
          "
        />
      </el-col>
    </el-row>

    <div v-if="values.key">
      <template
        v-if="
          [
            'phone',
            'phone_2',
            'email',
            'email_2',
            'facebook',
            'instagram',
            'telegram',
            'google_map',
          ].includes(values.key)
        "
      >
        <el-row
          :gutter="20"
          v-if="values.key == 'phone' || values.key == 'phone_2'"
        >
          <!-- default value -->
          <el-col>
            <form-input
              name="default_value"
              :label="`${$t('common_schema.value')}`"
              placeholder="+998 XX XXX XX XX"
              mask="+998 ## ### ## ##"
            />
          </el-col>
        </el-row>

        <el-row :gutter="20" v-else>
          <!-- default value -->
          <el-col>
            <form-input
              name="default_value"
              :label="`${$t('common_schema.value')}`"
            />
          </el-col>
        </el-row>
      </template>

      <template v-else>
        <el-row :gutter="20">
          <!-- value -->
          <el-col :lg="8" v-for="{ id } in locales">
            <form-input
              :name="`value_${id}`"
              :label="`${$t('common_schema.value')} (${$t(`lang.${id}`)})`"
            />
          </el-col>
        </el-row>
      </template>
    </div>

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
  </el-form>
</template>
