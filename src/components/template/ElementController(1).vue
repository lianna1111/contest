<script setup lang="ts">
    import { ref,reactive } from 'vue'

    const dataKey = ref([])
    const formData = reactive({keyword: '',page:1,pagesize:10})

    const onSubmit = () => {
        console.log(formData)
    }

    interface Props{
        field:string[],
        comment:string[],
        total:number,
        tableData:[],
        relation:[{id:number,title:string,url?:string}],
        hand:string[]
    }

    const props = withDefaults(defineProps<Props>(),{
        total:0
    })

    const handleSizeChange = (val: number)=>{
        formData.page = val
        console.log(`${val} items per page`)
        onSubmit()
    }

    const handleCurrentChange = (val: number)=>{
        formData.page = val
        console.log(`current page: ${val}`)
        onSubmit()
    }
</script>

<template>
    <el-container class="h-full bg-white">
        <el-header class="flex justify-between border-b py-4">
            <div class="flex justify-center items-center">
                <el-icon class="rotate-90 text-xl text-red-500"><SemiSelect /></el-icon>
                <el-link :href="item.url" target="_blank" v-for="(item,index) in relation" :key="index">{{item.title}}</el-link>
            </div>
            <div>
                <el-button type="primary" plain>新增</el-button>
            </div>
        </el-header>
        <div class="search mx-5 pt-4 bg-white">
            <el-form :inline="true" :model="formData" size="large" class="demo-form-inline">
                <el-form-item label="关键词">
                    <el-input v-model="formData.keyword" placeholder="关键词" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-main class="pt-0">
            <el-table :data="tableData" border stripe class="w-full">
                <template v-for="(item,index) in field" :key="index">
                    <el-table-column :prop="item" :label="comment[index]" />
                </template>
            </el-table>
            <div class="flex justify-between py-5">
                <div>
                    <el-button plain>刷新</el-button>
                    <el-button type="primary" plain>新增</el-button>
                    <el-button type="success" plain>删除</el-button>
                    <el-button type="info" plain>导入</el-button>
                    <el-button type="warning" plain>导出</el-button>
                    <el-button type="warning" plain>打印</el-button>
                    <el-button type="warning" plain>审核</el-button>
                    <el-button type="warning" plain>核准</el-button>
                    <el-button type="danger" plain>清空</el-button>
                    <el-button type="danger" plain>返回</el-button>
                </div>
                <el-pagination v-model:currentPage="formData.page" :page-size="formData.pagesize" background layout="total,prev, pager, next" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
        </el-main>
    </el-container>
</template>

<style scoped>
    .el-link{margin-right: 15px;}
    .el-link:not(:first-child){
        margin-left: 15px;
    }
</style>