"use client"

import {User} from '@prisma/client';
import React from 'react'
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import Categories from './Categories';

const Navbar = ({currentUser}) => {
  return (
    <div className='fixed-w-full bg-white z-10 shadow-sm select-none'>
        <div className='py-4 border-b-[1px]'>
          <Container>
            <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
              <Logo/>
              <Search/>
              <UserMenu currentUser={currentUser}/>
            </div>
          </Container>
        </div>
        <Categories/>
    </div>
  )
}

export default Navbar