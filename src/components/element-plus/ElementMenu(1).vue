<script setup lang="ts">
    const emit = defineEmits(['handleSelect','changeMenu'])
    const handleSelect = (key: string, keyPath: string[]) => {
        emit('handleSelect',key,keyPath)
    }
    const changeMenu = (item:List)=>{
        emit('changeMenu',item)
    }

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

    const props = withDefaults(defineProps<{
        pid?:number,
        isCollapse?:boolean,
        items:List[],
        isPic?:boolean,
        isTop?:boolean
    }>(),{
        pid:0,
        isCollapse:false,
        isPic:true,
        isTop:false
    })
</script>

<template>
    <el-menu default-active="0" background-color="unset" text-color="#303133" active-text-color="#409EFF" :collapse="isCollapse" :ellipsis="false" @select="handleSelect">
        <slot />
        <template v-if="isTop">
            <template v-for="(item,index) in items" :key="item.ID">
                <el-menu-item :index="`${item.ID}`" v-if="item.PID == pid" v-html="item.Title"></el-menu-item>
            </template>
        </template>

        <template v-else>
            <template v-for="(item,index) in items" :key="item.ID">
                <template v-if="item.PID == pid">
                    <el-menu-item :index="`${item.ID}`" v-if="item.Number == 0">
                        <el-icon v-if="isPic && item.Pic">
                            <img :src="item.Pic" v-if="item.Pic.substring(0,4) == 'http'" />
                            <component :is="item.Pic" v-else />
                        </el-icon>
                        <template #title><span v-html="item.Title"></span></template>
                    </el-menu-item>
                    <el-sub-menu :index="`${item.ID}`" v-else>
                        <template #title>
                            <el-icon v-if="isPic && item.Pic">
                                <img :src="item.Pic" v-if="item.Pic.substring(0,4) == 'http'" />
                                <component :is="item.Pic" v-else />
                            </el-icon>
                            <span v-html="item.Title"></span>
                        </template>

                        <template v-for="(itm,indx) in items" :key="itm.ID">
                            <template v-if="itm.PID == item.ID">
                                <el-menu-item :index="`${itm.ID}`" v-if="itm.Number == 0">
                                    <el-icon v-if="isPic && itm.Pic">
                                        <img :src="itm.Pic" v-if="itm.Pic.substring(0,4) == 'http'" />
                                        <component :is="itm.Pic" v-else />
                                    </el-icon>
                                    <template #title><router-link :to="{name:itm.Module}"><span v-html="itm.Title" @click="changeMenu(itm)"></span></router-link></template>
                                </el-menu-item>
                                <el-sub-menu :index="`${itm.ID}`" v-else>
                                    <template #title>
                                        <el-icon v-if="isPic && itm.Pic">
                                            <img :src="itm.Pic" v-if="itm.Pic.substring(0,4) == 'http'" />
                                            <component :is="itm.Pic" v-else />
                                        </el-icon>
                                        <span v-html="itm.Title"></span>
                                    </template>
                                    <template v-for="(im,idx) in items" :key="im.ID">
                                        <el-menu-item :index="`${im.ID}`" v-if="im.PID == itm.ID">
                                            <span v-html="im.Title"></span>
                                        </el-menu-item>
                                    </template>
                                </el-sub-menu>
                            </template>
                        </template>

                    </el-sub-menu>
                </template>
            </template>
        </template>
    </el-menu>
</template>

<style scoped>

    .el-menu-item.is-active, .el-sub-menu .el-menu-item.is-active{
        background-color: unset !important;
    }
    .el-menu-item.is-active:hover, .el-sub-menu .el-menu-item:hover{
        background-color: unset !important;
    }

    .el-menu-item:hover{
        background-color: unset !important;
        border-bottom: unset !important;
    }
</style>