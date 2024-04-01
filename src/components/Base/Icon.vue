<script setup lang="ts">
defineProps<{ name: string }>();
</script>

<template>
  <div class="svg">
    <!-- element-plus icons -->
    <!-- slider -->
    <el-icon-operation v-if="name == 'slider'" />

    <!-- news -->
    <el-icon-postcard v-if="name == 'news'" />

    <!-- service -->
    <el-icon-data-line v-if="name == 'service'" />

    <!-- portfolio -->
    <el-icon-SuitcaseLine v-if="name == 'portfolio'" />

    <!-- gallery -->
    <el-icon-Picture v-if="name == 'gallery'" />

    <!-- info -->
    <el-icon-InfoFilled v-if="name == 'info'" />

    <!-- option -->
    <el-icon-Setting v-if="name == 'option'" />

    <!-- chat -->
    <el-icon-ChatLineRound v-if="name == 'chat'" />

    <el-icon-Calendar v-if="name == 'calendar'" />
  </div>
</template>
