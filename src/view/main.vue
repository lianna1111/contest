<script lang="ts" setup>
// 引入useRoute,获取是route
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { storage } from "../plugin/storage";
const route = useRoute();
onMounted(() => {
  form.UserID = route.params.uid;
  if (!route.params.uid) {
    form.UserID = storage.get("uid");
  }
});

import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";

import type { UploadProps } from "element-plus";
import { ElMessage } from "element-plus";

const form = reactive({
  UserID: "",
  InstituteID: "",
  Logo: "",
  Pic: "",
  Title: "",
  Description: "",
  Picture: "",
  RegStartTime: "",
  RegEndTime: "",
  StartTime: "",
  EndTime: "",
  IsPublic: true,
  IsInvite: "",
  InviteCode: "",
  ProvinceID: "",
  CityID: "",
  DistrictID: "",
  Address: "",
  Longitude: "",
  Latitude: "",
  Content: "",
});
// dizhi
import { regionData } from "element-china-area-data";
const handleChange = (value) => {
  form.ProvinceID = value[0];
  form.CityID = value[1];
  form.DistrictID = value[2];
  // console.log(value);
};
//baseurl

import { baseURL } from "../api/baseURL";
const baseurl = baseURL + "upload/path/competition";
//logo
const Logo = ref("");
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  Logo.value = URL.createObjectURL(uploadFile.raw!);
  form.Logo = response.msg;
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
//头图
const Pic = ref("");
const handleAvatarSuccessPic: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  Pic.value = URL.createObjectURL(uploadFile.raw!);
  form.Pic = response.msg;
};
const beforeAvatarUploadPic: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("图片仅允许JPG格式!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("图片大小不得超过2MB!");
    return false;
  }
  return true;
};
//submit
import competition from "../api/competition";
const submit = () => {
  console.log(form, "form");
  if (form.IsPublic) {
    form.IsPublic = "1";
  } else {
    form.IsPublic = "0";
  }
  console.log(form.IsPublic, "form");

  competition
    .add(form)
    .then((res) => {
      console.log(res);
      if (res.data.errno == 0) {
        ElMessage.success("成功！");
        // router.push({ path: "/", query: { uid: uid } });
      } else {
        ElMessage.error(res.data.msg);
      }
    })
    .catch((res) => {
      console.log(res);
    });
};

// breadcrumb
const List = [{ name: "中国国际流行舞蹈协会", path: "/" }];
</script>

<template>
  <element-breadcrumb class="mb-2" :items="List"></element-breadcrumb>

  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>创建赛事</span>
      </div>
    </template>
    <!-- form start -->
    <el-form
      :model="form"
      label-width="120px"
      label-position="top"
      class="demo-ruleForm relative"
      size="small"
    >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="logo">
            <el-upload
              class="avatar-uploader"
              :action="baseurl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="Logo" :src="Logo" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="头图">
            <el-upload
              class="avatar-uploader"
              :action="baseurl"
              :show-file-list="false"
              :on-success="handleAvatarSuccessPic"
              :before-upload="beforeAvatarUploadPic"
            >
              <img v-if="Pic" :src="Pic" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 1 -->
      <el-divider>基本信息</el-divider>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="赛事名称" required>
            <el-input v-model="form.Title" type="textarea" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主办单位(id" required>
            <el-input v-model="form.InstituteID" type="textarea" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="赛事描述" required>
            <el-input v-model="form.Description" type="textarea" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="比赛时间" required>
            <el-row :gutter="10" class="flex justify-center">
              <el-col :span="12"
                ><el-date-picker
                  type="date"
                  v-model="form.StartTime"
                  placeholder="开始时间"
                />
              </el-col>
              <el-col :span="12">
                <el-date-picker
                  v-model="form.EndTime"
                  type="date"
                  placeholder="结束时间"
                />
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="所属地区" required>
            <el-cascader
              placeholder="请选择地区"
              size="small"
              :options="regionData"
              v-model="selectedOptions"
              @change="handleChange"
              style="width: 100%"
            >
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="场馆完整地址" required>
            <el-input v-model="form.Address" type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="场馆位置gps">
            <el-col :span="12"
              ><el-input
                v-model="form.Longitude"
                type="text"
                placeholder="经度"
            /></el-col>
            <el-col :span="12"
              ><el-input v-model="form.Latitude" type="text" placeholder="纬度"
            /></el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 2 -->
      <el-divider>报名设置</el-divider>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="报名时间" required>
            <el-row :gutter="10" class="flex justify-center">
              <el-col :span="12"
                ><el-date-picker
                  v-model="form.RegStartTime"
                  type="date"
                  placeholder="开始时间"
                />
              </el-col>
              <el-col :span="12">
                <el-date-picker
                  v-model="form.RegEndTime"
                  type="date"
                  placeholder="结束时间"
                />
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="公开赛事">
            <el-switch v-model="form.IsPublic" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邀请码" prop="desc">
            <el-radio-group v-model="form.null">
              <el-radio :label="3">不使用</el-radio>
              <el-radio :label="6">公共</el-radio>
              <el-radio :label="9">独立</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="可以无需邀请码参加">
            <el-radio-group v-model="form.IsInvite">
              <el-radio :label="1">允许</el-radio>
              <el-radio :label="0">不允许</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="审核">
            <el-radio-group v-model="form.null">
              <el-radio :label="3">均无需审核</el-radio>
              <el-radio :label="6">通过邀请码需要审核</el-radio>
              <el-radio :label="9">均需要审核</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="报名负责人（需展示在报名页面，每行填写一个）">
            <el-input v-model="form.null" type="textarea" /> </el-form-item
        ></el-col>
      </el-row>
      <el-form-item label="报名公告">
        <el-input v-model="form.null" type="textarea" />
      </el-form-item>
      <!-- 3-->
      <el-divider>通知设置（审核提示，新代表队参赛提示）</el-divider>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="邮箱通知">
            <el-input v-model="form.null" placeholder="支持最多5个邮箱" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="短信通知">
            <el-input
              v-model="form.null"
              placeholder="支持最多3个大陆手机号，用（，）分隔"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 4 -->
      <el-divider>规程信息</el-divider>
      <el-form-item label="">
        <el-input v-model="form.null" />
      </el-form-item>
      <!-- 5 -->
      <el-divider>报名验证</el-divider>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="年龄验证基准时间" prop="date1">
            <el-date-picker
              v-model="form.null"
              type="date"
              placeholder="Pick a date"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="强制验证身份证年龄">
            <el-switch v-model="form.null" />开启所有组别强制验证身份信息
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 6 -->
      <el-divider>成绩查询</el-divider>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="现场负责人">
            <el-input v-model="form.null" type="textarea" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成绩查询公告">
            <el-input v-model="form.null" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="bg-white fixed bottom-0 left-0 z-10 h-10 w-screen">
        <el-col :offset="20">
          <el-button type="primary" @click="submit" class="bg-blue-500"
            >保存</el-button
          ></el-col
        >
      </div>
    </el-form>
    <!-- form end -->
  </el-card>
  <page-bottom></page-bottom>
</template>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100%;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
