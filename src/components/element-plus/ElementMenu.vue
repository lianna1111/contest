<script setup lang="ts">
const emit = defineEmits(["handleSelect", "changeMenu"]);
const handleSelect = (key: string, keyPath: string[]) => {
  emit("handleSelect", key, keyPath);
};
const changeMenu = (item: List) => {
  emit("changeMenu", item);
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

const props = withDefaults(
  defineProps<{
    pid?: number;
    isCollapse?: boolean;
    items: List[];
    isPic?: boolean;
    isTop?: boolean;
  }>(),
  {
    pid: 0,
    isCollapse: false,
    isPic: true,
    isTop: false,
    tcolor: "#eee",
  }
);
</script>

<template>
  <el-menu
    default-active="0"
    background-color="unset"
    text-color="tcolor"
    active-text-color="#409EFF"
    :collapse="isCollapse"
    :ellipsis="false"
    @select="handleSelect"
  >
    <slot />
    <template v-if="isTop">
      <template v-for="(item, index) in items" :key="item.ID">
        <el-menu-item :index="`${item.ID}`" v-if="item.Number == 0">
          <template #title
            ><router-link :to="{ name: item.Module }"
              ><span
                v-html="item.Title"
                @click="changeMenu(item)"
              ></span></router-link
          ></template>
        </el-menu-item>
      </template>
    </template>
    <!-- <template v-else>

      <el-menu-item index="2">
        <span>Navigator Two</span>
      </el-menu-item>
     
    </template> -->
  </el-menu>
</template>

<style scoped>
.el-menu-item.is-active,
.el-sub-menu .el-menu-item.is-active {
  background-color: unset !important;
}
.el-menu-item.is-active:hover,
.el-sub-menu .el-menu-item:hover {
  background-color: unset !important;
}

.el-menu-item:hover {
  background-color: unset !important;
  border-bottom: unset !important;
}
</style>