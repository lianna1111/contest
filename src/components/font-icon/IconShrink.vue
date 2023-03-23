<script setup lang="ts">
    import { ref } from 'vue';

    const isShrink = ref(true)
    const shrink = ()=>{
        isShrink.value = !isShrink.value
    }

    const props = withDefaults(defineProps<{
        size:number,
        margin:number
    }>(),{
        size:30,
        margin:15
    })
</script>

<template>
    <svg data-v-4e6f274c="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" :class="isShrink?'shrink':''" :style="'margin-top:'+margin+'px;'" @click="shrink">
        <path data-v-4e6f274c="" d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"></path>
    </svg>
</template>

<style scoped>
    svg{
        cursor: pointer;    
        outline: unset;
        transition-duration: 1s; 
    }
    .shrink{
        transform:rotateY(180deg);
        -ms-transform:rotateY(180deg); 	/* IE 9 */
        -moz-transform:rotateY(180deg); 	/* Firefox */
        -webkit-transform:rotateY(180deg); /* Safari 和 Chrome */
        -o-transform:rotateY(180deg); 	/* Opera */ 
    }
</style>