"use client"

import Modal from './Modal'
import useSearchModal from '../../hooks/useSearchModal'
import {useRouter, useSearchParams} from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import qs from 'query-string'
import { formatISO } from 'date-fns'
import Heading from '../Heading'
import CountrySelect from '../inputs/CountrySelect'
import Calendar from '../inputs/Calendar'
import Counter from '../inputs/Counter'

const STEPS = {
    LOCATION: 0,
    Date: 1,
    INFO: 2
}


const SearchModal = ()=>{
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();
    const [location, setlocation] = useState()
    const [step, setstep] = useState(STEPS.LOCATION)
    const [guestCount, setguestCount] = useState(1)
    const [roomCount, setroomCount] = useState(1)
    const [bathroomCount, setbathroomCount] = useState(1)
    const [daterange, setdaterange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    const Map = useMemo(()=> dynamic(()=>import('../Map'),{
        ssr:false
    }),[location])



    const onBack = useCallback(()=>{
        setstep((value)=>value-1)
    },[])

    const onNext = useCallback(()=>{
        setstep((value)=>value+1)
    },[])


    console.log(params+'inSearchModal 48')

    const onSubmit = useCallback(async ()=>{
        if(step !==STEPS.INFO){
            return onNext();
        }

        let currentQuery = {}

        if(params){
            currentQuery = qs.parse(params.toString())
        }
    
        const updatedQuery = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        };
    
        console.log(location+'location.value in searchmodal')

        if(daterange.startDate){
            updatedQuery.startDate = formatISO(daterange.startDate)
            console.log(formatISO(daterange.startDate)+'in searchModal 73')
        }

        if(daterange.endDate){
            updatedQuery.endDate = formatISO(daterange.endDate)
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull:true})

        setstep(STEPS.LOCATION)
        searchModal.onClose();

        router.push(url)

    },[step,
        searchModal,
        location,
        router,
        guestCount,
        roomCount,
        bathroomCount,
        daterange,
        onNext,
        params
    ])


    const actionLabel = useMemo(()=>{
        if(step === STEPS.INFO){
            return 'Search'
        }
        return 'Next'
    },[step])

    const secondaryActionLabel = useMemo(()=>{
        if(step === STEPS.LOCATION){
            return undefined
        }
        return 'BACK'
    },[step])


    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading
                title="Where do you want to go?"
                subtitle="Find the perfect location for your stay!"
            />
            <CountrySelect
                value={location}
                onChange={(value)=>setlocation(value)}
            />
            <hr/>
            <Map
                center={location?.latlng}
            />

        </div>
    )

    if(step===STEPS.Date){
        bodyContent = (
            <div className='flex flex-col gap-8'>
            <Heading
                title="When do you plan to go?"
                subtitle="Make sure to get the most out of it!"
            />
            <Calendar
                value={daterange}
                onChange={(value)=>setdaterange(value.selection)}
            />
        </div>
        )
    }


    if(step===STEPS.INFO){
        bodyContent = (
            <div className='flex flex-col gap-8'>
            <Heading
                title="More Information"
                subtitle="Find your perfect place!"
            />
            <Counter
                title="Guests"
                subtitle="How many guests are coming?"
                value={guestCount}
                onChange={(value)=>setguestCount(value)}
            />
            <Counter
                title="Rooms"
                subtitle="How many rooms are you looking for?"
                value={roomCount}
                onChange={(value)=>setroomCount(value)}
            />
            <Counter
                title="Bathrooms"
                subtitle="How many bathrooms do you need?"
                value={bathroomCount}
                onChange={(value)=>setbathroomCount(value)}
            />
            </div>
        )
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filter"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            body={bodyContent}         
        />
    )
}

export default SearchModal 