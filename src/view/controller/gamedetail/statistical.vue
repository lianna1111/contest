<script setup lang="ts">
const x = ["a", "b", "c", "d", "e"];
const data = [5, 10, 29, 15, 9];
const xaxis = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];
const ydata = [5, 10, 29, 15, 9, 33, 22, 17, 10, 15, 16, 10];

const tableData = [
  {
    id: 1,
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 2,
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 3,
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 4,
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 5,
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 6,
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>

<template>
  <el-row :gutter="20" class="main-header">
    <el-col :span="6">
      <el-card class="box-card">
        <template #header>
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-base">报名费</span>
          </div>
        </template>
        <div>
          <span class="text-2xl font-medium"
            ><i class="text-xl mr-1 fa fa-rmb"></i> 890</span
          >

          <el-divider class="mt-12 mb-3" />

          <p class="text-sm text-gray-500">
            今日报名费 <i class="text-xs fa fa-rmb"></i> 890
          </p>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">
        <template #header>
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-base">报名费</span>
          </div>
        </template>
        <div>
          <span class="text-2xl font-medium"> 890</span>

          <el-divider class="mt-12 mb-3" />
          <p class="text-sm text-gray-500">今日报名费 890</p>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">
        <template #header>
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-base">报名费</span>
          </div>
        </template>
        <div>
          <span class="text-2xl font-medium mb-10"> 890</span>

          <el-divider class="mt-12 mb-3" />

          <p class="text-sm text-gray-500">今日报名费 890</p>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">
        <template #header>
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-base">报名费</span>
          </div>
        </template>
        <div>
          <span class="text-2xl font-medium mb-10"> 890</span>

          <el-divider class="mt-12 mb-3" />

          <p class="text-sm text-gray-500">今日报名费 890</p>
        </div>
      </el-card>
    </el-col>
  </el-row>

  <el-card class="box-card mt-5">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-gray-400 text-base">热门组别</span>
      </div>
    </template>
    <el-row :gutter="20">
      <el-col :span="16">
        <echart-pie
          width="100%"
          height="400"
          name="asd"
          :xAxis="xaxis"
          :series="ydata"
          class="bg-white p-3"
        />
      </el-col>
      <el-col :span="8">
        <el-table :data="tableData" stripe size="large" style="width: 100%">
          <el-table-column prop="id" label="Id" width="50px" />
          <el-table-column prop="date" label="Date" width="120px" />
          <el-table-column prop="name" label="Name" width="100px" />
          <el-table-column prop="address" label="Address" width="auto" />
        </el-table>
      </el-col>
    </el-row>
  </el-card>
</template>

<style lang="scss" scoped>
.el-card ::v-deep(.el-card__header) {
  padding-top: 12px;
  padding-bottom: 12px;
}
.main-header .el-card ::v-deep(.el-card__header) {
  padding-top: 20px;
  padding-bottom: 0;
  border-bottom: unset;
}
</style>