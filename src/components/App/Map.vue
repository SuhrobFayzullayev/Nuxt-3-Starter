<script setup>
import { extractAttributeValue } from "~/helpers/functions";
import { useOptionStore } from "~/stores/option";

const { items } = useOptionStore();
</script>

<template>
  <div
    v-if="items?.google_map"
    class="w-full h-[600px] <2md:h-[450px] <sm:h-[400px] mt-auto"
  >
    <iframe
      :src="extractAttributeValue(items.google_map, 'src')"
      class="w-full h-full"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</template>
