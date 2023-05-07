"use client"
import {AiOutlineMenu} from 'react-icons/ai'
import React, { useCallback, useState } from 'react'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import useRegisterModal from '../../hooks/useRegisterModal'
import useLoginModal from '../../hooks/useLoginModal'
import useRentModal from '../../hooks/useRentModal'
import {signOut} from 'next-auth/react'
import { useRouter } from 'next/navigation'

const UserMenu = ({currentUser}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const router = useRouter();
    const [isOpen, setisOpen] = useState(false)
    

    const toggleOpen = useCallback(()=>{
        setisOpen((isOpen)=>!isOpen)
    },[])


    const onRent = useCallback(()=>{
        if(!currentUser){
            //notice if you don't find the user logged in, you have to include
            //"return", not just loginModal.onOpen(), cause you want to force user
            // to log in first, and break the function code
            return loginModal.onOpen();
        }
        
        //if the user is logged in:
        rentModal.onOpen();
    },[currentUser, loginModal,rentModal])


  return (
    <div className='relative'>
        <div className=' flex flex-row items-center gap-3'>
            <div
                onClick={onRent}
                className='hidden md:block text-sm font-semibold py-3 px-4 
                rounded-full hover:bg-neutral-100 transition cursor-pointer'
            >
                Airbnd your home
            </div>
            <div
                onClick={toggleOpen}
                className=" p-4 md:py-1 md:px-2 border-[1px] border-neutral-100 flex flex-row 
                items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
            >
                <AiOutlineMenu/>
                <div className='hidden md:block'>
                    <Avatar src={currentUser?.image}/>
                </div>
            </div>
        </div>

        {isOpen && (
            <div
                className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden 
                right-0 top-12 text-sm z-50'
            >
                <div
                    className='flex flex-col cursor-pointer'
                >
                    {currentUser ? (
                        <>
                            <MenuItem onClick={()=>router.push('/trips')} label="My Trips"/>
                            <MenuItem onClick={()=>router.push('/favorites')} label="My Favorites"/>
                            <MenuItem onClick={()=>router.push("/reservations")} label="Reservations at my Properties"/>
                            <MenuItem onClick={()=>router.push('/properties')} label="My Properties"/>
                            <MenuItem onClick={rentModal.onOpen} label="Airbnb my home"/>
                            <MenuItem onClick={()=>signOut()} label="Logout"/>                        </>
                    ) : (
                        <>
                            <MenuItem onClick={registerModal.onOpen} label="Sign Up"/>
                            <MenuItem onClick={loginModal.onOpen} label="Login"/>
                        </>
                    )}                    
                </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu