
<script lang="ts" setup>
import { ref } from "vue";
import type { ElTable } from "element-plus";
import { Search } from "@element-plus/icons-vue";

import { onBeforeMount } from "vue";
import Music from "../../../api/Music";

let sign = ref([]) as any;
const musicSign = () => {
  Music.get()
    .then((res) => {
      console.log(res);
      sign = res.data.msg;
    })
    .catch((res) => {
      console.log(res);
    });
};
musicSign();
console.log(sign);

setTimeout(() => {
  console.log(sign);
}, 2000);

interface User {
  id: number;
  name: string;
  limit: string;
  price: string;
  music: string;
  statistics: number;
  notice: string;
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);

const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};
// add
const dialogVisible = ref(false);

const tableData: User[] = [
  {
    id: 1,
    name: "摩登公开赛",
    limit: "男女双人",
    price: "500/组",
    music: "w,t,f,q",
    statistics: 0,
    notice: "第1-3名每人发放奖金和证书，第4-6名发奖牌和证书，前6奖金",
  },
  {
    id: 2,
    name: "摩登公开赛",
    limit: "男女双人",
    price: "500/组",
    music: "w,t,f,q",
    statistics: 0,
    notice: "第1-3名每人发放奖金和证书，第4-6名发奖牌和证书，前6奖金",
  },
  {
    id: 3,
    name: "摩登公开赛",
    limit: "男女双人",
    price: "500/组",
    music: "w,t,f,q",
    statistics: 0,
    notice: "第1-3名每人发放奖金和证书，第4-6名发奖牌和证书，前6奖金",
  },
  {
    id: 4,
    name: "摩登公开赛",
    limit: "男女双人",
    price: "500/组",
    music: "w,t,f,q",
    statistics: 0,
    notice: "第1-3名每人发放奖金和证书，第4-6名发奖牌和证书，前6奖金",
  },
  {
    id: 5,
    name: "摩登公开赛",
    limit: "男女双人",
    price: "500/组",
    music: "w,t,f,q",
    statistics: 0,
    notice: "第1-3名每人发放奖金和证书，第4-6名发奖牌和证书，前6奖金",
  },
];
import { reactive } from "vue";

// do not use same name with ref
const form = reactive({
  CompetitionID: 1,
  ItemCode: "",
  ItemName: "",
  Remark: "",
  name: "",
  MusicSign: "",
  Description: "",
  PaymentType: "",
  RegistrationID: ["男女双人"],
  MinNumber: "0",
  MaxNumber: "0",
  MinAge: "0",
  MaxAge: "0",
  IsNullIdcard: "",
  IsTheme: "",
  IsRepeat: "",
});
import { ElMessage } from "element-plus";
import competition from "../../../api/competition";
const onSubmit = () => {
  console.log("submit!");
  competition
    .add_item(form)
    .then((res) => {
      console.log(res);
      ElMessage({
        message: res.data.msg,
      });
    })
    .catch((res) => {
      console.log(res);
    });
};
const signs = [
  { ID: 1, Title: "拉丁舞", Sign: "LD", Level: 1, PID: 0 },
  { ID: 6, Title: "恰恰", Sign: "C", Level: 2, PID: 1 },
  { ID: 7, Title: "牛仔", Sign: "J", Level: 2, PID: 1 },
  { ID: 8, Title: "伦巴", Sign: "R", Level: 2, PID: 1 },
  { ID: 9, Title: "桑巴", Sign: "S", Level: 2, PID: 1 },
  { ID: 10, Title: "斗牛", Sign: "P", Level: 2, PID: 1 },
  { ID: 4, Title: "摩登舞", Sign: "MD", Level: 1, PID: 0 },
  { ID: 11, Title: "华尔兹", Sign: "W", Level: 2, PID: 4 },
  { ID: 12, Title: "探戈舞", Sign: "T", Level: 2, PID: 4 },
  { ID: 13, Title: "狐步舞", Sign: "F", Level: 2, PID: 4 },
  { ID: 14, Title: "快步舞", Sign: "Q", Level: 2, PID: 4 },
  { ID: 15, Title: "维也纳华尔兹", Sign: "VW", Level: 2, PID: 4 },
  { ID: 5, Title: "交谊舞", Sign: "JY", Level: 1, PID: 0 },
  { ID: 16, Title: "慢三", Sign: "S3", Level: 2, PID: 5 },
  { ID: 17, Title: "慢四", Sign: "S4", Level: 2, PID: 5 },
  { ID: 18, Title: "平三", Sign: "P3", Level: 2, PID: 5 },
  { ID: 19, Title: "平四", Sign: "P4", Level: 2, PID: 5 },
  { ID: 20, Title: "快三", Sign: "Q3", Level: 2, PID: 5 },
  { ID: 21, Title: "快四", Sign: "Q4", Level: 2, PID: 5 },
];
</script>

