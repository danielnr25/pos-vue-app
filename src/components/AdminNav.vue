<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import HomeIcon from '@/components/icons/HomeIcon.vue';
import SaleIcon from '@/components/icons/SaleIcon.vue';
import ProductIcon from '@/components/icons/ProductIcon.vue';

const route = useRoute();
const collapsed = ref(false);
const isLinkActive = (name) => route.name === name;

const toggleCollapse = () => {
  collapsed.value = !collapsed.value; // esto se convierte a un true.
};

const sizeClass = computed(() => (collapsed.value ? 'px-3' : ''));

</script>

<template>
  <aside :class="['transition-all duration-300', collapsed ? 'w-20' : 'w-64', 'flex flex-col min-h-screen px-4 py-6 overflow-y-auto border-r rtl:border-r-0 rtl:border-l bg-gray-800 text-white border-gray-400']">
    <div class="mb-6">
      <button @click="toggleCollapse" class="focus:outline-none flex items-center justify-center w-full">
        <svg v-if="collapsed" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h18m-6-6h6m-6 12h6" />
        </svg>
        <div v-else class="flex items-center justify-between w-full">
          <span class="text-xl font-bold">Dashboard</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </button>
    </div>
    
    <!-- Navigation -->
    <div class="flex flex-col flex-1 space-y-4">
      <nav class="space-y-2">
        
        <RouterLink :to="{ name: 'shop' }" class="relative flex items-center px-3 py-2 rounded-lg dark:text-gray-200 transition-all duration-300 hover:bg-gray-700 hover:text-gray-200"
          :class="{'bg-blue-700 text-white': isLinkActive('shop'), 'justify-center': collapsed}">
          <HomeIcon :collapsed="collapsed" />
          <span :class="[collapsed ? 'hidden' : 'ml-3']">Inicio</span>
          <div v-if="isLinkActive('shop')" class="absolute left-0 w-1 h-full bg-blue-700 rounded-r-lg"></div>
        </RouterLink>

        <RouterLink :to="{ name: 'sales' }" class="relative flex items-center px-3 py-2 rounded-lg dark:text-gray-200 transition-all duration-300 hover:bg-gray-700 hover:text-gray-200"
          :class="{'bg-blue-700 text-white': isLinkActive('sales'), 'justify-center': collapsed}">
          <SaleIcon :collapsed="collapsed" />
          <span :class="[collapsed ? 'hidden' : 'ml-3']">Ventas</span>
          <div v-if="isLinkActive('ventas')" class="absolute left-0 w-1 h-full bg-blue-700 rounded-r-lg"></div>
        </RouterLink>
        <RouterLink :to="{ name: 'products' }" class="relative flex items-center px-3 py-2 rounded-lg dark:text-gray-200 transition-all duration-300 hover:bg-gray-700 hover:text-gray-200"
          :class="{'bg-blue-700 text-white': isLinkActive('products'), 'justify-center': collapsed}">
          <ProductIcon :collapsed="collapsed" />
          <span :class="[collapsed ? 'hidden' : 'ml-3']">Productos</span>
          <div v-if="isLinkActive('products')" class="absolute left-0 w-1 h-full bg-blue-700 rounded-r-lg"></div>
        </RouterLink>
      </nav>
    </div>
  </aside>
</template>
