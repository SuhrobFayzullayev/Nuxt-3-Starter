<script setup lang="ts">
import { useAdminSliderStore } from "~/stores/admin/slider";

definePageMeta({
  layout: "default-admin",
  middleware: "admin-auth",
});

const localePath = useLocalePath();
const { t } = useI18n();
const router = useRouter();
const store = useAdminSliderStore();

const columns = computed(() => [
  {
    prop: "title",
    label: t("common_schema.title"),
    minWidth: 300,
  },
  {
    prop: "link",
    label: t("common_schema.link"),
    minWidth: 200,
  },
]);

const handleActions = (type: "edit" | "delete", rowKey: number) => {
  switch (type) {
    case "edit":
      router.push(localePath(`/admin/sliders/${rowKey}`));
      break;
    case "delete":
      store.deleteOne(rowKey);
      break;
  }
};

const handlePagination = (page: number) => store.fetchAll(page);

onMounted(() => store.fetchAll());
</script>

<template>
  <div>
    <div class="mb-4">
      <base-link to="/admin/sliders/create">
        <el-button type="primary" size="large">
          {{ t("btn.create") }}
        </el-button>
      </base-link>
    </div>

    <base-table
      :columns="columns"
      :data="store.items"
      :loading="store.isLoading"
      :pagination="store.pagination"
      @pagination="handlePagination"
      @actions="handleActions"
    >
      <template #link="{ current }">
        <a :href="current">{{ current }}</a>
      </template>
    </base-table>
  </div>
</template>
