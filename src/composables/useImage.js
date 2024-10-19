import {ref,computed} from 'vue';
import { useFirebaseStorage } from 'vuefire';
import {uid} from 'uid';
import { getDownloadURL, ref as storageRef, uploadBytesResumable } from 'firebase/storage';



export default function useImage(){

    const storage = useFirebaseStorage();
    const url = ref('');

    const onFileChange = (e) =>{
        const file = e.target.files[0];
        const filename = uid() + '.jpg';
        const sRef = storageRef(storage,'/products/'+filename);

        const uploadTask = uploadBytesResumable(sRef,file);

        uploadTask.on('state_changed',
        () =>{
            //se observa que el archivo se está subiendo o se encuentra en progreso
        },
        (error) => {
            console.log(error);
        },
        () =>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>{
                url.value = downloadUrl;
            })
        })
    }

    const urlComputed = computed(()=>{
        return url.value ? url.value : null;
    })


    return{
        url,
        onFileChange,
        urlComputed,
    }

}