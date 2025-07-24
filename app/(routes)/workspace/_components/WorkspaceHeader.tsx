import { Button } from '@/components/ui/button'
import { Link, Share } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function WorkspaceHeader() {
  return (
    <div className="p-3 border-b flex justify-between items-center">
        <div className='flex items-center gap-2'>
        <Image src={'/logo.svg'} alt="logo" width={50} height={50} />
      
        </div>
        <Button className='h-8 text-[12px] bg-blue-800 hover:bg-blue-900 items-center gap-2'>
            Share <Link className='h-4 w-4' /></Button>
    </div>
  )
}

export default WorkspaceHeader