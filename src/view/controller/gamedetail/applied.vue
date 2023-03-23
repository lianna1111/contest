<template>
  <el-row>
    <div class="flex justify-items-end">
      <el-radio-group v-model="radio2" size="small">
        <el-radio-button label="N">1</el-radio-button>
      </el-radio-group>

      <el-select v-model="value" size="small" placeholder="分类">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        size="small"
        v-model="searchText"
        class="w-auto"
        placeholder="搜索"
        :suffix-icon="Search"
      />
    </div>
  </el-row>
  <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column label="代码" width="120">
      <template #default="scope">{{ scope.row.id }}</template>
    </el-table-column>
    <el-table-column property="name" label="组别名称" width="220" />
    <el-table-column property="team" label="代表队" width="220" />
    <el-table-column property="member" label="选手" width="80" />
    <el-table-column property="main" label="主题" width="210">
      <template #default="scope">
        <el-button type="text" size="small"> {{ scope.row.main }} </el-button>
      </template>
    </el-table-column>
    <el-table-column property="price" label="价格" width="100" />
    <el-table-column property="status" label="状态" width="100" />
    <el-table-column property="time" label="报名时间" width="100" />
    <el-table-column fixed="right" label="操作区" width="120">
      <template #default="scope">
        <el-button
          type="text"
          size="small"
          @click.prevent="deleteRow(scope.$index)"
        >
          退赛
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection()">清除选择</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { ElTable } from "element-plus";
import { Search } from "@element-plus/icons-vue";

interface User {
  id: number;
  name: string;
  team: string;
  member: string;
  main: string;
  price: string;
  time: string;
  status: number;
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);
const toggleSelection = (rows?: User[]) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      multipleTableRef.value!.toggleRowSelection(row, undefined);
    });
  } else {
    multipleTableRef.value!.clearSelection();
  }
};
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};
const searchText = ref("");

const tableData: User[] = [
  {
    id: 1,
    name: "9岁精英队",
    member: "文玺妮",
    team: "长沙海草舞蹈",
    main: "w,t",
    time: "2020",

    price: "500/组",
    status: 0,
  },
  {
    id: 2,
    name: "9岁精英队",
    member: "文玺妮",
    team: "长沙海草舞蹈",
    main: "w,t",

    time: "2020",

    price: "500/组",
    status: 0,
  },
  {
    id: 3,
    name: "9岁精英队",
    member: "文玺妮",
    team: "长沙海草舞蹈",
    main: "w,t",

    time: "2020",

    price: "500/组",
    status: 0,
  },
  {
    id: 4,
    name: "9岁精英队",
    member: "文玺妮",
    team: "长沙海草舞蹈",
    main: "w,t",

    time: "2020",

    price: "500/组",
    status: 0,
  },
];
</script>
