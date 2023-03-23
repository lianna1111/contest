<script setup lang="ts">
import { ref } from "vue";

import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

import { onMounted } from "vue";
import { url } from "inspector";

import { storage } from "../plugin/storage";
import { checkLogin } from "../util/main";


const route = useRoute();
const router = useRouter();
const username = checkLogin().username

let menutype: number;
onMounted(() => {
  // console.log(route.params.iid);
});
// if (!route.params.iid) {
//   route.params.iid = storage.get("iid");
// }

if (route.query.id) {
  console.log(route.query.id);
  
}


const close = () => {
  router.push("/msg");
};

// 传参接口
interface List {
  ID: number;
  Title: string;
  Pic: string;
  Level: number;
  PID: number;
  Module: string;
  Number: number;
  Sort: number;
}

const menu = [
  {
    ID: 1,
    Title: "首页",
    Pic: "box",
    Level: 1,
    PID: 0,
    Module: "Main",
    Number: 0,
    Sort: 1,
  },
  {
    ID: 2,
    Title: "赛事",
    Pic: "bowl",
    Level: 1,
    PID: 0,
    Module: "game",
    Number: 0,
    Sort: 2,
  },
  {
    ID: 3,
    Title: "机构设置",
    Pic: "brush",
    Level: 1,
    PID: 0,
    Module: "imsg",
    Number: 0,
    Sort: 3,
  },
];
const menu1 = [
  {
    ID: 1,
    Title: "首页",
    Pic: "box",
    Level: 1,
    PID: 0,
    Module: "gMain",
    Number: 0,
    Sort: 1,
  },
  {
    ID: 2,
    Title: "选手",
    Pic: "bowl",
    Level: 1,
    PID: 0,
    Module: "player",
    Number: 0,
    Sort: 2,
  },
  {
    ID: 3,
    Title: "我的代表队",
    Pic: "brush",
    Level: 1,
    PID: 0,
    Module: "myteam",
    Number: 0,
    Sort: 3,
  },
  {
    ID: 4,
    Title: "查找赛事",
    Pic: "brush",
    Level: 1,
    PID: 0,
    Module: "search",
    Number: 0,
    Sort: 3,
  },
  {
    ID: 5,
    Title: "机构设置",
    Pic: "brush",
    Level: 1,
    PID: 0,
    Module: "imsg",
    Number: 0,
    Sort: 3,
  },
];
const top_menu = [];

const sign = storage.get("sign");
if (sign == 1) {
  Object.entries(menu).forEach((item, index) => {
    top_menu.push(item[1]);
  });
} else  {
  Object.entries(menu1).forEach((item, index) => {
    top_menu.push(item[1]);
  });
}
</script>

<template>
  <el-container class="h-screen">
    <el-container class="bg-[#F5F5F5]">
      <el-header class="flex justify-between bg-black text-white border-b">
        <element-menu
          default-active="1"
          mode="horizontal"
          :items="top_menu"
          :isPic="false"
          :isTop="true"
          @select="handleSelect"
        >
        </element-menu>
        <div class="m-5 text-sm">
        {{username}} <i @click="close" class="fa fa-reply-all"></i>
        </div>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.el-menu {
  border: unset;
  border-color: unset !important;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 220px;
}
</style>

              
