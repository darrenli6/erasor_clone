import Image from 'next/image'
import React from 'react'

function SideNav() {
  return (
    <div className='bg-gray-100 h-screen fixed w-64 border-r'>
        <div className='flex items-center gap-3 '>
        <Image src="/logo.svg" alt="logo" width={40} height={40} />
        <h2>Team Name</h2>
        </div>
    </div>
  )
}

export default SideNav