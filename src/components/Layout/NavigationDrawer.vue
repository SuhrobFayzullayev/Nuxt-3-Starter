<script setup lang="ts">
import { menu } from "~/constants";
import { getUid } from "~/helpers/functions";
import { useOptionStore } from "~/stores/option";
const route = useRoute();
const { t } = useI18n();
const { headerLinks: links } = useSiteLinks();

const store = useOptionStore();
const navigationDrawer = useState<HTMLElement>();
const drawerActive = useState<boolean>(() => false);

function toggleDrawer() {
  drawerActive.value = !drawerActive.value;
}

onClickOutside(navigationDrawer, () => {
  drawerActive.value = false;
});

watch(drawerActive, (value) =>
  document.documentElement.classList[value ? "add" : "remove"](
    "overflow-y-hidden"
  )
);

watch(
  () => route.path,
  () => {
    drawerActive.value = false;
  }
);
</script>

<template>
  <div>
    <i-base-bars
      @click="toggleDrawer"
      :fontControlled="false"
      class="text-cblue h-7 w-7 cursor-pointer"
    />

    <div class="relative z-navigationDrawer">
      <div
        v-if="drawerActive"
        class="fixed inset-0 bg-cblack bg-opacity-50"
        @click="drawerActive = false"
      />

      <Transition name="slide">
        <aside
          v-show="drawerActive"
          ref="navigationDrawer"
          class="fixed left-0 top-0 h-full w-full max-w-sm bg-cwhite"
        >
          Content
        </aside>
      </Transition>
    </div>
  </div>
</template>

<style>
.slide-enter-active {
  transition: all 300ms ease;
  transform: translateX(-100%);
}

.slide-enter-to {
  transition: all 300ms ease;
  transform: translateX(0%);
}

.slide-leave-active {
  transition: all 300ms ease;
  transform: translateX(-100%);
}
</style>
