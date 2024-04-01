<script setup lang="ts">
import { menu } from "~/constants";
import { useDashboardMenuStore } from "~/stores/dashboardMenu";

const { locale } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const dashboardMenuStore = useDashboardMenuStore();

const sidebarMenu = ref<HTMLElement>();

onClickOutside(sidebarMenu, dashboardMenuStore.handleClickOutside);
</script>

<template>
  <div
    class="sidebar top-0 z-navigationDrawer h-screen flex-shrink-0 overflow-auto"
    :class="{ 'sidebar--collapse': dashboardMenuStore.collapse }"
  >
    <el-scrollbar wrap-class="sidebar-scrollbar__wrap">
      <el-menu
        ref="sidebarMenu"
        class="sidebar-menu"
        :collapse="dashboardMenuStore.collapse"
        :collapse-transition="false"
        router
      >
        <template v-for="(menuItem, index) in menu.admin">
          <el-sub-menu
            v-if="menuItem.children"
            :key="`sub-${index}`"
            :index="index.toString()"
          >
            <template #title>
              <el-icon class="cursor-pointer -mt-3">
                <base-icon :name="`${menuItem.icon}`" />
              </el-icon>

              <span>{{ $t(menuItem.label) }}</span>
            </template>

            <template v-for="(subMenuItem, subMenuIndex) in menuItem.children">
              <el-sub-menu
                v-if="subMenuItem?.children"
                :key="`sub-sub-${subMenuIndex}`"
                :index="`${index}-${subMenuIndex}`"
              >
                <template #title>{{ $t(subMenuItem.label) }}</template>

                <el-menu-item
                  v-for="(
                    subSubMenuItem, subSubMenuIndex
                  ) in subMenuItem.children"
                  :key="subSubMenuIndex"
                  :index="`${index}-${subMenuIndex}-${subSubMenuIndex}`"
                  :route="localePath(subSubMenuItem.path!)"
                  :class="{
                    'is-active':
                      route.path === `/${locale}${subSubMenuItem.path}`,
                  }"
                >
                  <template #title>{{ $t(subSubMenuItem.label) }}</template>
                </el-menu-item>
              </el-sub-menu>

              <el-menu-item
                v-else
                :key="`sub-item-${subMenuIndex}`"
                :index="`${index}-${subMenuIndex}`"
                :route="localePath(subMenuItem.path!)"
                :class="{
                  'is-active': route.path === `/${locale}${subMenuItem.path}`,
                }"
              >
                <template #title>{{ $t(subMenuItem.label) }}</template>
              </el-menu-item>
            </template>
          </el-sub-menu>

          <el-menu-item
            v-else
            :key="`item-${index}`"
            :index="index.toString()"
            :route="localePath(menuItem.path!)"
            :class="{
              'is-active': route.path === `/${locale}${menuItem.path}`,
            }"
          >
            <el-icon class="cursor-pointer -mt-3">
              <base-icon :name="`${menuItem.icon}`" />
            </el-icon>

            <template #title>{{ $t(menuItem.label) }}</template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss">
.sidebar {
  --el-menu-bg-color: #001529;
  --el-menu-text-color: #bfcbd9;
  --el-menu-hover-bg-color: transparent;
  --el-menu-hover-text-color: #ffffff;
  --el-menu-active-color: #ffffff;
  --el-menu-active-bg-color: var(--el-color-primary);
  --el-menu-item-height: 50px;
  --el-menu-sub-item-height: 50px;

  .el-menu {
    border-right: 0;
  }

  .el-menu:not(.el-menu--collapse) {
    width: 260px;
  }

  .el-menu-item:not(.is-active):hover,
  .el-sub-menu__title:hover {
    color: var(--el-menu-hover-text-color);
  }

  .el-menu-item.is-active {
    background-color: var(--el-menu-active-bg-color);
  }

  .sidebar-scrollbar__wrap {
    background-color: var(--el-menu-bg-color);
  }
}
</style>

<style lang="scss" scoped>
.sidebar {
  position: sticky;

  @media (max-width: 1023.9px) {
    position: fixed;

    &:not(&--collapse)::before {
      content: "";
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }

    &-menu.el-menu--collapse {
      width: 0;
    }
  }
}
</style>
