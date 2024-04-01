<script setup lang="ts">
interface Iprops {
  line?: number;
  content: string;
}

const { line, content } = defineProps<Iprops>();
</script>

<template>
  <div
    class="bg-transparent text-[18px] <md:text-[16px] text-cdark-blue tinymce-editor"
    :style="`-webkit-line-clamp: ${line ? line : 'none'}`"
    :class="[line && 'show-only-text truncate-dots']"
    v-html="content"
  ></div>
</template>
