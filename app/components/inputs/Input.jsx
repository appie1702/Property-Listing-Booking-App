"use client"

import React from 'react'
import {BiRupee} from 'react-icons/bi'
const Input = ({id,label, type="text", disabled, formatPrice, required, register, errors}) => {
  return (
    <div className='w-full relative'>
      {formatPrice && (
        <BiRupee
          size={24}
          className=' text-neutral-700 absolute top-5 left-2'
        />
      )}

      {/* placeholder=" " <= spacebar...to use label placeholder peer shown property*/}
      <input 
        id={id} 
        disabled={disabled}
        required={required}
        {...register(id, {required})}
        placeholder=' '
        type={type}
        className={` peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md 
        outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
        ${formatPrice ? 'pl-9':'pl-4'}
        ${errors[id] ? "border-rose-500 focus:border-rose-500":"border-neutral-300 focus:border-black"}
        `}
      />
      {/*  understand the classes carefully below */}
      <label
        className={` absolute text-md duration-150 transform scale-95 -translate-y-3 top-5 z-10 origin-[0]
        ${formatPrice ? 'left-9':'left-4'}
         peer-placeholder-shown:scale-95 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
        ${errors[id] ? 'text-rose-500':'text-zinc-400'}
         `}
      >{label}</label>
    </div>
  )
}

export default Input