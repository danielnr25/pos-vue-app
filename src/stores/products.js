import { defineStore } from 'pinia'
import { useCollection, useFirestore } from 'vuefire'
import { collection, query, where, getDocs, orderBy, addDoc, getDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { computed, ref } from 'vue';
import { deleteObject } from 'firebase/storage';


export const useProductsStore = defineStore('products',()=>{

    // Implementar la lógica de negocio de este store de productos
    const hideDeleteModal = ref(false);
    // 1er traer el listado de productos
    const db = useFirestore();
    const selectedCategory = ref(1);

    const q = query(
        collection(db,'products'),
        orderBy('name'),
    );

    const productsCollection = useCollection(q); // consulta para traer el listado de productos


    // 2do creacion de categorias
    const categories = [
        {id:1, name:'Polos'},
        {id:2, name:'Zapatillas'},
        {id:3, name:'Relojes'},
        {id:4, name:'Carteras'},
    ]


    const categoryOptions = computed(()=>{
        const options = [
            {label: 'Seleccione',value:'',attrs:{disabled:true}},
            ...categories.map((category)=>({
                label:category.name,
                value:category.id
            }))

        ];
        return options;
    })

    // 3er paso registrar productos

    async function createProduct(product){ //product hace referencia a data que está en newProduct
        await addDoc(collection(db, "products"),product)
    }

    //4to paso editar producto
    async function updateProduct(docRef, product) { // Definimos una función para actualizar un producto en Firestore con el documento de referencia y el producto
        const { image, url, ...values } = product // Obtenemos la imagen, la URL y los valores del producto
  
  
        if (image.length) { // Si la imagen tiene una longitud
         
           await updateDoc(docRef, { // Actualizamos el documento con el documento de referencia y los valores del producto actualizados 
              ...values, // Obtenemos los valores del producto actualizados
              image: url.value // Obtenemos la URL de la imagen
           })
  
           //const imageRef = storageRef(storage, image) // Obtenemos la referencia de la imagen con el almacenamiento y la imagen
           //await deleteObject(imageRef) // Eliminamos la imagen del producto   
        } else {
           await updateDoc(docRef, values) // Actualizamos el documento con el documento de referencia y los valores del producto actualizados
        }
     }


    //5to paso eliminar producto

    async function deleteProduct(id) {
        const docRef = doc(db, 'products', id) // Obtenemos el documento de referencia con el ID del producto
        const docSnap = await getDoc(docRef)// Obtenemos el documento con el documento de referencia para eliminar el producto
        
        //const { image } = docSnap.data() // Obtenemos la imagen del documento del producto
        //const imageRef = storageRef(storage, image) // Obtenemos la referencia de la imagen con el almacenamiento y la imagen
  
        await Promise.all([ // Esperamos a que se completen todas las promesas para eliminar el producto y la imagen del producto
           deleteDoc(docRef), // Eliminamos el documento del producto
          // deleteObject(imageRef) // Eliminamos la imagen del producto
        ]);
  
        hideDeleteModal.value = false;
     }
  
     // 6to paso: coleccion de productos

     const noResults = computed(()=> productsCollection.value.length ===0)
     
     const filteredProducts = computed(() => {
        return productsCollection.value
           .filter( product => product.category === selectedCategory.value)
           .filter( product => product.stock > 0)
     });




    return {
        productsCollection,
        categories,
        categoryOptions,
        createProduct,
        deleteProduct,
        hideDeleteModal,
        updateProduct,
        selectedCategory,
        noResults,
        filteredProducts
    }

})