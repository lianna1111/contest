<template>
  <el-upload
    class="avatar-uploader"
    :action="baseurl"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

import type { UploadProps } from "element-plus";

import { baseURL } from "../../api/baseURL";
const baseurl = baseURL + "upload/path/campus";

const imageUrl = ref("");
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!); //缩略图展示
  //   form.xx=response.msg
  console.log(
    imageUrl.value,
    "imgurl",
    uploadFile,
    "uploadFile",
    response.msg,
    "response"
  );
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
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 120px;
  display: block;
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 120px;
  text-align: center;
}
</style>
