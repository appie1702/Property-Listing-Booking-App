"use client"

import React from 'react'
import Calendar from '../inputs/Calendar'
import Button from '../Button'

const ListingReservation = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates,
}) => {
  return (
    <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
        <div className='flex flex-row items-center gap-1 p-4'>
            <div className='text-2xl font-semibold'>
                &#x20B9; {price}
            </div>
            <div className='font-light text-neutral-600'>
                night
            </div>
        </div>
        <hr/>
        <Calendar
            value={dateRange}
            disabledDates={disabledDates}
            onChange = {(value)=> onChangeDate(value.selection)
            }
        />
        <hr/>
        <div className='p-4 '>
            <Button
                disabled={disabled}
                label="Reserve"
                onClick={onSubmit}
            />
        </div>
        <div className='p-4 flex flex-row items-center justify-between font-semibold'>
            <div>Total</div>
            <div>&#x20B9; {totalPrice}</div>
        </div>
    </div>
  )
}

export default ListingReservation