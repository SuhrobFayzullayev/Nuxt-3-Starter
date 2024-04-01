<script setup lang="ts">
import type { IPagination } from "~/helpers/types";

const { pagination } = withDefaults(
  defineProps<{ pagination: IPagination }>(),
  {
    pagination: () => ({ currentPage: 1, perPage: 1, total: 1 }),
  }
);

const emit = defineEmits<{
  (e: "pagination", page: number): void;
}>();

const handlePagination = (page: number) => {
  emit("pagination", page);
};

const pageSize = computed(() =>
  Math.ceil(pagination.total / pagination.perPage)
);

const firstPageDisabled = computed(() =>
  pagination.currentPage === 1 ? "disabled" : ""
);
const lastPageDisabled = computed(() =>
  pagination.currentPage == pageSize.value ? "disabled" : ""
);
</script>

<template>
  <div
    class="pagination w-full justify-center items-center"
    :class="[pageSize < 2 ? 'hidden' : 'flex']"
  >
    <!-- to fist-page -->
    <button
      @click="handlePagination(1)"
      :disabled="!!firstPageDisabled"
      class="custom_pagination w-[40px] h-[40px] rounded-[12px] bg-cwhite mt-4 text-[20px] flex justify-center items-center"
      :class="[firstPageDisabled]"
    >
      <i-base-down-group
        style="transform: rotateZ(180deg); width: 14px !important"
      />
    </button>

    <el-pagination
      v-if="pagination"
      :current-page="pagination.currentPage"
      :page-size="pagination.perPage"
      :total="pagination.total"
      layout="prev, pager, next"
      background
      class="mt-4 justify-center"
      @current-change="handlePagination"
      :pagerCount="4"
    />

    <!-- to last-page -->
    <button
      @click="handlePagination(pageSize)"
      :disabled="!!lastPageDisabled"
      :class="[lastPageDisabled]"
      class="custom_pagination w-[40px] h-[40px] rounded-[12px] bg-cwhite mt-4 text-[20px] flex justify-center items-center"
    >
      <i-base-down-group style="width: 14px !important" />
    </button>
  </div>
</template>
