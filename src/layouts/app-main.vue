<script lang="ts" setup>
const router = useRouter()

const routes = router.options.routes.filter(
  (item) =>
    item.children![0].meta!.layout === 'app-main' &&
    !item.children![0].meta!.hidden,
)
</script>

<template>
  <el-container class="layout-container" style="height: 100%">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu router :default-active="router.currentRoute.value.path">
          <el-menu-item
            v-for="item in routes"
            :key="item.path"
            :index="item.path"
          >
            <el-icon>
              <Component :is="item.children![0].meta!.icon" />
            </el-icon>
            <span>{{ item.children![0].meta!.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <NavBar />
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <RouterView v-slot="{ Component, route }">
            <KeepAlive v-if="!route.meta.noCache">
              <Component :is="Component" :key="route.path" />
            </KeepAlive>

            <Component v-else :is="Component" :key="route.path" />
          </RouterView>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
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
