<script setup lang="ts">
const { t } = useI18n();

interface IProps {
  error: {
    url: string;
    statusCode: 401 | 403 | 404 | 500;
    statusMessage: string;
    message: string;
    stack: string;
  };
}

interface IErrorInfo {
  type: string;
  label: string;
  description: string;
  photo: string;
}

type ErrorStatus = 401 | 403 | 404 | 500;

const { error } = defineProps<IProps>();

const errorDetails: Record<ErrorStatus, IErrorInfo> = {
  401: {
    type: "401",
    label: t("status_code.401.label"),
    description: t("status_code.401.desc"),
    photo: "/icons/errors/401.svg",
  },
  403: {
    type: "403",
    label: t("status_code.403.label"),
    description: t("status_code.403.desc"),
    photo: "/icons/errors/403.svg",
  },
  404: {
    type: "404",
    label: t("status_code.404.label"),
    description: t("status_code.404.desc"),
    photo: "/icons/errors/404.svg",
  },
  500: {
    type: "500",
    label: t("status_code.500.label"),
    description: t("status_code.500.desc"),
    photo: "/icons/errors/500.svg",
  },
};

const handleError = () => navigateTo("/");
</script>

<template>
  <div
    class="flex min-h-screen w-full items-center justify-center bg-white md:px-24 md:py-20 xl:px-40 xl:py-20"
  >
    <Head>
      <label>{{ error.statusCode }}</label>
      <Meta name="description" :content="error.statusMessage" />
    </Head>
    <div
      class="flex h-full w-full flex-row flex-wrap items-center justify-center gap-8 rounded-lg px-10 py-4"
    >
      <img
        :src="errorDetails[error.statusCode].photo"
        alt="Error"
        class="w-full max-w-md"
      />
      <div class="flex w-full max-w-md flex-col gap-4 text-center text-lg">
        <span class="block text-9xl font-bold">
          {{ errorDetails[error.statusCode].type }}
        </span>
        <span class="block">{{ errorDetails[error.statusCode].label }}</span>
        <span class="block">
          {{ errorDetails[error.statusCode].description }}
        </span>
        <div class="mt-2 flex justify-center">
          <base-button
            is-error
            @click="handleError"
            :label="t('btn.back_home')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
label {
  display: none !important;
}
</style>
