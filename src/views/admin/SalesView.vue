<script setup>
import VueTailwindDatePicker from 'vue-tailwind-datepicker';
import { formatCurrency } from '@/helpers';
import { useSaleStore } from '@/stores/sales';
import { ref } from 'vue';
import SalesDetails from '@/components/SalesDetails.vue';

const sales = useSaleStore();


const formatoDate = ref({
    date: "DD/MM/YYYY",
    month: "MMMM"
})

</script>

<template>
    <div class="px-10 lg:px-0">
        <h1 class="text-3xl font-semibold my-8">Ventas</h1>
        <div class="md:flex md:items-start gap-5">
            <div  class="md:w-1/2 lg:w-1/3 bg-white flex justify-center p-5 rounded-md shadow-xl">
                <VueTailwindDatePicker
                    i18n="es"
                    as-single
                    no-input
                    v-model="sales.date"
                    :formatter="formatoDate"
                />
            </div>
            <div  class="md:w-1/2 lg:w-2/3 space-y-5 lg:h-screen lg:overflow-y-scroll p-5 pb-32">
                <p
                    v-if="sales.isDateSelected"
                >Venta de la fecha
                    <span class="font-black">{{ sales.date }}</span>
                </p>
                <p v-else class="text-lg text-gray-800 font-semibold">
                    Selecciona una fecha
                </p>

                <div v-if="sales.salesCollection.length" class="space-y-5">
                    <p  class="text-center text-2xl lg:text-right">
                        Total del día:
                        <span class="font-black text-blue-800">
                            {{ formatCurrency(sales.totalSalesOfDay) }}
                        </span>
                    </p>

                    <SalesDetails 
                        v-for="sale in sales.salesCollection"
                        :key = "sale.id"
                        :sale="sale"
                    />


                </div>


                <p v-else-if="sales.noSales" class="text-xl text-center font-semibold text-blue-900">No hay ventas en esta fecha</p>
            </div>
        </div>
    </div>

</template>