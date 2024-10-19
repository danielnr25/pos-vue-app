import { defineStore } from "pinia";
import { useFirestore,useCollection} from "vuefire";
import { collection, query,where } from "firebase/firestore";
import { computed,ref } from "vue";

export const useSaleStore = defineStore('sales',()=>{

   const date = ref(''); // Creamos una referencia reactiva date que es un string vacío que contendrá la fecha de la venta
   const db = useFirestore(); // Instanciamos el store de Firestore

   const salesSource = computed(( ) =>{ // Creamos una computada salesSource que se encarga de obtener las ventas de Firestore
      if(date.value){ // Si la fecha de la venta está seleccionada
         const q = query( // Creamos una consulta con la colección de ventas y la fecha de la venta
            collection(db,'sales'), // Obtenemos la colección de ventas
            where('date','==',date.value) // Obtenemos las ventas con la fecha de la venta
         )
         return q // Retornamos la consulta
      }
   })

   const salesCollection = useCollection(salesSource) // Obtenemos las ventas de Firestore

   const isDateSelected = computed(()=>date.value);  // Creamos una computada isDateSelected que se encarga de validar si la fecha de la venta está seleccionada

   const noSales = computed(() => !salesCollection.length && date.value); // Creamos una computada noSales que se encarga de validar si no hay ventas y la fecha de la venta está seleccionada

   const totalSalesOfDay = computed(()=>{
      return salesCollection.value ? salesCollection.value.reduce((total, sale) => total + sale.total,0) : 0
   }) // Creamos una computada totalSalesOfDay que se encarga de obtener el total de las ventas del día

   return {
      date,
      isDateSelected,
      salesCollection,
      noSales,
      totalSalesOfDay
   }
})