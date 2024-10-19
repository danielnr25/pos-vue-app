<script setup>
import { reactive } from 'vue';
import { useProductsStore } from '@/stores/products';
import useImage from '@/composables/useImage';
import { useRouter } from 'vue-router';

const products = useProductsStore();

const { onFileChange,urlComputed,url} = useImage();

const router = useRouter();

const formData = reactive({
    name:"",
    image:"",
    category:"",
    price:"",
    stock:"",
})

const submitHandler = async (data) =>{
   const {image,...values} = data;

   try {
        await products.createProduct({
            ...values,
            image:url.value,
        })

        router.push({name:'products'})
    
   } catch (error) {
        console.log(error);
        //alert(error);
   }

}


</script>
<template>
    <div>
        <h1 class="text-3xl font-semibold my-8">Nuevo Producto</h1>
        <div class="flex justify-center bg-white shadow max-w-4xl mx-auto">
            <div class="mt-2 p-10 w-full 2xl:w-4/4">
                <FormKit 
                    type="form" 
                    submit-label="Agregar Producto"
                    :value="formData"
                    @submit="submitHandler"
                >
                    
                    <FormKit
                        type="text"
                        name="name"
                        label="Nombre"
                        placeholder="Nombre del producto"
                        validation="required"
                        v-bind:validation-messages="{
                            required: 'El nombre del producto es obligatorio.'
                        }"
                        v-model.trim="formData.name"
                    />
                        
                    <FormKit
                        type="file"
                        name="image"
                        label="Imagen del Producto"
                        validation="required"
                        accept=".jpg"
                        v-bind:validation-messages="{
                            required: 'La imagen del producto es obligatoria.'
                        }"
                        @change="onFileChange"
                        v-model.trim="formData.image"
                    />

                    <div v-if="urlComputed">
                        <p class="text-sm font-semibold">Imagen seleccionada:</p>
                        <img v-bind:src="urlComputed" class="w-40 h-40 object-cover rounded-md" :alt="urlComputed" />
                    </div>

                    <FormKit
                        type="select"
                        name="category"
                        label="Categoria"
                        validation="required"
                        :options="products.categoryOptions"
                        v-bind:validation-messages="{
                            required: 'La categoria de producto es obligatoria.'
                        }"
                        v-model.number="formData.category"
                    />

                       
                    <FormKit
                        type="number"
                        name="price"
                        label="Precio"
                        placeholder="Precio del producto"
                        validation="required"
                        v-bind:validation-messages="{
                            required: 'El precio del producto es obligatorio.'
                        }"
                        min="1"
                        v-model.number="formData.price"
                    />

                    <FormKit
                        type="number"
                        name="stock"
                        label="Stock"
                        placeholder="Stock del producto"
                        validation="required"
                        v-bind:validation-messages="{
                            required: 'El stock del producto es obligatorio.'
                        }"
                        min="1"
                        v-model.number="formData.stock"
                    />

                </FormKit>
            </div>
        </div>
    </div>
</template>


