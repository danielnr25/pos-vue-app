<script setup>
    import Product from '@/components/Product.vue';
    import { useProductsStore } from '@/stores/products';
    import Link from '@/components/Link.vue';
    const products = useProductsStore();
</script>

<template>
    <div>
        <Link ruta="new-product">Nuevo Producto</Link>
        <div class="flex lg:my-8 my-6 justify-between">
            <h1 class="lg:text-3xl text-lg font-bold">Listado de Productos</h1>
        </div>

        <div role="list" class="grid grid-cols gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">   
            <Product 
                v-for="product in products.productsCollection"
                :key="product.id"
                :product="product"
            />
        </div>

    </div>
</template>
