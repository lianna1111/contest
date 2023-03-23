<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import * as echarts from 'echarts'
import { propsToAttrMap } from '@vue/shared';

    const style = ref('')
    const chart = ref()

    const props = defineProps({
        width:{type:String,default:'600'},
        height:{type:String,default:'300'},
        bgColor:{type:String,default:''},
        title:{type:String,default:''},
        name:{type:String,default:''},
        xAxis:{type:Array,default:[]},
        series:{type:Array,default:[]}
    })

    function init(){
        const myChart = echarts.init(chart.value)
        myChart.setOption({
            title:{text: props.title},
            xAxis:{data: props.xAxis},
            yAxis:{},
            series:[
                {name:props.name,type:'line',data:props.series}
            ]
        })
        
        window.addEventListener('resize',()=>{myChart.resize()})
    }

    onMounted(()=>{
        init()
    })
</script>

<template>
    <div ref="chart" :style="'width:'+(width.indexOf('%') != -1 ? width : Number(width)+'px') + ';height:'+(height.indexOf('%') != -1 ? height : Number(height)+'px')+';background-color:'+bgColor"></div>
</template>

<style lang="scss" scoped>

</style>