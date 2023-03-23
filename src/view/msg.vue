<script setup lang="ts">
import { onMounted,reactive, ref } from "vue";
import { useRoute,useRouter } from "vue-router";
import { storage } from "../plugin/storage";
import { ElMessage,ElMessageBox,UploadProps } from "element-plus";
import type { FormInstance, FormRules } from 'element-plus'
import User from "../api/User";//api
import enterprise from "../api/enterprise";//api
import {checkLogin} from '../util/main'
import { regionData } from "element-china-area-data";

let router = useRouter();
const route = useRoute();
const formLabelWidth = "120px";
const ruleFormRef = ref<FormInstance>()
const ruleFormRef1 = ref<FormInstance>()
const cate_options= ref([])//企业类别
const  personEnter=ref('确认')
const  institutionEnter=ref('确认')
const schoolList =ref([])//校区列表
const institutionName=ref('')
//
const dialogPerson = ref(false);
const dialogMenu = ref(false);
const dialogInstitution = ref(false);

const clickit =ref(1);//点击第几项
const  issend= ref(false)
const ispersoncheck= ref(false)
const institutionCheck= ref(false)

const time = ref(30)
const sendText=ref('发送验证码')


onMounted(() => {
  // if(!checkLogin()){
  //    router.push({ path: "/login"});
  // }
  // if(!route.query.uid)
  setTimeout(() => {
    enterprise.cate()//艺术类别 1:考级中心
    .then((res:any) => {
      if (res.data.code == 0) {
        cate_options.value =res.data.data
        console.log(cate_options.value,'cate');
        // ElMessage.success("成功！");
      } 
    }).catch((res) => {console.log(res);});
  }, 2000);
  
})
const signs = [
  {id: 1,title: "普通用户",desc:'普通用户'},
  {id: 2,title: "家长",desc:'家长查看课程与比赛'},
  {id: 3,title: "教师",desc:'教师可以管理选手与课程' },
  {id: 4,title: "考官",desc:'考官进入评分'},
  {id: 5,title: "机构",desc:'机构关联赛事与选手'},
];
// --个人--
const ruleForm = reactive({
  uid:'',
  idcard:'',//身份证号
  realname:'',//真实姓名
  mobile:'',//手机号
  smscode:'',//短信验证码
  type:1,//普通用户
 });
  //--企业--
const ruleForm1 = reactive({
  uid:'',selectedOptions:'',
  cate_id:'',title:'',full_title:'',idcode:'',desc:'',logo:'',pic:'',picture:'',credit_code:'',business_license:'',legal_name:'',legal_card:'',legal_mobile:'',legal_card_front:'',legal_card_back:'',website:'',telphone:'',hotline:'',contact:'',contact_card:'',contact_card_front:'',contact_card_back:'',contact_mobile:'',contact_email:'',province_id:0,city_id:0,district_id:0,address:'',content:''
});
ruleForm.uid=sessionStorage.getItem('uid') as string
ruleForm1.uid=sessionStorage.getItem('uid') as string
//输入校验
const rules = reactive<FormRules>({
  realname: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
  idcard: [ { required: true, message: '请输入身份证号', trigger: 'blur' },{ min: 18, max:18, message: '请输入正确的身份证号格式', trigger: 'blur' }],
  mobile:[ { required: true, message: '请输入手机号', trigger: 'blur' },  { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '请输入正确的手机号格式', trigger: 'blur' }],
  smscode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
})
const rules1 = reactive<FormRules>({
  cate_id: [{ required: true, message: '请选择企业类别', trigger: 'blur' }],
  full_title: [{ required: true, message: '请输入企业全称', trigger: 'blur' }],
  title: [{ required: true, message: '请输入企业简称', trigger: 'blur' }],
  address: [{ required: true, message: '请输入企业详细地址', trigger: 'blur' }],
  selectedOptions: [{ required: true, message: '请选择企业地址', trigger: 'blur' }],
  })

