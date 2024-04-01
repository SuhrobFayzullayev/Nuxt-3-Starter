<script setup lang="ts">
import type { Swiper as SwiperI } from "swiper";

// props
const props = withDefaults(defineProps<{ images: string[] }>(), {
  // default props
  // example
  // images: []
});

// states
const mainSwiper = ref<SwiperI>();
const thumbsSwiper = ref<SwiperI>();

// methods
const setMainSwiper = (swiper: SwiperI) => {
  mainSwiper.value = swiper;
};

const setThumbsSwiper = (swiper: SwiperI) => {
  thumbsSwiper.value = swiper;
};
</script>

<template>
  <div class="swiper-thumbs-block">
    <Swiper
      effect="fade"
      :fade-effect="{ crossFade: true }"
      :thumbs="{
        swiper: thumbsSwiper,
      }"
      :navigation="true"
      :pagination="{
        clickable: true,
        dynamicBullets: true,
      }"
      :modules="[
        SwiperEffectFade,
        SwiperThumbs,
        SwiperNavigation,
        SwiperPagination,
        SwiperAutoplay,
      ]"
      :loop="true"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      class="h-auto w-full overflow-hidden"
      @swiper="setMainSwiper"
    >
      <SwiperSlide
        v-for="(image, index) in props.images"
        :key="index"
        class="relative"
      >
        Content
      </SwiperSlide>
    </Swiper>

    <div class="mt-3">
      <Swiper
        :space-between="10"
        :slides-per-view="3"
        :watch-slides-progress="true"
        :breakpoints="{
          500: {
            slidesPerView: 4,
          },
          700: {
            slidesPerView: 5,
          },
          800: {
            slidesPerView: 6,
          },
          1024: {
            slidesPerView: props.variant === 'small' ? 5 : 6,
          },
        }"
        :modules="[SwiperThumbs]"
        class="w-full"
        :class="[
          props.variant === 'small'
            ? 'h-[86px] <md:h-[70px]'
            : 'h-[130px] <lg:h-[100px] <md:h-[80px]',
        ]"
        @swiper="setThumbsSwiper"
      >
        <SwiperSlide
          v-for="(image, index) in props.images"
          :key="index"
          class="relative overflow-hidden cursor-pointer group overflow-hidden relative swiper-thumb-child"
        >
          Content
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>
