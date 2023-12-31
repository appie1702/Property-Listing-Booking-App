"use client"

import React from 'react'
import axios from "axios"
import {AiFillGithub} from "react-icons/ai"
import {FcGoogle} from "react-icons/fc"
import { useCallback, useState } from 'react'
import {useForm} from 'react-hook-form'
import useRegisterModal from '../../hooks/useRegisterModal'
import Modal from "./Modal"
import Heading from '../Heading'
import Input from '../inputs/Input'
import Button from '../Button'
import { toast } from 'react-hot-toast'
import useLoginModal from '../../hooks/useLoginModal'
import {signIn} from 'next-auth/react'


const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal  = useLoginModal();
    const [isLoading, setisLoading] = useState(false)
  
    const {
        register,
        formState: {
            errors
        },
        handleSubmit
    } = useForm({
        defaultValues: {
            name:'',
            email:'',
            password:''
        }
    });

    const onSubmit = (data)=>{
        console.log("request sent");
        setisLoading(true);
        axios.post('/api/register',data).then(()=>{
            toast.success("Account successfully registered!");
            registerModal.onClose();
            loginModal.onOpen();
        }).catch((error)=>{
            toast.error("Either invalid credentials or the user already exists.")
        }).finally(()=>{
            setisLoading(false)
        })
    }


    const onToggle = useCallback(()=>{
        registerModal.onClose();
        loginModal.onOpen();
    },[loginModal,registerModal])


    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title="Welcome to Homify" subtitle="Create an Account"/>
            <Input 
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="name"
                label="Name"
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
                            Already have an Account?
                        </div>
                        <div
                            onClick={onToggle}
                            className='text-neutral-800 cursor-pointer hover:underline'
                        >
                            Login
                        </div>
                    </div>

                </div>
            </div>
        )

    return (
    <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        body={bodyContent}
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        footer={footerContent}
    />
  )
}

export default RegisterModal