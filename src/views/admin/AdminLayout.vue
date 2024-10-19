
<script setup>
import AdminNav from '@/components/AdminNav.vue';


</script>

<template>
    <div class="flex  bg-gray-100">
        <AdminNav/>
        <div class="flex-1 p-8">
            <RouterView/>
        </div>
    </div>
</template>
