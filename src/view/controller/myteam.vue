<script setup lang="ts">
const handleClick = () => {
  console.log("click");
};
import { reactive, ref } from "vue";

// const formData = reactive({
//   name: "",
// });
const field = ["pic", "name", "time", "status"];
const type = "3";
const comment = ["", "", "报名起止时间", "当前状态"];
const relation = [{ id: 1, title: "模块管理", url: "" }];
const total = 100;
const hand: string[] = [];
const tableData = [
  {
    pic: "1",
    name: "2020dddddddddddddddddddddddddddddddddd1",
    time: "California",
    status: "Los Angeles",
    module: "rule",
  },
  {
    pic: "2016-05-03",
    name: "Tom",
    time: "California",
    status: "Los Angeles",
    module: "rule",
  },
  {
    pic: "2016-05-03",
    name: "Tom",
    time: "California",
    status: "Los Angeles",
    module: "rule",
  },
  {
    pic: "2016-05-03",
    name: "Tom",
    time: "California",
    status: "Los Angeles",
    module: "rule",
  },
];
import { ElMessage, ElMessageBox } from "element-plus";

const open = () => {
  ElMessageBox.prompt("邀请码", "参加赛事", {
    confirmButtonText: "下一步",
    cancelButtonText: "取消",
    inputPattern: /^[u,r]{1}[0-9]{8}/,
    inputErrorMessage:
      "邀请码格式为U或者R开头的8位数字 例如：U12345678或R98765432",
  })
    .then(({ value }) => {
      ElMessage({
        type: "success",
        message: `你的邀请码为:${value}`,
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Input canceled",
      });
    });
};
// breadcrumb
const List = [
  { name: "岳阳天浩舞蹈", path: "/gMain" },
  { name: "我的代表队", path: "/myteam" },
];
</script>

<template>
  <element-breadcrumb class="mb-2" :items="List"></element-breadcrumb>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>我的代表队</span>
        <el-button class="text-xs" @click="open">输入邀请码</el-button>
      </div>
    </template>
    <el-row>
      <el-col :offset="14">
        <el-radio-group v-model="tableLayout">
          <el-radio-button label="全部" />
          <el-radio-button label="进行中" />
          <el-radio-button label="未开始" />
          <el-radio-button label="已截止" />
        </el-radio-group>
        <el-input
          v-model="input2"
          class="w-auto ml-5 translate-y-1.5"
          placeholder=""
          :suffix-icon="Search"
        />
      </el-col>
    </el-row>
    <element-controller
      :field="field"
      :type="type"
      :comment="comment"
      :tableData="tableData"
      :relation="relation"
      :total="total"
      :hand="hand"
    ></element-controller>
  </el-card>
  <page-bottom></page-bottom>
</template>

<style scoped>
</style>