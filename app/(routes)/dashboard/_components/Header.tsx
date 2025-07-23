import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Search, Send } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
function Header() {

    const {user}:any = useKindeBrowserClient()

  return (
    <div className='flex justify-end w-full gap-2 items-center'>
       <div className='flex items-center gap-2 rounded-md '>
          <Search className='w-4 h-4' />
          <Input type='text' placeholder='Search' />
       </div>
       <div>
         <Image src={user?.picture}
         className='rounded-full'
          alt='user'
           width={30} 
           height={30} />
       </div>

       <Button className='gap-2 flex hover:bg-blue-500 hover:text-white ' ><Send className='w-4 h-4' /> Invite</Button>
    </div>
  )
}

export default Header