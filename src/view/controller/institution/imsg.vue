<script setup lang="ts">
const url =
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";

import { reactive } from "vue";

// do not use same name with ref
const form = reactive({
  name: "",
});
</script>

<template>
  <div class="border-b p-3">机构信息</div>
  <div class="border-b p-3 text-sm">
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col :span="4">
          <el-form-item label="logo:">
            <el-image
              style="width: 100px; height: 100px"
              :src="url"
              fit="fill"
            />
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="机构名称:">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="机构类型:">
            <el-tag size="small">主办机构：</el-tag>
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider>负责人联系方式</el-divider>
      <el-form-item label="姓名:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="电话:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image .block:last-child {
  border-right: none;
}
.demo-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>