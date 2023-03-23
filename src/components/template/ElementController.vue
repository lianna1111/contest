<script setup lang="ts">
import { ref, reactive } from "vue";

const dataKey = ref([]);
const formData = reactive({ keyword: "", page: 1, pagesize: 10 });

const onSubmit = () => {
  console.log(formData);
};

interface Props {
  field: string[];
  type: number;
  comment: string[];
  total: number;
  tableData: [];
  relation: [{ id: number; title: string; url?: string }];
  hand: string[];
}

const props = withDefaults(defineProps<Props>(), {
  total: 0,
});

const handleSizeChange = (val: number) => {
  formData.page = val;
  console.log(`${val} items per page`);
  onSubmit();
};
import { useRouter } from "vue-router";
const router = useRouter();
const handelChange = (index: number, module: tableData.module) => {
  console.log(index, module);
  router.push({
    path: module,
  });
  return {};
};

const handelChanges = (index: number, row: tableData) => {
  console.log(index, row);
  router.push({
    path: row.module,
    query: row,
  });
  return {};
};

const handleCurrentChange = (val: number) => {
  formData.page = val;
  console.log(val, `current page: ${val}`);
  onSubmit();
};
</script>

<template>
  <el-container class="h-full bg-white">
    <div class="search mx-5 pt-4 bg-white"></div>
    <el-main class="pt-0">
      <el-table :data="tableData" table-layout="auto" class="w-full">
        <template v-for="(item, index) in field" :key="index">
          <el-table-column :prop="item" :label="comment[index]" /> </template
        ><el-table-column fixed="right" label="" width="120">
          <template #default="scope" v-if="type == '1'">
            <el-button type="text" size="small">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="handelChange(scope.$index, scope.row.module)"
              >进入</el-button
            >
          </template>
          <template #default="scope" v-else-if="type == '2'">
            <el-button
              type="text"
              size="small"
              @click="handelChanges(scope.$index, scope.row)"
              >参加</el-button
            >
          </template>
          <template #default="scope" v-else-if="type == '3'">
            <el-button
              type="text"
              size="small"
              @click="handelChange(scope.$index, scope.row.module)"
              >进入</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-center py-5">
        <el-pagination
          v-model:currentPage="formData.page"
          :page-size="formData.pagesize"
          background
          layout="total,prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-main>
  </el-container>
</template>

<style scoped>
.el-link {
  margin-right: 15px;
}
.el-link:not(:first-child) {
  margin-left: 15px;
}
.el-button--text {
  margin-right: 15px;
}
</style>