<script lang="ts" setup>
const router = useRouter()

const routes = router.options.routes.filter(
  (item) =>
    item.children![0].meta!.layout === 'app-main' &&
    !item.children![0].meta!.hidden,
)
</script>

<template>
  <ElContainer class="layout-container" style="height: 100%">
    <ElAside width="200px">
      <ElScrollbar>
        <ElMenu router :default-active="router.currentRoute.value.path">
          <ElMenuItem
            v-for="item in routes"
            :key="item.path"
            :index="item.path"
          >
            <ElIcon>
              <component :is="item.children![0].meta!.icon" />
            </ElIcon>
            <span>{{ item.children![0].meta!.title }}</span>
          </ElMenuItem>
        </ElMenu>
      </ElScrollbar>
    </ElAside>

    <ElContainer>
      <ElHeader style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <NavBar />
        </div>
      </ElHeader>

      <ElMain>
        <ElScrollbar>
          <RouterView v-slot="{ Component, route }">
            <KeepAlive v-if="!route.meta.noCache">
              <component :is="Component" :key="route.path" />
            </KeepAlive>

            <component v-else :is="Component" :key="route.path" />
          </RouterView>
        </ElScrollbar>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<style scoped>
.layout-container .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.layout-container .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.layout-container .el-menu {
  border-right: none;
}

.layout-container .el-main {
  padding: 0;
}

.layout-container .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
