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
    Title: "规程",
    Pic: "box",
    Level: 1,
    PID: 0,
    Module: "rule",
    Number: 0,
    Sort: 1,
  },
  {
    ID: 2,
    Title: "组别信息",
    Pic: "bowl",
    Level: 1,
    PID: 0,
    Module: "group",
    Number: 0,
    Sort: 2,
  },
  {
    ID: 3,
    Title: "已报名管理",
    Pic: "brush",
    Level: 1,
    PID: 0,
    Module: "applied",
    Number: 0,
    Sort: 3,
  },
  {
    ID: 4,
    Title: "代表队/邀请码",
    Pic: "brush",
    Level: 1,
    PID: 0,
    Module: "team",
    Number: 0,
    Sort: 4,
  },
  {
    ID: 5,
    Title: "统计信息",
    Pic: "brush",
    Level: 1,
    PID: 0,
    Module: "statistical",
    Number: 0,
    Sort: 5,
  },
  {
    ID: 6,
    Title: "云服务",
    Pic: "brush",
    Level: 1,
    PID: 0,
    Module: "cloud",
    Number: 0,
    Sort: 6,
  },
];
</script>

<template>
  <!-- page start -->
  <div>湖南省国际流行舞蹈协会</div>
  <!-- card -->
  <el-card>
    <el-row class="">
      <el-col :span="16">
        <el-descriptions column="2" title="2020中顺洁柔杯公开赛">
          <el-descriptions-item
            label-class-name="text-xs text-gray-500"
            class-name="text-xs"
            label="主办方："
            >湖南省国际流行舞蹈协会</el-descriptions-item
          >
          <el-descriptions-item
            label-class-name="text-xs text-gray-500"
            class-name="text-xs"
            label="报名时间："
            >2020-1-1至2020-2-1</el-descriptions-item
          >
          <el-descriptions-item
            label-class-name="text-xs text-gray-500"
            class-name="text-xs"
            label="比赛地址："
            >湖南省国际流行舞蹈协会</el-descriptions-item
          >
          <el-descriptions-item
            label-class-name="text-xs text-gray-500"
            class-name="text-xs"
            label="比赛时间："
            class="flex"
          >
            2020-1-1至2020-2-1
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="text-xs text-gray-500"
            class-name="text-xs"
            label="负责人："
            >湖南省国际流行舞蹈协会</el-descriptions-item
          >
        </el-descriptions>
      </el-col>

      <!-- 统计信息 -->
      <el-col :span="8">
        <div class="flex justify-center mt-5">
          <div>
            <div class="text-gray-500 text-xs">统计信息</div>
            <div class="py-3">4项</div>
            <div class="text-xs">850</div>
          </div>
          <div class="mx-5">
            <div class="text-gray-500 text-xs">状态</div>
            <div class="py-3">已截止</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- menu -->
    <element-menu
      default-active="1"
      mode="horizontal"
      :items="menu"
      :isPic="false"
      :isTop="true"
    >
    </element-menu>
    <el-alert
      title="报名已截止"
      type="warning"
      :closable="false"
      class="mb-5"
    />

    <router-view></router-view>
  </el-card>
  <!-- page end -->
  <page-bottom></page-bottom>
</template>

<style scoped>
</style>