<template>
  <el-dialog v-model="dialogVisible" title="添加组别" width="30%">
    <el-form
      :model="form"
      size="small"
      label-position="top"
      label-width="120px"
    >
      <el-form-item label="组别代码" required>
        <el-col :span="4"> <el-input v-model="form.ItemCode" /></el-col>
      </el-form-item>
      <el-form-item label="组别名称" required>
        <el-input v-model="form.ItemName" />
      </el-form-item>
      <el-form-item label="提示">
        <el-input
          v-model="form.Remark"
          placeholder="简短的重要提示，会显示在组别名称后面（例如：仅限高校学生）"
        />
      </el-form-item>
      <el-form-item label="音乐" required>
        <el-input
          v-model="form.MusicSign"
          placeholder="请填写组别使用的音乐表示，多首音乐请使用半角逗号隔开"
        />
        <div class="text-xs">
          <el-popover
            placement="right"
            :width="400"
            trigger="click"
            class="text-blue-400"
          >
            <template #reference>
              <el-button style="margin-right: 16px">对照表</el-button>
            </template>
            <el-table :data="signs">
              <el-table-column width="150" property="Title" label="Title" />
              <el-table-column width="100" property="Sign" label="Sign" />
            </el-table>
          </el-popover>
          非标准音乐可自行定义音乐标识
        </div>
      </el-form-item>
      <el-form-item label="额外描述">
        <el-input
          v-model="form.Description"
          type="textarea"
          placeholder="用于更详细的介绍这个组别，可以写更多的内容，但是不在列表页面展示"
        />
      </el-form-item>
      <el-divider>报名费用</el-divider>
      <el-form-item label="计费方式">
        <el-radio-group v-model="form.PaymentType">
          <el-radio :label="0">手动</el-radio>
          <el-radio :label="1">按组别计费</el-radio>
          <el-radio :label="2">按人数计费</el-radio>
        </el-radio-group>
        <el-col class="text-xs text-gray-400"
          ><i class="fa fa-info text-xs">.</i>
          “按人数计费”推荐在人数不定的组别中使用</el-col
        >
      </el-form-item>
      <el-form-item label="金额">
        <el-col :span="4"><el-input v-model="form.price" /></el-col>
      </el-form-item>
      <el-divider>报名限制</el-divider>
      <el-form-item label="">
        <el-checkbox-group v-model="form.RegistrationID">
          <el-checkbox label="男女双人" />
          <el-checkbox label="女单" />
          <el-checkbox label="女双" />
          <el-checkbox label="男单" />
          <el-checkbox label="男双" />
          <el-checkbox label="集体舞" />
          <el-checkbox label="六人组" />
          <el-checkbox label="女子六人组" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="人数">
        <el-row :gutter="10">
          <el-col :span="4"
            ><el-input v-model="form.MinNumber" type="number" :min="0"
          /></el-col>
          <el-col :span="2">-</el-col>
          <el-col :span="4"
            ><el-input v-model="form.MaxNumber" type="number"
          /></el-col>
          不限制
        </el-row>
        <el-col class="text-xs text-gray-400"
          ><i class="fa fa-info text-xs">.</i>
          填写0为不限制，一般用于不限人数的集体舞</el-col
        >
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="radio">
          <el-radio :label="1">不限制</el-radio>
          <el-radio :label="2" disabled>男女组合（仅双人）</el-radio>
          <el-radio :label="3">男</el-radio>
          <el-radio :label="4">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="年龄限制（每人）">
        <el-row :gutter="10">
          <el-col :span="4"><el-input v-model="form.MinAge" /></el-col>
          <el-col :span="2">-</el-col>
          <el-col :span="4"><el-input v-model="form.MaxAge" /></el-col>
          不限制
        </el-row>
      </el-form-item>
      <el-form-item label="年龄限制（舞者年龄相加）">
        <el-row :gutter="10">
          <el-col :span="4"><el-input v-model="form.mincount" /></el-col>
          <el-col :span="2">-</el-col>
          <el-col :span="4"><el-input v-model="form.maxcount" /></el-col>
          不限制
        </el-row>
      </el-form-item>
      <el-form-item label="是否允许未填写身份证的选手报名">
        <el-radio-group v-model="form.IsNullIdcard">
          <el-radio :label="1">允许</el-radio>
          <el-radio :label="0">禁止</el-radio>
        </el-radio-group>
        <el-col class="text-xs text-gray-400"
          ><i class="fa fa-info text-xs">.</i>
          未填写身份证信息的选手会被要求补全证件信息，以加强组别限制的准确性。但依旧不能避免带队老师拿他人证件顶替</el-col
        >
      </el-form-item>
      <el-divider>额外</el-divider>
      <el-form-item label="是否需要主题名称">
        <el-radio-group v-model="form.IsTheme">
          <el-radio :label="0">不需要</el-radio>
          <el-radio :label="1">需要</el-radio>
        </el-radio-group>
        <el-col class="text-xs text-gray-400"
          ><i class="fa fa-info text-xs">.</i>
          开启后，报名该组别会提示输入组别名称</el-col
        >
      </el-form-item>
      <el-form-item label="组别名称" v-if="form.IsTheme == 1">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="允许重复报名">
        <el-radio-group v-model="form.IsRepeat">
          <el-radio :label="0">不允许</el-radio>
          <el-radio :label="1">允许</el-radio>
        </el-radio-group>
        <el-col class="text-xs text-gray-400"
          ><i class="fa fa-info text-xs">.</i>
          开启后同一个学生可以重复报名</el-col
        >
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="
            onSubmit();
            dialogVisible = false;
          "
          class="bg-blue-400"
          >添加</el-button
        >
      </span>
    </template>
  </el-dialog>
  <div class="flex justify-between">
    <div>
      <el-button-group class="ml-4" size="small">
        <el-button type="default" @click="dialogVisible = true"
          >添加组别</el-button
        >
        <el-button type="default">批量编辑</el-button>
        <el-button type="default">系列/兼报</el-button>
      </el-button-group>
    </div>
    <div>
      <el-radio-group v-model="radio2" size="small">
        <el-radio-button label="download"
          ><i class="fa fa-download"></i
        ></el-radio-button>
      </el-radio-group>
      <el-radio-group v-model="radio3" size="small" class="mx-3">
        <el-radio-button label="fa"><i class="fa fa-th"></i></el-radio-button>
        <el-radio-button label="list"
          ><i class="fa fa-list"></i
        ></el-radio-button>
      </el-radio-group>
      <el-select
        v-model="value"
        class="m-2 translate-y-1"
        size="small"
        placeholder="分类"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        size="small"
        v-model="input2"
        class="w-auto translate-y-1"
        placeholder="搜索"
        :suffix-icon="Search"
      />
      <el-radio-group v-model="radio4" class="m-2" size="small">
        <el-radio-button label="undo"
          ><i class="fa fa-undo"></i
        ></el-radio-button>
      </el-radio-group>
    </div>
  </div>
  <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="expand" width="55">
      <template #default="props">
        <div m="4">
          <p m="t-0 b-2">{{ props.row.notice }}</p>
        </div>
      </template>
    </el-table-column>

    <el-table-column type="selection" width="55" />
    <el-table-column label="代码" width="100">
      <template #default="scope">{{ scope.row.id }}</template>
    </el-table-column>
    <el-table-column property="name" label="名称" width="350" />
    <el-table-column property="limit" label="限制" width="350" />
    <el-table-column property="price" label="价格" width="100" />
    <el-table-column property="music" label="音乐" width="150" />
    <el-table-column property="statistics" label="统计" width="120" />
    <el-table-column fixed="right" label="操作区" width="120">
      <template #default="scope">
        <el-button
          type="text"
          size="small"
          @click.prevent="deleteRow(scope.$index)"
        >
          编辑
        </el-button>
        <el-button
          type="text"
          size="small"
          @click.prevent="deleteRow(scope.$index)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
