<script setup lang="ts">
interface Props {
  items: [{ name: string; path: string }];
}

defineProps<Props>();
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in items" :to="{ path: item.path }">{{
      item.name
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>


<style scoped>
</style>