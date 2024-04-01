export const useDashboardMenuStore = defineStore("dashboardMenu", () => {
  const isSmallScreen = useMediaQuery("(max-width: 1023.9px)");

  const collapse = ref<boolean>(isSmallScreen.value);

  const toggleCollapse = (): void => {
    collapse.value = !collapse.value;
  };

  const handleClickOutside = (): void => {
    if (isSmallScreen.value) collapse.value = true;
  };

  const watchCollapse = (value: boolean): void => {
    if (isSmallScreen.value && !value)
      document.documentElement.classList.add("overflow-hidden");
  };

  return {
    collapse,
    toggleCollapse,
    handleClickOutside,
    watchCollapse,
  };
});
