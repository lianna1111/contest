<script setup lang="ts">
// breadcrumb
const List = [
  { name: "岳阳天浩舞蹈", path: "/gMain" },
  { name: "选手", path: "/player" },
];
</script>

<template>
  <element-breadcrumb class="mb-2" :items="List"></element-breadcrumb>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>选手列表：全部</span>
      </div>
    </template>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-input placeholder="搜索分类" size="small" class="w-4/5"></el-input>

        <i class="fa fa-repeat float-right"></i>

        <div class="m-2 text-xs">全部</div>
        <div class="m-2 text-xs">未分类</div>
        <el-button class="border-dashed w-full">+添加分类</el-button>
      </el-col>
      <el-col :span="20" class="border-l">123</el-col>
    </el-row>
  </el-card>
</template>

<style scoped>
</style>