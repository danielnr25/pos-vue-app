<script setup>
import { reactive, watch } from 'vue';
import { useProductsStore } from '@/stores/products';
import { useFirestore,useDocument } from 'vuefire';
import useImage from '@/composables/useImage';
import { doc } from 'firebase/firestore';
import { useRoute,useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const products = useProductsStore();
const db = useFirestore();
const docRef = doc(db, 'products', route.params.id)
const product = useDocument(docRef);

const { onFileChange,urlComputed,url} = useImage();

const formData = reactive({
    name:"",
    image:"",
    category:"",
    price:"",
    stock:"",
})

watch(product,()=>{
    if(product.value){
        //formData.name = product.value.name
       Object.assign(formData,product.value)
    }else{
        router.push({name:'products'})
    }
})

const submitHandler = async (data) =>{
    try {
        await products.updateProduct(docRef,{...data,url})
        router.push({name:'products'})
    } catch (error) {
        console.log(error);
    }
}


</script>
<template>
    <div>
        <h1 class="text-3xl font-semibold my-8">Editar Producto</h1>
        <div class="flex justify-center bg-white shadow max-w-4xl mx-auto">
            <div class="mt-2 p-10 w-full 2xl:w-4/4">
                <FormKit 
                    type="form" 
                    submit-label="Guardar Cambios"
                    v-bind:value="formData"
                    @submit="submitHandler"
                    :actions="false"
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

                    <div v-if="urlComputed">
                        <p class="font-black">Imagen Nueva:</p>
                        <img :src="urlComputed" alt="Nueva imagen Producto" class="w-52" />
                    </div>

                    <div v-else>
                        <p class="font-black">Imagen Actual:</p>
                        <img
                            :src="formData.image"
                            :alt="'Imagen de' + formData.image"
                            class="w-52"
                        />
                    </div>

                    <FormKit
                        type="file"
                        name="image"
                        label="Cambiar de Imagen"
                        multiple="false"
                        accept=".jpg"
                        @change="onFileChange"
                    />


                    <FormKit type="submit">Guardar Cambios</FormKit>
                </FormKit>
            </div>
        </div>
    </div>
</template>


