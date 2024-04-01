<script setup lang="ts">
import type { ITableColumn, IPagination } from "~/helpers/types";

const { t } = useI18n();

const { pagination } = withDefaults(
  defineProps<{
    columns: ITableColumn[];
    data: any[];
    rowKey?: string;
    pagination?: IPagination;
    loading?: boolean;
    can?: {
      edit?: boolean;
      delete?: boolean;
    };
  }>(),
  {
    rowKey: "id",
    can: () => ({ edit: true, delete: true }),
    loading: false,
    pagination: () => ({ total: 1, perPage: 1, currentPage: 1 }),
  }
);

const emit = defineEmits<{
  (e: "pagination", page: number): void;
  (e: "actions", type: "edit" | "delete", rowKey: number): void;
}>();

const handleDelete = (rowKey: number) => {
  ElMessageBox.confirm(t("message.delete"), t("message.warning"), {
    confirmButtonText: t("btn.ok"),
    cancelButtonText: t("btn.cancel"),
  })
    .then(() => {
      emit("actions", "delete", rowKey);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: t("message.delete_canceled"),
      });
    });
};
</script>

<template>
  <div>
    <el-table
      :empty-text="$t('message.no_data')"
      v-loading="loading"
      :data="data"
      size="large"
    >
      <el-table-column
        v-for="(col, colIndex) in columns"
        :key="colIndex"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
        :min-width="col.minWidth"
        :formatter="col.formatter"
        :resizable="false"
      >
        <template #default="{ column, row }">
          <slot
            :name="column.property"
            :current="row[column.property]"
            :row="row"
          >
            {{ row[column.property] }}
          </slot>
        </template>
      </el-table-column>

      <el-table-column v-if="can.edit || can.delete" :width="160">
        <template #default="scope">
          <div class="flex items-center justify-around">
            <div
              class="rounded-lg bg-cwhite flex justify-center items-center w-[30px] h-[30px] cursor-pointer"
              v-if="can.edit"
              @click="emit('actions', 'edit', scope.row[rowKey])"
            >
              <i-base-edit filled />
            </div>

            <div
              class="rounded-lg bg-cwhite flex justify-center items-center w-[30px] h-[30px] cursor-pointer"
              v-if="can.delete"
              @click="handleDelete(scope.row[rowKey])"
            >
              <i-base-delete filled />
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <base-pagination
      @pagination="
        (page: number) => {
          $emit('pagination', page);
        }
      "
      :pagination="pagination"
    />
  </div>
</template>
