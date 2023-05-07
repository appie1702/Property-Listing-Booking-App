"use client"

import React, { useCallback } from 'react'
import {useRouter, useSearchParams} from 'next/navigation';
import qs from "query-string";

const CategoryBox = ({icon:Icon,label,selected}) => {
  
    const router = useRouter();
    const params = useSearchParams();


    const handleClick = useCallback(()=>{
        let currentQuery = {};

        if(params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedquery = {
            ...currentQuery,
            category: label
        }

        if(params?.get('category') === label){
            delete updatedquery.category;
        }

        const url = qs.stringifyUrl({
            url:'/',
            query:updatedquery,
        }, { skipNull:true })

        router.push(url);
    },[label, params, router])


    return (
    <div
        onClick={handleClick}
        className={`flex flex-col items-center justify-center gap-2  p-3 border-b-2 hover:text-neutral-800 transition 
        cursor-pointer ${selected ? "border-b-neutral-800 text-neutral-800":"border-transparent text-neutral-500"}`}
    >
        <Icon size={20}/>
        <div className='font-medium text-sm'>{label}</div>
    </div>
  )
}

export default CategoryBox