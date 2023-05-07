"use client"
import {signIn} from "next-auth/react";
import React from 'react'
import axios from "axios"
import {AiFillGithub} from "react-icons/ai"
import {FcGoogle} from "react-icons/fc"
import { useCallback, useState } from 'react'
import {useForm} from 'react-hook-form'
import useRegisterModal from '../../hooks/useRegisterModal'
import useLoginModal from '../../hooks/useLoginModal'
import Modal from "./Modal"
import Heading from '../Heading'
import Input from '../inputs/Input'
import Button from '../Button'
import { toast } from 'react-hot-toast'
import {useRouter} from "next/navigation";

const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setisLoading] = useState(false)
  
    const {
        register,
        formState: {
            errors
        },
        handleSubmit
    } = useForm({
        defaultValues: {
            email:'',
            password:''
        }
    });

    const onSubmit = (data)=>{
        setisLoading(true);
        
        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback)=>{
            setisLoading(false)
            if(callback?.ok){
                toast.success("Successfully logged in!")
                router.refresh();
                loginModal.onClose();
            }
            if(callback?.error){
                toast.error(callback.error);
            }
        })
    }



    const onToggle = useCallback(()=>{
        loginModal.onClose();
        registerModal.onOpen();
    },[loginModal,registerModal])


    
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title="Welcome back!" subtitle="Login to your account"/>
            <Input 
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )


        const footerContent = (
            <div className='flex flex-col gap-2 mt-3'>
                <hr/>
                <Button
                    outline
                    label="Continue with Google"
                    icon={FcGoogle}
                    onClick={()=>signIn('google')}

                />
                <Button
                    outline
                    label="Continue with Github"
                    icon={AiFillGithub}
                    onClick={()=>signIn('github')}
                />
                <div
                    className='text-neutral-500 text-center mt-4 font-light'
                >
                    <div className='flex flex-row items-center gap-2 justify-center'>
                        <div>
                            Don't have an Account?
                        </div>
                        <div
                            onClick={onToggle}
                            className='text-neutral-800 cursor-pointer hover:underline'
                        >
                            SignUp
                        </div>
                    </div>

                </div>
            </div>
        )

    return (
    <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Continue"
        body={bodyContent}
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        footer={footerContent}
    />
  )
}

export default LoginModal