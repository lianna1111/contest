<script setup lang="ts">
// 传参接口
interface List {
  ID: number;
  Title: string;
  Pic: string;
  Level: number;
  PID: number;
  Module: string;
  Number: number;
  Sort: number;
}

const menu = [
  {
    ID: 1,
    Title: "机构信息",
    Pic: "box",
    Level: 1,
    PID: 0,
    Module: "imsg",
    Number: 0,
    Sort: 1,
  },
  {
    ID: 2,
    Title: "成员管理",
    Pic: "bowl",
    Level: 1,
    PID: 0,
    Module: "member",
    Number: 0,
    Sort: 2,
  },
];
// breadcrumb
const List = [{ name: "中国国际流行舞蹈协会", path: "/" }];
</script>

<template>
  <element-breadcrumb class="mb-2" :items="List"></element-breadcrumb>
  <el-card class="box-card">
    <el-row>
      <el-col :span="3" class="border">
        <div class="border-b p-3">机构设置</div>
        <!-- menu -->
        <element-menu
          default-active="1"
          :items="menu"
          :isPic="false"
          :isTop="true"
        >
        </element-menu>
      </el-col>
      <el-col :span="20" class="ml-3 border">
        <router-view></router-view>
      </el-col>
    </el-row>
  </el-card>
  <page-bottom></page-bottom>
</template>

<style scoped>
</style>