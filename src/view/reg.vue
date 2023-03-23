<script  lang="ts" setup>
// route
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import User from "../api/user";

let router = useRouter();
const login = () => {
  router.push("/login");
};
// data
const form = reactive({
  username: "",
  password: "",
});
const select = ref("");
const checkPassword = ref("");
let checkbtn = ref(false);




console.log(form, "submit!");

const onSubmit = () => {
  if (form.password != checkPassword.value) {
    ElMessage({
      message: "两次密码输入不一致，请重新输入！",
      type: "warning",
    });
    return
  }
  User.reg(form)
    .then((res) => {
      console.log(res);
      if(res.data.code==0){
        ElMessage({message: res.data.msg});
        router.push({ path: "/login"});
      }else{
        ElMessage({message: res.data.msg});
      }
     
    })
    .catch((res) => {
      console.log(res);
    });
};
</script>

<template>
<div class="h-screen" style='background:url(https://admin.yiwenyw.com/upload/carousel/20210911130850_245.jpg) fixed no-repeat center / cover'>

  
    <!-- main -->
    <div class='w-fit mx-auto'>
    <div class="text-center text-3xl font-sans py-20 text-white">认证考试报名平台</div>
   
<el-input
          v-model="form.username"
          class="my-2 mt-10"
          size="large"
          placeholder="用户名由5-15位（数字、字母、_、-）组成，且必须以字母开头"
      />
        <el-input
          v-model="form.password"
          class="my-2"
          size="large"
          type='password'
          placeholder="密码,长度6-16位"
      />
        <el-input
          v-model="checkPassword"
          class="my-2"
          size="large"
           type='password'
          placeholder="确认密码"
      />
      <div class="my-2 text-xs text-white">
        注册即代表同意 <span class="text-yellow-600">《使用协议》</span> 和
        <span class="text-yellow-600">《隐私政策》</span>
      </div>
         <div class="flex justify-start">
          <el-button
            size="large"
            type="warning" plain
            class="m-5 "
            :disabled="submitbtn"
            style="width: 40%"
            @click="onSubmit"
            >注册</el-button
          >
          <div
            class="text-white my-7 text-sm cursor-default"
            @click="login()"
          >
            使用已有账号登录
          </div>
        </div>
    <!-- bottom -->
    <page-bottom/>
  </div>

 </div>
</template>

<style scoped>
</style>