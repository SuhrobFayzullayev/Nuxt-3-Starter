<script setup lang="ts">
import { useAdminOptionStore } from "~/stores/admin/option";

definePageMeta({
  layout: "default-admin",
  middleware: "admin-auth",
});

const localePath = useLocalePath();
const { t } = useI18n();
const router = useRouter();
const store = useAdminOptionStore();
const { apiURL, storageURL } = useRuntimeConfig().public;

const columns = computed(() => [
  {
    prop: "key",
    label: t("common_schema.key"),
    minWidth: 100,
  },
  {
    prop: "value",
    label: t("common_schema.value"),
    minWidth: 200,
  },
]);

const handleActions = (type: "edit" | "delete", rowKey: number) => {
  switch (type) {
    case "edit":
      router.push(localePath(`/admin/options/${rowKey}`));
      break;
    case "delete":
      store.deleteOne(rowKey);
      break;
  }
};

onMounted(() => store.fetchAll());
</script>

<template>
  <div>
    <div class="mb-4">
      <base-link to="/admin/options/create">
        <el-button type="primary" size="large">
          {{ t("btn.create") }}
        </el-button>
      </base-link>
    </div>

    <base-table
      :columns="columns"
      :data="store.items"
      :loading="store.isLoading"
      @actions="handleActions"
    >
      <template #value="{ row }">
        {{ row.value ? row.value : row.default_value }}
      </template>
    </base-table>
  </div>
</template>
