"use client"

import React from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useCallback } from 'react'
import {TbPhotoPlus} from 'react-icons/tb'


const ImageUploader = ({onChange, value}) => {


  const handleUpload = useCallback((result)=>{
    onChange(result.info.secure_url);
  },[onChange])


  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="tgrvasmq"
      options={{
        maxFiles: 1       
      }}
    >
      {({open}) => {
        return (
          <div onClick={()=> open?.()}
            className='relative cursor-pointer hover:opacity-70 transition 
            border-dashed border-[2px] p-20 border-neutral-300 flex flex-col justify-center 
            items-center gap-4 text-neutral-600'
          >
            <TbPhotoPlus size={50}/>
            <div className='font-semibold'>Click to upload</div>
            {value && (
              <div
                className='absolute inset-0 w-full h-full'
              >
                <Image
                  alt='upload'
                  fill
                  style={{objectFit: 'cover'}}
                  src={value}
                />

              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
    
)}

export default ImageUploader