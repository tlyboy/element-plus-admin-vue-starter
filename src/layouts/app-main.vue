<script lang="ts" setup>
const router = useRouter()

const isShowSideBar = ref(false)
const width = ref('200px')
</script>

<template>
  <ElContainer
    class="layout-container text-gray-700 dark:text-gray-200"
    style="height: 100%"
  >
    <SideBar :style="{ width }" class="hidden transition-all lg:block" />

    <ElContainer>
      <ElHeader class="flex items-center justify-between">
        <div class="flex w-[calc(100%-64px)] items-center gap-2">
          <button
            class="icon-btn i-carbon-menu hidden text-xl lg:block"
            @click="width === '200px' ? (width = '0') : (width = '200px')"
          ></button>
          <button
            class="icon-btn i-carbon-menu text-xl lg:hidden"
            @click="isShowSideBar = true"
          ></button>
          <div class="w-[calc(100%-32px)] truncate">
            {{ router.currentRoute.value.meta.title }}
          </div>
        </div>
        <NavBar />
      </ElHeader>

      <ElMain>
        <ElScrollbar>
          <RouterView v-slot="{ Component, route }">
            <KeepAlive v-if="!route.meta.noCache">
              <component :is="Component" />
            </KeepAlive>

            <component v-else :is="Component" />
          </RouterView>
        </ElScrollbar>
      </ElMain>
    </ElContainer>

    <ElDrawer
      v-model="isShowSideBar"
      direction="ltr"
      size="240px"
      :with-header="false"
    >
      <SideBar width="200px" />
    </ElDrawer>
  </ElContainer>
</template>

<style>
.layout-container .el-header {
  position: relative;
  color: var(--el-text-color-primary);
  border-bottom: 1px solid var(--el-color-info-light-7);
}

.layout-container .el-aside {
  color: var(--el-text-color-primary);
  border-right: 1px solid var(--el-color-info-light-8);
}

.layout-container .el-drawer .el-aside {
  border-right: none;
}

.layout-container .el-menu {
  border-right: none;
}

.layout-container .el-main {
  padding: 0;
}
</style>
