<script setup lang="ts">
import { ref } from "vue";
import { Calendar, Search } from "@element-plus/icons-vue";
const input1 = ref("");
// breadcrumb
const List = [{ name: "岳阳天浩舞蹈", path: "/gMain" }];
</script>

<template>
  <element-breadcrumb class="mb-2" :items="List"></element-breadcrumb>
  <!-- card -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>岳阳天浩舞蹈</span>
      </div>
    </template>
    <el-row :gutter="20">
      <!-- card1 -->
      <el-col :span="12"
        ><div class="border">
          <div class="border-b p-3">
            <span class="text-xs">我的代表队</span
            ><el-button type="text" class="float-right" size="small"
              >更多</el-button
            >
          </div>
          <div class="text-xs p-3">
            <div class="float-right">剩余46天截止</div>
            <div>
              <i class="fa fa-circle text-blue-400"></i>
              岳阳天浩
            </div>
            <div class="text-gray-500 py-1">2020第二届怀文杯xxxxxxxxx</div>
          </div>
          <div class="text-xs p-3">
            <div class="float-right">已截止</div>
            <div>
              <i class="fa fa-circle text-red-400"></i>
              岳阳天浩
            </div>
            <div class="text-gray-500 py-1">2020第二届怀文杯ddahkajhgkah</div>
          </div>
        </div>
      </el-col>

      <!-- card2 -->
      <el-col :span="12"
        ><div class="border">
          <div class="border-b p-3">
            <span class="text-xs">输入邀请码参加赛事</span>
          </div>
          <div class="px-6">
            <el-input
              v-model="input1"
              class="w-11/1 mt-5"
              placeholder="请输入邀请码"
              ><template #append class="bg-blue-400">创建新代表队</template>
            </el-input>
            <div class="text-xs mt-2 mb-5 texxt-gray-500">
              <i class="fa fa-lightbulb-o"></i> 邀请码格式为xxxxxxx
            </div>
          </div>
        </div>

        <!-- card3 -->
        <div class="border my-5">
          <div class="border-b p-3">
            <span class="text-xs">近期赛事</span
            ><el-button type="text" class="float-right" size="small"
              >更多</el-button
            >
          </div>
          <div class="text-xs p-3">
            <div class="float-right">剩余46天截止</div>
            <div>
              <i class="fa fa-circle text-blue-400"></i>
              2020中国绵阳第二节舞蹈文化艺术节
            </div>
            <div class="text-gray-500 py-1">绵阳市体育总会</div>
          </div>
          <div class="text-xs p-3">
            <div class="float-right">剩余46天截止</div>
            <div>
              <i class="fa fa-circle text-blue-400"></i>
              2020第二节“博文杯”北京标准舞城市公开赛
            </div>
            <div class="text-gray-500 py-1">北京市体育基金会</div>
          </div>
          <div class="text-xs p-3">
            <div class="float-right">剩余46天截止</div>
            <div>
              <i class="fa fa-circle text-blue-400"></i>
              2020第二节“博文杯”北京标准舞城市公开赛
            </div>
            <div class="text-gray-500 py-1">北京市体育基金会</div>
          </div>
          <div class="text-xs p-3">
            <div class="float-right">剩余46天截止</div>
            <div>
              <i class="fa fa-circle text-blue-400"></i>
              2020第二节“博文杯”北京标准舞城市公开赛
            </div>
            <div class="text-gray-500 py-1">北京市体育基金会</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
  <!-- card end -->
  <page-bottom></page-bottom>
</template>

<style scoped>
</style>