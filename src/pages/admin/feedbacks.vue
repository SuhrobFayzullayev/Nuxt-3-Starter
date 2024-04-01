<script setup lang="ts">
import { useAdminFeedbackStore } from "~/stores/admin/feedback";
import { beautifyPhoneNumber } from "~/helpers/functions";

const { t } = useI18n();

definePageMeta({
  layout: "default-admin",
  middleware: "admin-auth",
});

const columns = [
  {
    prop: "message",
    label: t("common_schema.message"),
    minWidth: 250,
  },
  {
    prop: "info",
    label: t("common_schema.info"),
    minWidth: 100,
  },
];

const store = useAdminFeedbackStore();

const handleActions = async (type: "delete" | "edit", rowKey: number) => {
  switch (type) {
    case "delete":
      store.deleteOne(rowKey);
      break;
  }
};

const handlePagination = (page: number) => {
  store.fetchAll(page);
};

onMounted(() => {
  store.fetchAll();
});
</script>

<template>
  <div>
    <base-table
      :columns="columns"
      :data="store.items"
      :pagination="store.pagination"
      :loading="store.isLoading"
      @actions="handleActions"
      @pagination="handlePagination"
      :can="{ delete: true }"
    >
      <template #info="{ row }">
        <div>
          <p>
            <span class="font-bold mr-1 capitalize"
              >{{ t("common_schema.fullname") }}:</span
            >
            {{ row.fullname }}
          </p>

          <p>
            <span class="font-bold mr-1 capitalize"
              >{{ t("common_schema.phone") }}:</span
            >
            <base-link :to="`tel: ${row.phone}`" target="_blank">{{
              row.phone
            }}</base-link>
          </p>
        </div>
      </template>
    </base-table>
  </div>
</template>
