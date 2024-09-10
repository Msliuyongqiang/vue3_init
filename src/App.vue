<script setup>
import { RouterView, useRoute } from "vue-router";
const route = useRoute();
import locale from "element-plus/es/locale/lang/zh-cn";
</script>

<template>
  <el-config-provider :locale="locale">
    <RouterView v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="route.meta.keepAlive" :key="route.path" />
      </keep-alive>
      <component :is="Component" v-if="!route.meta.keepAlive" :key="route.path" />
    </RouterView>
  </el-config-provider>
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  width: 100vw;
  height: 100vh;
}
</style>