const onCheck = (dialogMenu: boolean) => {//dilog
  dialogMenu.value = false;
  if(clickit.value==5){
  dialogInstitution.value=true
  }else{
  dialogPerson.value=true
  }
}
//个人认证
const onSubmit = async (formEl: FormInstance | undefined) => {
  // 1:普通用户，2：家长，3：教师，4：考官
  ruleForm.type = clickit.value
   if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      ispersoncheck.value=true
      personEnter.value='认证中'
      console.log(JSON.stringify(ruleForm),'ruleform!')
    console.log(JSON.parse(JSON.stringify(ruleForm)))
    //注册身份
    User.auth(ruleForm).then((res:any) => {
      console.log(res);
      if (res.data.code == 0) {
        ElMessage.success("成功！");
        router.push({ path: "/"});
      personEnter.value='认证成功'
      dialogPerson.value = false;
      } else {
        ElMessage.error(res.data.msg);
        personEnter.value='重新认证'
        ispersoncheck.value=false
      }
    }).catch((res) => { console.log(res);});
    } else {
      console.log('error submit!', fields)
    }
  })
};
//企业认证
const onSubmit1 = async (formEl: FormInstance | undefined) => {
console.log(ruleForm1);
   if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      institutionCheck.value=true
      institutionEnter.value='认证中'
  enterprise.add(ruleForm1).then((res:any) => {
      console.log(res);
      if (res.data.code == 0) {
        ElMessage.success("成功！");
        router.push({ path: "/" });
        institutionEnter.value='认证成功'
         dialogInstitution.value = false;
      } else {
        ElMessage.error(res.data.msg);
        institutionEnter.value='重新认证'
        institutionCheck.value=false
      }
    })
    .catch((res) => {
      console.log(res);
    });
    } else {
      console.log('error submit!', fields)
    }
  })
};

// 退出登录
const logout = () => {
  router.push("/login");
  storage.clear()
};

//验证码
const code=()=>{
    User.smsSend({'mobile':ruleForm.mobile})
    .then((res:any) => {
      console.log(res);
      if (res.data.code == 0) {
         ElMessage({message: res.data.data.msg});
      }else{
         ElMessage({message: res.data.msg});

      }
    })
}
  const send = (time:number)=>{
        code()
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
// 地址
const handleChange = (value: any) => {
  ruleForm1.province_id = value[0];
  ruleForm1.city_id = value[1];
  ruleForm1.district_id = value[2];
};
//营业执照上传
const handleAvatarSuccess: UploadProps["onSuccess"] = (response,uploadFile) => {
     business_license.value = URL.createObjectURL(uploadFile.raw!); //缩略图展示
     ruleForm.business_license = response.msg;
     console.log(business_license.value,"imgurl",uploadFile,"uploadFile",response.msg,"response");
};
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("图片仅允许JPG格式!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("图片大小不得超过2MB!");
    return false;
  }
  return true;
};
// 身份证正面上传
const handleAvatarSuccessCardF: UploadProps["onSuccess"] = (response,uploadFile) => {
    legal_card_front.value = URL.createObjectURL(uploadFile.raw!); //缩略图展示
    ruleForm.legal_card_front = response.msg;
};
const beforeAvatarUploadCardF: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("图片仅允许JPG格式!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("图片大小不得超过2MB!");
    return false;
  }
  return true;
};
// 身份证反面上传
const handleAvatarSuccessCardB: UploadProps["onSuccess"] = (response,uploadFile) => {
    legal_card_back.value = URL.createObjectURL(uploadFile.raw!); //缩略图展示
    ruleForm.legal_card_back = response.msg;
};
const beforeAvatarUploadCardB: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("图片仅允许JPG格式!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("图片大小不得超过2MB!");
    return false;
  }
  return true;
};


</script>

<template>
 <div class="h-screen" style='background:url(https://admin.yiwenyw.com/upload/carousel/20210911130850_245.jpg) fixed no-repeat center / cover'>
    <!-- title -->
    <!-- main -->
    <div class='w-fit mx-auto'>
        <div class="text-center text-3xl font-sans py-20 text-white">认证考试报名平台</div>
    <!-- card -->
    <el-card class="box-card m-auto">
      <template #header>
        <div class="card-header">
          <span>我的身份</span>
          <div>
            <!-- <el-button
              class="button"
              type="text"
              @click="dialogPerson = true"
              >创建新的机构</el-button
            > -->
             <el-button
              class="button"
              type="text"
              @click="dialogMenu = true"
              >{{institutionName?'新增校区':'认证'}}</el-button
            >
            <!-- <el-button class="button" type="text">账号设置</el-button> -->
            <el-button class="button" type="text" @click="logout"
              >退出登录</el-button
            >
          </div>
        </div>
      </template>
      <div  v-if='schoolList.length'>
      <div @click='this.$router.replace({path:"/",query: {id:"1"}})' class='cursor-pointer flex justify-between p-3 rounded-sm hover:bg-gray-100 '><div><i class='fa fa-institution text-gray-400'></i>&nbsp;{{institutionName}}</div>
       <div class='text-gray-400 text-xs '>进入</div>
     </div>
       <div v-for='(item,index) in schoolList'>
          <div class='cursor-pointer flex justify-between p-3 rounded-sm hover:bg-gray-100 '>
              <div><i class='fa fa-hospital-o text-gray-400'></i>&nbsp;{{item.title}} </div>
              <div class='text-gray-400 text-xs '>进入</div>
          
          </div>
        </div>
      </div>

      <div class='text-center' v-else>
        <p class='fa fa-search text-9xl text-center'></p>
        <p class='my-1  text-xs'>暂无查询到任何身份，请<span class='text-blue-500 cursor-pointer'  @click="dialogMenu = true">{{institutionName?'新增校区':'认证'}}</span></p>
        <p class='  text-xs'>或联系您的机构管理员，并将您的账号告知您的机构管理员.</p>
      </div>
      <!-- <div v-for="o in lists" :key="o" class="text item">
        {{ o.title }}
        <el-button class="button float-right" type="text" @click="jump(o.id)"
          >加入</el-button
        > 
         </div>-->
