"use client"
import { Button } from '@/components/ui/button'
import { LoginLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex, useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import React, { useEffect } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const Dashboard = () => {

  const convex = useConvex()
  const {user}:any =useKindeBrowserClient()
  // const getUser =useQuery(api.user.getUser,{
  //   email:user?.email
  // })
  const router = useRouter()

  const createUser =useMutation(api.user.createUser)

  useEffect(()=>{
    if(user){
      console.log(user)
      checkUser()
    
    }
  },[user])


  const checkUser =async()=>{
    const result =await convex.query(api.user.getUser,{
      email:user?.email
    })

    if(!result?.length){
      createUser({
        email:user?.email,
        name:user?.given_name,
        image:user?.picture
      }).then((res)=>{
        console.log(res)
        
      })
    }
     
  }


  return (
    <div>Dashboard

      <Button><LoginLink>Logout</LoginLink></Button>
    </div>
  )
}

export default Dashboard