<script setup lang="ts">
interface Slider {
  // props
}

const { sliders } = defineProps<{ sliders: Slider[] }>();
</script>

<template>
  <Swiper
    class="slider w-full px-4 h-[650px] <xl:h-[600px] <lg:h-550px <md:h-[500px] <sm:h-[400px] <xs:h-[350px] select-none"
    :modules="[
      SwiperAutoplay,
      SwiperPagination,
      SwiperNavigation,
      SwiperEffectFade,
    ]"
    :slides-per-view="1"
    :loop="true"
    :pagination="{ clickable: true }"
    :navigation="true"
    :effect="'fade'"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
    }"
  >
    <SwiperSlide class="relative" v-for="(v, i) in sliders" :key="i">
      Content
    </SwiperSlide>
  </Swiper>
</template>
