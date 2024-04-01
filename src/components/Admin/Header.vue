<script setup lang="ts">
import { useDashboardMenuStore } from "~/stores/dashboardMenu";
import { useAuthStore } from "~/stores/auth";

const dashboardMenuStore = useDashboardMenuStore();
const store = useAuthStore();

watch(() => dashboardMenuStore.collapse, dashboardMenuStore.watchCollapse);
</script>

<template>
  <div class="flex items-center justify-between mb-6">
    <div
      class="trigger cursor-pointer"
      @click="dashboardMenuStore.toggleCollapse"
    >
      <i-base-menu-unfold
        v-if="dashboardMenuStore.collapse"
        class="text-[26px] text-cdark-blue"
        filled
      />
      <i-base-menu-fold class="text-[26px] text-cdark-blue" filled v-else />
    </div>

    <div class="w-fit flex items-center">
      <base-lang-switch class="mr-5" />

      <el-button size="large" type="primary" plain @click="store.logout">{{
        $t("btn.logout")
      }}</el-button>
    </div>
  </div>
</template>

<style lang="scss">
.el-header {
  --el-header-padding: 4px;
  border-bottom: 1px solid var(--el-border-color);
}

.el-button.is-text.trigger {
  height: calc(var(--el-header-height) - 12px);
  width: calc(var(--el-header-height) - 12px);
  display: flex;
  padding: 10px;
  cursor: pointer;
  align-items: center;
  color: var(--el-color-black);
  border-radius: 0;

  &:hover,
  &:focus {
    background-color: transparent;
  }
}
</style>
