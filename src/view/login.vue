<script setup lang="ts">
import { ref,reactive,watch,onMounted } from "vue";
import { ElMessage,ElMessageBox } from "element-plus";
 import FingerprintJS from '@fingerprintjs/fingerprintjs'
// import Captcha from '@/api/Captcha'
import User from "../api/user";
import { useRouter } from "vue-router";
import { setLogin } from '../util/main'
import { UserObj } from "@/util/interface";

let router = useRouter();
// storage
// import { storage } from "../plugin/storage";
const baseUrl = import.meta.env.VITE_API_BASEURL;
const tagIndex=ref(false)
// const token = ref('')
const random = ref('')
const  issend= ref(false)
const time = ref(30)
const sendText=ref('发送验证码')

const form = reactive({
  username: "",
  password: "",
  mobile:'',
  smscode:'',
  numcode:'',
  type:'username',
  token:''
});

  onMounted(async () => {
    const fp = await FingerprintJS.load()
    const result = await fp.get()
    form.token = result.visitorId
    sessionStorage.removeItem('token')
    sessionStorage.setItem('token',result.visitorId)
    // console.log('token: '+sessionStorage.getItem('token'))
    // console.log('local token: '+token.value)
    // 登录之前 token 传接口
  })
//切换账号-手机号登陆
 watch(() => tagIndex.value, (val,value) => {
    form.type = val ? 'mobile' : 'username'
    if( form.type == 'mobile'){
      form.username='';form.password=''
    }
      console.log(val,form.type,form.username)
    })
//发送短信
  const send = (time:number)=>{
    const mobile = document.querySelector<HTMLInputElement>("input[name='mobile']")!
    const regMobile = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    if(form.mobile== ''){
      ElMessageBox.alert('手机号码不能为空', '提示', {confirmButtonText: '确定',callback: () => {mobile.focus()},})
          return false}
    if(!regMobile.test(form.mobile)){
       ElMessageBox.alert('手机号码格式不正确', '提示', {confirmButtonText: '确定',callback: () => {mobile.focus()},})
          return false}
  //验证通过发送验证码
   console.log(form);
    code()//发送
    issend.value = true
    const timeIndex = setInterval(()=>{
        if(time == 0){
            clearInterval(timeIndex)
            issend.value = false
            sendText.value = '重新发送'
        }else{
            time--
            sendText.value = '发送成功' + time + 's'
        }
    },1000)
    }

const code=()=>{
    User.smsSend(form)
    .then((res:any) => {
      console.log(res);
      if (res.data.code == 0) {
         ElMessage({message: res.data.data.msg});
      }else{
         ElMessage({message: res.data.msg});
      }
    })
    .catch((res) => {
      console.log(res);
    });
}
//登录
const onSubmit = () => {
    User.login(form).then((res:any) => {
    console.log(res);
    if (res.data.code == 0) {
        const data = res.data.data 
       setLogin(data)//储存storage
        ElMessage.success({message: '登录成功！'});
        setTimeout(()=>{
            router.push({ path: "/msg"}); 
        },100)  // vue2 同步  vue3 异步     
    }else{
       ElMessage({message: res.data.msg});
       random.value = Math.random().toString().split('.').pop() as string
       return false}
    })
    .catch((res) => {
      console.log(res);
    }); 
  // console.log(form, "submit!");
};

 const setCaptcha = ()=>{
    random.value = Math.random().toString().split('.').pop() as string
    }
</script>

<template>
  <div class="h-screen" style='background:url(https://admin.yiwenyw.com/upload/carousel/20210911130850_245.jpg) fixed no-repeat center / cover'>
    <!-- title -->
    <!-- main -->
    <div class='w-fit mx-auto'>
    <div class="text-center text-3xl font-sans py-20 text-white">认证考试报名平台</div>
    <el-row :gutter="20">
      <el-col> 
        <div class="flex justify-between text-white">
          <div :class="['mx-10 py-3 my-3 cursor-default',!tagIndex?'active':'']"  @click="tagIndex=!tagIndex">账号密码登录</div>
          <div :class="['mx-10 py-3 my-3 cursor-default',tagIndex?'active':'']"  @click="tagIndex=!tagIndex" >手机号登录</div>
          </div>
      </el-col>
  </el-row>
  <div v-if="!tagIndex">
     <el-input
          v-model="form.username"
          class="my-2"
          size="large"
          placeholder="身份证号/手机号/用户名"
          :suffix-icon="Calendar"
      />
        <el-input
          v-model="form.password"
          class="my-2"
          size="large"
          type='password'
          placeholder="密码"
          :prefix-icon="Search"
      />
 <el-row>
        <el-col :span='12'>
       <el-input
          v-model="form.numcode"
          class="my-2"
          size="large"
          type=''
          placeholder="图形验证码"
      />
      </el-col>
      <el-col :span='8'>
      <img :src="baseUrl+'captcha?token='+form.token+'&r='+random" class="cursor-pointer w-[130px] m-2" @click="random=Math.random().toString().split('.').pop() as string" alt="">
      </el-col>
    </el-row>
      </div>
      <div v-else>
        <el-input
          v-model="form.mobile"
          name='mobile'
          class="my-2"
          size="large"
          placeholder="手机号码"
        >
          <template #prepend>
            <el-select v-model="select" placeholder="+86" style="width: 110px">
              <!-- <el-option label="+87" value="1" />
              <el-option label="+88" value="2" />
              <el-option label="+89" value="3" /> -->
            </el-select>
          </template>
        </el-input>
        <div class="flex justify-between">
          <el-input
            v-model="form.smscode"
            class="my-2"
            size="large"
            placeholder="手机验证码"
          />
          <el-button size="large" class="my-2 ml-2 bg-white" @click="!issend?send(time):''">{{sendText}}</el-button>
     
     <!-- <h5 class="absolute right-5 inline-block text-blue-500 cursor-pointer" @click="!issend?send(time):''">{{sendText}}</h5> -->
        </div>
        
       </div> 

    
        <div class="flex justify-between">
          <router-link to="reg">
            <el-button
              size="large"
               type="warning"
              class="m-5 bg-yellow-600"
              style="width: 100%"
              >注册</el-button
            >
          </router-link>

          <el-button
            size="large"
             type="warning" plain
            class="m-5 "
            style="width: 40%"
            @click="onSubmit"
            >登录</el-button
          >
        </div>
        <div class="flex justify-between text-sm text-white">
          <div class="mx-3 py-3 cursor-default ">
            其他登录方式<i class="fa fa-wechat fa-x mx-2"></i>
          </div>
          <div class="mx-3 py-3 cursor-default ">忘记密码</div>
        </div>
 
    <!-- bottom -->
  <page-bottom/>
  </div> </div>
</template>

<style scoped>
.active {
  border-bottom: 3px solid #ffcb52;
  color: #ffcb52;
}
</style>