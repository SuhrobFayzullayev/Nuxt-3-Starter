import mask from "./mask/directive";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("mask", mask);
});
