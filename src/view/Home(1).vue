<script setup lang="ts">
    import { ref } from 'vue'

    const pid = ref(1)
    const isCollapse = ref(false)
    const menuIndex = ref(0)
    const tags = ref([] as List[])

    // 传参接口
    interface List{
        ID:number,
        Title:string,
        Pic:string,
        Level:number,
        PID:number,
        Module:string,
        Number:number,
        Sort:number
    }

    const handleClose = (id:number) => {
        for(let i=0;i<tags.value.length;i++){
            if(tags.value[i].ID == id){
                tags.value.splice(i,1)
            }
        }
    }

    const handleClick = (event: MouseEvent)=>{
        const a_link = event.target as HTMLAnchorElement
        menuIndex.value = Number(a_link.getAttribute('currenttarget'))
    }

    const menu = [
        {ID:1,Title:'控制台',Pic:'box',Level:1,PID:0,Module:'',Number:3,Sort:1},
        {ID:2,Title:'基础',Pic:'bowl',Level:1,PID:0,Module:'',Number:2,Sort:2},
        {ID:3,Title:'用户',Pic:'brush',Level:1,PID:0,Module:'',Number:3,Sort:3},
        {ID:4,Title:'产品',Pic:'coin',Level:1,PID:0,Module:'',Number:5,Sort:4},
        {ID:5,Title:'网站',Pic:'dessert',Level:1,PID:0,Module:'',Number:3,Sort:5},

        {ID:6,Title:'系统设置',Pic:'watch',Level:2,PID:1,Module:'',Number:3,Sort:1},
        {ID:7,Title:'模块管理',Pic:'trophy',Level:2,PID:1,Module:'',Number:3,Sort:2},
        {ID:8,Title:'菜单管理',Pic:'timer',Level:2,PID:1,Module:'',Number:3,Sort:3},

        {ID:9,Title:'menu2_1',Pic:'Sugar',Level:2,PID:2,Module:'',Number:0,Sort:1},
        {ID:10,Title:'menu2_2',Pic:'MilkTea',Level:2,PID:2,Module:'',Number:0,Sort:2},

        {ID:11,Title:'menu3_1',Pic:'IceCream',Level:2,PID:3,Module:'',Number:0,Sort:1},
        {ID:12,Title:'menu3_2',Pic:'Grape',Level:2,PID:3,Module:'',Number:0,Sort:2},
        {ID:13,Title:'menu3_3',Pic:'Cherry',Level:2,PID:3,Module:'',Number:0,Sort:3},

        {ID:14,Title:'menu4_1',Pic:'Coffee',Level:2,PID:4,Module:'',Number:0,Sort:1},
        {ID:15,Title:'menu4_2',Pic:'Coordinate',Level:2,PID:4,Module:'',Number:0,Sort:2},
        {ID:16,Title:'menu4_3',Pic:'ColdDrink',Level:2,PID:4,Module:'',Number:0,Sort:3},
        {ID:17,Title:'menu4_4',Pic:'Bowl',Level:2,PID:4,Module:'',Number:0,Sort:4},
        {ID:18,Title:'menu4_5',Pic:'DataLine',Level:2,PID:4,Module:'',Number:0,Sort:5},

        {ID:19,Title:'menu5_1',Pic:'GobletFull',Level:2,PID:5,Module:'',Number:0,Sort:1},
        {ID:20,Title:'menu5_2',Pic:'Guide',Level:2,PID:5,Module:'',Number:0,Sort:2},
        {ID:21,Title:'menu5_3',Pic:'IceTea',Level:2,PID:5,Module:'',Number:0,Sort:3},

        {ID:22,Title:'系统设置',Pic:'',Level:3,PID:6,Module:'Setting',Number:0,Sort:1},
        {ID:23,Title:'menu1_1_2',Pic:'',Level:3,PID:6,Module:'Menu',Number:0,Sort:2},
        {ID:24,Title:'menu1_1_3',Pic:'',Level:3,PID:6,Module:'',Number:0,Sort:3},

        {ID:25,Title:'模块管理',Pic:'',Level:3,PID:7,Module:'Module',Number:0,Sort:1},
        {ID:26,Title:'行为管理',Pic:'',Level:3,PID:7,Module:'Handle',Number:0,Sort:2},
        {ID:27,Title:'menu1_2_3',Pic:'',Level:3,PID:7,Module:'',Number:0,Sort:3},

        {ID:28,Title:'菜单管理',Pic:'',Level:3,PID:8,Module:'Menu',Number:0,Sort:1},
        {ID:29,Title:'menu1_3_2',Pic:'',Level:3,PID:8,Module:'',Number:0,Sort:2},
        {ID:30,Title:'menu1_3_3',Pic:'',Level:3,PID:8,Module:'',Number:0,Sort:3}
    ]

    const left_menu = []
    Object.entries(menu).forEach((item,index)=>{
        left_menu.push(item)
    })

    const right_menu = [
        {ID:1,Title:'消息',Pic:'',Level:1,PID:0,Number:0,Sort:1},
        {ID:2,Title:'风格',Pic:'',Level:1,PID:0,Number:5,Sort:2},
        {ID:3,Title:'admin',Pic:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',Level:1,PID:0,Number:3,Sort:3},
        
        {ID:4,Title:'基础',Pic:'',Level:2,PID:2,Number:0,Sort:1},
        {ID:5,Title:'基础',Pic:'',Level:2,PID:2,Number:0,Sort:2},
        {ID:6,Title:'基础',Pic:'',Level:2,PID:2,Number:0,Sort:3},
        {ID:7,Title:'基础',Pic:'',Level:2,PID:2,Number:0,Sort:4},
        {ID:8,Title:'基础',Pic:'',Level:2,PID:2,Number:0,Sort:5},

        {ID:9,Title:'用户中心',Pic:'',Level:2,PID:3,Number:0,Sort:1},
        {ID:10,Title:'修改密码',Pic:'',Level:2,PID:3,Number:0,Sort:2},
        {ID:11,Title:'清除缓存',Pic:'',Level:2,PID:3,Number:0,Sort:3},
        {ID:12,Title:'退出登录',Pic:'',Level:2,PID:3,Number:0,Sort:4},
    ]

    const handleSelect = (key:string,path:string[])=>{
        pid.value = Number(key)
    }

    const changeMenu = (item:List)=>{
        const flag = tags.value.filter(obj=>obj.ID === item.ID).length > 0;
        menuIndex.value = item.ID

        if(!flag){
            tags.value.push(item)
        }
    }

    const removeTab = (id: number)=>{
        console.log(tags.value)
        for(let i=0;i<tags.value.length;i++){
            if(tags.value[i].ID == id){
                tags.value.splice(i,1)
            }
        }
    }
</script>

<template>
    <el-container class="h-screen">
        <el-aside width="auto" style="background-color: #1d1f25;">
            <div class="text-center mt-5 mb-5">
                <el-avatar :size="!isCollapse?'large':'small'" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                <h4 class="mt-1 text-ellipsis overflow-hidden" style="color: #bababc;" v-if="!isCollapse">admins</h4>
            </div>
            <el-scrollbar>
                <element-menu :items="menu" :pid="pid" class="el-menu-vertical" text-color="#bababc" active-text-color="#F30" :isCollapse="isCollapse" @changeMenu="changeMenu" />
            </el-scrollbar>
        </el-aside>
        <el-container class="bg-[#F5F5F5]">
            <el-header class="flex justify-between bg-white border-b">
                <element-menu default-active="1" mode="horizontal" :items="menu" :isPic="false" :isTop="true" @select="handleSelect">
                    <icon-shrink :size="23" :margin="18" @click="isCollapse = !isCollapse" />
                </element-menu>
                <element-menu background-color="unset" text-color="#303133" active-text-color="#409EFF" mode="horizontal" :items="right_menu"></element-menu>
            </el-header>
            <div class="px-5 py-3 bg-white" v-if="tags.length">
                <el-tag closable :type="tag.ID == menuIndex ? 'danger' : ''" v-for="tag in tags" :key="tag.ID" class="mr-2 p-4" @close="handleClose(tag.ID)" @click="handleClick">
                    <router-link :to="{name: tag.Module}" :currentTarget="tag.ID">{{tag.Title}}</router-link>
                </el-tag>
            </div>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
    .el-menu{
        border: unset;
        border-color: unset !important;
    }
    .el-menu-vertical:not(.el-menu--collapse) {
        width: 220px;
    }

</style>