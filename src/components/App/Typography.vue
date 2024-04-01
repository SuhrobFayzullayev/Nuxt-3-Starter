<script setup lang="ts">
interface IProps {
  label?: string;
  size?: "extra-xs" | "xs" | "sm" | "md" | "2md" | "lg" | "xl";
  color?: "white" | "blue" | "dark-blue";
  isHover?: boolean;
  groupHoverColor?: "white" | "blue";
  is?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  line?: number;
}

const props = withDefaults(defineProps<IProps>(), {
  color: "dark-blue",
  is: "p",
  size: "lg",
  isHover: false,
});

const fontSize = computed(() => {
  switch (props.size) {
    case "extra-xs":
      return "text-[16px] <md:text-[14px]";
    case "xs":
      return "text-[19px] <md:text-[17px]";
    case "sm":
      return "text-[23px] <md:text-[21px]";
    case "md":
      return "text-[26px] <md:text-[24px] <sm:text-[22px]";
    case "2md":
      return "text-[38px] <md:text-[34px] <sm:text-[30px]";
    case "lg":
      return "text-[48px] <2md:text-[44px] <md:text-[40px] <sm:text-[38px]";
    case "xl":
      return "text-[58px] <2md:text-[54px] <md:text-[50px] <sm:text-[46px]";
    default:
      "";
  }
});

const color = computed(() => {
  switch (props.color) {
    case "white":
      return "text-cwhite";
    case "blue":
      return "text-cblue";
    case "dark-blue":
      return "text-cdark-blue";
    default:
      "";
  }
});

const groupHoverColor = computed(() => {
  switch (props.groupHoverColor) {
    case "white":
      return "group-hover:text-cwhite";
    case "blue":
      return "group-hover:text-cblue";
    default:
      "";
  }
});
</script>

<template>
  <component
    :is="is"
    class="typography"
    :style="`-webkit-line-clamp: ${line ? line : 'none'}`"
    :class="[
      line && 'truncate-dots',
      color,
      groupHoverColor,
      fontSize,
      isHover && 'hover:text-cblue cursor-pointer',
      'transition-all duration-100 ease-linear',
    ]"
  >
    {{ props.label }}
  </component>
</template>
