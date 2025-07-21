"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMutation } from 'convex/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { api } from '@/convex/_generated/api'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const CreateTeam = () => {

  const [teamName,setTeamName] = useState("")

  const createTeam = useMutation(api.teams.createTeam)
  const {user}:any = useKindeBrowserClient()
  const router = useRouter()

  const createNewTeam = async()=>{
    const result =await createTeam({
      teamName:teamName,
      createdBy:user?.email
    }).then((res)=>{
      console.log(res)
      if(res){
        router.push("/dashboard")
        toast.success("Team created successfully")
      }

    })
    console.log(result)
  }


  return (
    <div className="md:px-16 px-4 my-10">
        <Image src="/logo.svg" alt="logo" width={200} height={200} />

        <div className='flex flex-col items-center justify-center'>
           <h2 className='font-bold text-[40px] py-3'>What should we call your team?</h2> 
           <div className='mt-7 w-[40%]'>
              <label className='text-sm font-medium'>Team Name</label>
              <Input placeholder='Enter your team name' onChange={(e)=>setTeamName(e.target.value)} className='mt-3' />
           </div>
           <Button disabled={!(teamName&&teamName?.length>0)}
            className='bg-blue-500 mt-9 w-[40%] hover:bg-blue-600'
            onClick={()=>createNewTeam()}
            >Create Team</Button>
        </div>
    </div>

  )
}

export default CreateTeam