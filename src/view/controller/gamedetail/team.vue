<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
</script>

<template>
  <div class="flex justify-between">
    <div class="text-sm">
      您的公共邀请码为：
      <span class="text-orange-blue">1hdklah</span>
      <el-button class="ml-3">重新生成</el-button>
    </div>

    <div>
      <el-radio-group v-model="radio2" size="small">
        <el-radio-button label="download"
          ><i class="fa fa-download"></i
        ></el-radio-button>
      </el-radio-group>
      <el-radio-group v-model="radio3" size="small" class="mx-3">
        <el-radio-button label="fa">全部</el-radio-button>
        <el-radio-button label="list">已报名</el-radio-button>
        <el-radio-button label="list">已审核</el-radio-button>
        <el-radio-button label="list">未审核</el-radio-button>
        <el-radio-button label="list">已删除</el-radio-button>
      </el-radio-group>

      <el-input
        size="small"
        v-model="input2"
        class="w-auto translate-y-1"
        placeholder="搜索"
        :suffix-icon="Search"
      />
    </div>
  </div>
</template>

<style scoped>
</style>