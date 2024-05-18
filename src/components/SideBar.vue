<script lang="ts" setup>
const router = useRouter()

const routes = router.options.routes.filter(
  (item) =>
    item.children![0].meta!.layout === 'app-main' &&
    !item.children![0].meta!.hidden,
)
</script>

<template>
  <ElAside>
    <ElScrollbar>
      <ElMenu router :default-active="router.currentRoute.value.path">
        <ElMenuItem v-for="item in routes" :key="item.path" :index="item.path">
          <ElIcon>
            <component :is="item.children![0].meta!.icon" />
          </ElIcon>
          <span class="truncate">{{ item.children![0].meta!.title }}</span>
        </ElMenuItem>
      </ElMenu>
    </ElScrollbar>
  </ElAside>
</template>
