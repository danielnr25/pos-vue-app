<script setup>
import { formatCurrency } from '@/helpers';
import DeleteIcon from './icons/DeleteIcon.vue';
import { UseCartStore } from '@/stores/cart';

const cart = UseCartStore();

defineProps({
    item:Object
})

</script>
<template>
    <li class="flex space-x-6 py-6 cursor-pointer">
    <img 
        :src="item.image"
        :alt="'Imagen de ' + item.name"
        class="h-32 w-24 flex-none rounded-md"
    />

    <div class="flex-auto space-y-2">
        <h3 class="text-gray-900 font-medium text-lg">{{ item.name }}</h3>
        <p>{{ formatCurrency(item.price) }}</p>

        <select 
            @change="cart.updateQuantity(item.id,$event.target.value)"
            :value="item.quantity"
            class="w-20 text-center p-1.5 rounded-lg bg-white">
            <option 
                v-for="n in cart.checkProductQuantity(item)"
                :value="n"
            >
            {{ n }}
            </option>
        </select>


    </div>

    <div class="mt-6">
        <button type="button" @click="cart.removeItem(item.id)">
           <DeleteIcon />
        </button>
    </div>
     
    </li>
</template>

