<script setup lang="ts">
import { formSchema, useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: false,
  middleware: "admin-auth",
});

const store = useAuthStore();

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(formSchema),
});

const onSubmit = handleSubmit((values) => store.login(values));
</script>

<template>
  <div class="bg-clight flex min-h-screen w-full items-center justify-center">
    <base-container>
      <el-form
        label-width="auto"
        label-position="left"
        class="mx-auto my-8 max-w-2xl rounded-lg bg-cwhite p-6 md:my-8 md:p-8 lg:my-10 lg:p-10"
        @submit="onSubmit"
      >
        <div class="flex justify-center items-center mb-6">
          <i-base-logo class="w-[250px]" filled :fontControlled="false" />
        </div>

        <!-- name -->
        <form-input name="name" :placeholder="$t('common_schema.login')" />

        <!-- password -->
        <form-input
          name="password"
          type="password"
          :placeholder="$t('common_schema.password')"
          :show-password="true"
        />

        <div class="flex justify-center">
          <el-button
            native-type="submit"
            class="mx-auto"
            type="primary"
            size="large"
            :loading="store.isLoading"
          >
            {{ $t("btn.login") }}
          </el-button>
        </div>
      </el-form>
    </base-container>
  </div>
</template>