<!-- 选择认证 dialogMenu -->
<el-dialog v-model="dialogMenu" custom-class='dialogs'  title="选择身份">
  <div class='flex justify-between flex-wrap'>
  <el-card :class="[clickit==item.id?'border-orange-600':'']" class='text-center my-3 sign-box' shadow="hover"  v-for='(item,index) in signs' :key='index' @click='clickit=item.id'>
        <div> {{item.title}} </div>
         <div class='text-gray-400 text-xs'> {{item.desc}} </div>
      </el-card>
  </div>
        
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogMenu = false">取消</el-button>
          <el-button type="primary" class="bg-blue-500" @click="onCheck"
            >确定</el-button
           >
         </span>
    </template>
</el-dialog>      
        <!-- 个人认证 dialogPerson -->
        <el-dialog v-model="dialogPerson" custom-class='dialogs' title="个人认证">
          <el-form  ref="ruleFormRef" :model="ruleForm" :rules="rules" :label-width="formLabelWidth">
           <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="ruleForm.realname"  class="my-2"
                      placeholder="请输入真实姓名"/>
          </el-form-item>
           <el-form-item label="身份证号码" prop='idcard'>
              <el-input
                v-model="ruleForm.idcard"
                class="my-2"
                placeholder="请输入身份证号码"
              /> 
            </el-form-item>
            <el-form-item label="手机号" prop='mobile'>
              <el-input
                v-model="ruleForm.mobile"
                class="my-2"
                placeholder="请输入手机号"
              /> 
            </el-form-item>
            <el-form-item label="验证码" prop='smscode'>
              <el-row :gutter='10'>
              <el-col :span='12'>
                <el-input
                  v-model="ruleForm.smscode"
                  class="my-2"
                  style="width: auto"
                  placeholder="请输入验证码"
                /> 
                </el-col>
                <el-col :span='6'>
                <el-button  class="my-2 w-auto"  @click="!issend?send(time):''">{{sendText}}</el-button>
                </el-col>
                </el-row>
            </el-form-item>
          </el-form>

          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogPerson = false">取消</el-button>
              <el-button type="primary" class="bg-blue-500" @click="!ispersoncheck?onSubmit(ruleFormRef):''"
                >{{personEnter}}</el-button
              >
            </span>
          </template>
        </el-dialog>
        <!-- 企业认证 dialogInstitution-->
        <el-dialog v-model="dialogInstitution" custom-class='dialogs' title="机构认证">
          <el-form  ref="ruleFormRef1" :model="ruleForm1" :rules="rules1" :label-width="formLabelWidth">
            <el-form-item label="企业类别" prop='cate_id'>
                  <el-select v-model="ruleForm1.cate_id" placement='left-start' placeholder="请选择企业类别">
                  <el-option
                    v-for="item in cate_options"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id"
                  />
                </el-select>
                  </el-form-item> 
                <el-form-item label="机构名称(简称)"  prop='title'>
                  <el-input
                    v-model="ruleForm1.title"
                    autocomplete="off"
                    placeholder='请输入机构名称(简称)'
                  /> </el-form-item>
                <el-form-item label="机构名称(全称)"  prop='full_title'>
                  <el-input
                    v-model="ruleForm1.full_title"
                      placeholder='请输入机构名称(全称)'
                    autocomplete="off"
                  /> </el-form-item >
                <el-form-item
                  label="统一信用代码" prop='credit_code'
                  inline="false" >
                  <el-input
                    v-model="ruleForm1.credit_code"
                    autocomplete="off"
                    placeholder="请输入统一信用代码"
                  /> </el-form-item
              >
                <el-form-item
                  label="营业执照" 
                  inline="false"
                >
                  <el-upload
                    class="avatar-uploader"
                    :action="baseurl" 
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img
                      v-if="business_license"
                      :src="business_license"
                      class="avatar"
                    />
                    <el-icon v-else class="avatar-uploader-icon"
                      ><Plus
                    /></el-icon>
                  </el-upload> </el-form-item
              >
                <el-form-item
                  label="机构所在地区" prop='selectedOptions'           
                  inline="false"
                >
                  <el-cascader
                    placeholder="请选择地区"
                    size="default"
                    :options="regionData"
                    v-model="ruleForm1.selectedOptions"
                    @change="handleChange"
                  >
                  </el-cascader> </el-form-item  >
                <el-form-item
                  label="机构详细地址"  prop='address'                
                  inline="false" >
                  <el-input
                    v-model="ruleForm1.address"
                    autocomplete="off"
                    placeholder="请输入机构详细地址"
                  /> </el-form-item
              >
                <el-form-item label="法人代表" prop='legal_name'
                  inline="false" >
                  <el-input
                    v-model="ruleForm1.legal_name"
                    autocomplete="off"
                    placeholder="请输入法人代表姓名"
                  /> </el-form-item>
                <el-form-item
                  label="法人联系方式" prop='legal_mobile'
                  inline="false"
                >
                  <el-input
                    v-model="ruleForm1.legal_mobile"
                    autocomplete="off"
                    placeholder="请输入法人联系方式"
                  /> </el-form-item
              >
                <el-form-item
                  label="法人身份证号" prop='legal_card'
                  inline="false">
                  <el-input
                    v-model="ruleForm1.legal_card"
                    autocomplete="off"
                    placeholder="请输入法人身份证号"
                  /> </el-form-item>
                <el-form-item
                  label="法人身份证照片" 
                  inline="false"
                >
                  <el-upload
                    class="avatar-uploader"
                    :action="baseurl"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccessCardF"
                    :before-upload="beforeAvatarUploadCardF"
                  >
                    <img
                      v-if="legal_card_front"
                      :src="legal_card_front"
                      class="avatar"
                    />
                    <el-icon v-else class="avatar-uploader-icon"
                      >正面</el-icon>
                  </el-upload> 
                </el-form-item>
                   <el-form-item
                  label="" 
                  inline="false"
                >
                  <el-upload
                    class="avatar-uploader"
                    :action="baseurl"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccessCardB"
                    :before-upload="beforeAvatarUploadCardB"
                  >
                    <img
                      v-if="legal_card_back"
                      :src="legal_card_back"
                      class="avatar"
                    />
                    <el-icon v-else class="avatar-uploader-icon"
                      >背面</el-icon>
                  </el-upload> 
                 </el-form-item>
                 <el-form-item
                  label="公司网址" 
                  inline="false"
                >
                  <el-input
                    v-model="ruleForm1.website"
                    autocomplete="off"
                    placeholder="请输入公司网址"
                  /> </el-form-item
              >
                 <el-form-item
                  label="公司电话" prop='telphone'
                  inline="false"
                >
                  <el-input
                    v-model="ruleForm1.telphone"
                    autocomplete="off"
                    placeholder="请输入公司电话"
                  /> </el-form-item
              >
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogInstitution = false">取消</el-button>
              <el-button type="primary" class="bg-blue-500"  @click="!institutionCheck?onSubmit1(ruleFormRef1):''"
                >{{institutionEnter}}</el-button
              >
            </span>
          </template>
        </el-dialog>
    </el-card>
     <page-bottom/>
  </div> 
  </div>
</template>

<style lang='scss' scoped>
.card-header {display: flex;justify-content: space-between;align-items: center;}
.text {font-size: 14px;}
.item {margin-bottom: 18px;}
.box-card {width: 480px;}
.el-button--text {margin-right: 15px;}
.el-form{
  .el-input,.el-select {width: 300px;}
}
.sign-box{width:22vw;height:15vh}
.dialog-footer button:first-child {margin-right: 10px;}

/* avatar */
.avatar-uploader .avatar {width: 178px;height: 120px;display: block;}
.el-icon.avatar-uploader-icon {font-size: 28px;color: #8c939d;width: 178px;height: 120px;text-align: center;}

@media screen and (max-width: 480px) {
  .box-card {width: 100vw;}
  .sign-box{width:85vw;height:12vh}
  // select
  .el-form .el-input, .el-form .el-select {width: auto;}
  //area select
  .el-cascader-menu__wrap.el-scrollbar__wrap {width: 120px;}
  .el-cascader-menu{min-width: auto!important}

  .dialogs{width: 100%!important}
}
</style>