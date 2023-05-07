"use client"
import React, { useMemo, useState } from 'react'
import Modal from './Modal'
import useRentModal from '../../hooks/useRentModal'
import Heading from '../Heading'
import { categories } from '../navbar/Categories'
import CategoryInput from '../inputs/CategoryInput'
import { useForm } from 'react-hook-form'
import CountrySelect from '../inputs/CountrySelect'
import dynamic from 'next/dynamic'
import Counter from '../inputs/Counter'
import ImageUploader from '../inputs/ImageUploader'
import Input from '../inputs/Input'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
//leaflet is not compatible with react so we have to find a get away.
//import Map from '../Map' -- wrong


const STEPS = {
    CATEGORY :  0,
    LOCATION: 1,
    INFO : 2,
    IMAGES : 3,
    DESCRIPTION : 4,
    PRICE : 5

}

const RentModal = () => {
    const rentModal = useRentModal();
    const [step, setstep] = useState(STEPS.CATEGORY);
    const [isLoading, setisLoading] = useState(false)
    const router = useRouter();
    

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        },
        reset
    } = useForm({
        defaultValues:{
        category:'',
        location:null,
        guestCount:1,
        roomCount:1,
        bathroomCount:1,
        imageSrc:'',
        price:1,
        title:'',
        desc:''
        }
    });

    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc')


    console.log(guestCount)
    console.log(category)
    //whenever the location changes , we are re rendering this map module
    //note that we have we have put in below code after 
    //initialising location variable, cause we have to use it below
    const Map = useMemo(()=> dynamic(()=>import('../Map'),{
        ssr:false
    }),[location])



    //setvalue will change the value but doesn't re-render the component
    //thats why we have to make a custom setvalue
    const setCustomValue = (id,value) =>{
        setValue(id,value,{
            shouldDirty:true,
            shouldValidate:true,
            shouldTouch:true
        })
    }


    const onBack = ()=>{
        setstep((value)=>value-1)
    }

    const onNext = ()=>{
        setstep((value)=>value+1)
    }



    const onSubmit = (data) =>{
        if(step !== STEPS.PRICE){
            return onNext();
        }

        setisLoading(true);
        axios.post('/api/listings', data)
        .then(()=>{
            toast.success('Listing Created!')
            router.refresh();
            reset();
            setstep(STEPS.CATEGORY);
            rentModal.onClose();
        })
        .catch(()=>{
            toast.error("Oops!,Something went wrong")
        }).finally(()=>{
            setisLoading(false);
        })
    }


    const actionLabel = useMemo(()=>{
        if(step === STEPS.PRICE){
            return 'Create'
        }
        return 'Next';
    },[step])


    const secondaryActionLabel = useMemo(()=>{
        if(step === STEPS.CATEGORY){
            return undefined
        }
        return 'Back';
    },[step])


    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading
                title="Which of these best describe your place?"
                subtitle="Pick a category"
            />
            <div
                className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'
            >
                {categories.map((item)=>(
                    <div
                        key={item.label}
                        className='col-span-1'
                    >
                        <CategoryInput
                            key={item.label}
                            icon={item.icon}
                            selected={category === item.label}
                            label={item.label}
                            onClick={(category)=>setCustomValue('category', category)}/>
                    </div>
                ))}
            </div>
        </div>
    )

    
    if(step === STEPS.LOCATION){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title="Where is your place located?"
                    subtitle="Help guests find your place!"
                />
                <CountrySelect
                    value={location}
                    onChange={(value)=>setCustomValue('location', value)}
                />
                <Map center={location?.latlng}/>
            </div>
        )
    }



    if(step === STEPS.INFO){
        
        bodyContent=(
            <div className='flex flex-col gap-8'>
                <Heading
                    title="Share some basics about your place"
                    subtitle="What amenities do you offer?"
                />
                <Counter 
                    title="Guests" 
                    subtitle="How many guests do you allow?"
                    value={guestCount}
                    onChange={(value)=>setCustomValue('guestCount',value)}
                />
                <hr/>
                <Counter 
                    title="Rooms" 
                    subtitle="How many rooms do you have?"
                    value={roomCount}
                    onChange={(value)=>setCustomValue('roomCount',value)}
                />
                <hr/>
                <Counter 
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have"
                    value={bathroomCount}
                    onChange={(value)=>setCustomValue('bathroomCount',value)}
                />
            </div>
        )
    }



    if(step === STEPS.IMAGES){
        bodyContent=(
            <div className='flex flex-col gap-8'>
                <Heading
                    title="Add a photo of your place"
                    subtitle="Show guests what your place looks like!"
                />
                <ImageUploader
                    value={imageSrc}
                    onChange={(value)=>setCustomValue("imageSrc",value)}
                />
            </div>
        )
    }



    if(step === STEPS.DESCRIPTION){
        bodyContent=(
            <div className='flex flex-col gap-8'>
                <Heading
                    title="How would you describe your place?"
                    subtitle="Something short and sweet!"
                />
                    <Input
                        id="title"
                        label="Title"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input
                        id="desc"
                        label="Description"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
            </div>
        )
    }


    if(step === STEPS.PRICE){
        bodyContent=(
            <div className='flex flex-col gap-8'>
                <Heading
                    title="Set Your Price"
                    subtitle="How much do you charge per night?"
                />
                <Input
                    id="price"
                    label="Price"
                    formatPrice
                    type='number'
                    register={register}
                    disabled={isLoading}
                    errors={errors}
                    required              
                />
            </div>
        )
    }


  return (
    <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step===STEPS.CATEGORY?undefined:onBack}
        title="Airbnb your home"
        body={bodyContent}
    />
  )
}

export default RentModal