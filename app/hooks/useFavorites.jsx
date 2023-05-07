import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback,useMemo } from 'react';
import {toast} from 'react-hot-toast'

import useLoginModal from './useLoginModal'

const useFavorite = ({listingId,currentUser}) => {
    
    
    const router = useRouter();
    const loginModal = useLoginModal();
    
    const favorited = useMemo(()=>{
        const list = currentUser?.favoritesIds || [];
        return list.includes(listingId)
    },[currentUser,listingId])


    const toggleFavorite = useCallback(async (e) =>{
        e.stopPropagation()

        console.log(currentUser+'===-=-=-=-')

        if(!currentUser){
            return loginModal.onOpen();
        }

        try{
            let request;

            if(favorited){
                request = ()=>axios.delete(`/api/favorites/${listingId}`)
            }else {
                request = ()=>axios.post(`/api/favorites/${listingId}`)
            }

            await request();
            router.refresh();
            toast.success("Success");

        } catch(error){
            toast.error("Something went wrong")
        }
   },[currentUser,listingId,favorited,loginModal,router])

    return {
        favorited,
        toggleFavorite
    }
}

export default useFavorite;