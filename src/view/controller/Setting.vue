<script setup lang="ts">
    const field = ['id','date','name','address']
    const comment = ['ID','日期','名称','地址']
    const relation = [{id:1,title:'系统设置',url:''}]
    const total = 100
    const hand:string[] = []
    const tableData = [
    {
        id: 1,
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 2,
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 3,
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 4,
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    ]
</script>

<template>
    <element-controller :field="field" :comment="comment" :tableData="tableData" :relation="relation" :total="total" :hand="hand"></element-controller>
</template>

<style scoped>
    
</style>