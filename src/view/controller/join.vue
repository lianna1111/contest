<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, onUnmounted } from "vue";
// mounted
const Route = useRoute(); //获取到值
onMounted(() => {
  console.log(Route.query, "Component is Route.query!");
});
const msg = Route.query;
import { reactive } from "vue";

// do not use same name with ref
const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});

const onSubmit = () => {
  console.log("submit!");
};
</script>

<template>
  <el-card>
    <el-divider>代表队信息</el-divider>
    <div class="border p-3 mb-3">
      <el-descriptions :title="msg.name" direction="vertical " column="2">
        <el-descriptions-item label="主办方">{{
          msg.time
        }}</el-descriptions-item>
        <el-descriptions-item label="比赛地址">{{
          msg.time
        }}</el-descriptions-item>
        <el-descriptions-item label="报名起止时间">{{
          msg.time
        }}</el-descriptions-item>
        <el-descriptions-item label="比赛时间"
          >{{ msg.time }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <!-- form -->
    <el-form :model="form" size="small" label-width="120px">
      <el-form-item label="代表队名称" required>
        <el-col :span="12">
          <el-input v-model="form.name" />
        </el-col>
      </el-form-item>

      <el-form-item label="带队老师联系方式" required>
        <el-col :span="10">
          <el-input v-model="form.name" placeholder="姓名" />
        </el-col>
        <el-col :span="13" :offset="1">
          <el-input v-model="form.name" placeholder="手机号" />
        </el-col>
      </el-form-item>
      <el-divider>背号邮寄地址</el-divider>
      <el-form-item label="收件人姓名" required>
        <el-col :span="12">
          <el-input v-model="form.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="收件人联系方式" required>
        <el-col :span="12">
          <el-input v-model="form.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="收件人地址" required>
        <el-col :span="12">
          <el-input v-model="form.name" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" class="bg-red-400" @click="onSubmit"
          >参加</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>
</style>