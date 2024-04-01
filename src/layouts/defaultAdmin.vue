<template>
  <client-only>
    <ElContainer>
      <AdminSidebar />
      <ElContainer direction="vertical" class="bg-[#ECF2F7]">
        <AdminHeader class="p-6" />
        <div class="px-6">
          <div class="w-full max-w-screen-1xl">
            <slot />
          </div>
        </div>
      </ElContainer>
    </ElContainer>
  </client-only>
</template>

<style scoped lang="scss">
@media (max-width: 1023.9px) {
  .admin-container {
    width: calc(100vw - 80px);
  }
}
</style>
