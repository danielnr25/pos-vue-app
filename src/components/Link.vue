<script setup>
    import { RouterLink } from 'vue-router';
    defineProps({
        ruta:{
            type:String,
        }
    })


</script>


<template>
    <RouterLink
        :to="{name:ruta}"
        class="text-white rounded-md font-bold px-10 py-2 bg-blue-800"
    >
        <slot></slot>
    </RouterLink>
</template>


