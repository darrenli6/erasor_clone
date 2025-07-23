import { Popover } from '@/components/ui/popover'
import { ChevronDown, LayoutGrid, LogOut, Settings, User } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'
import { Separator } from '@/components/ui/separator'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'


export type TEAM = {
    _id:string,
    teamName:string,
    createdBy:string,
}   

function SideNavTopSection({user,setActiveTeamInfo}:any) {
   const menus = [
    {
        id:1,
        name:"Create Team",
        path:"/teams/create",
        icon: User,
    },
    {
        id:2,
        name:"Settings",
        path:"",
        icon: Settings,
    }
   ]

   const convex = useConvex()
   const router = useRouter()
   const [teamList,setTeamList] = useState<TEAM[]>()
   const [activeTeam,setActiveTeam] = useState<TEAM>()
   const getTeamList= async()=>{
    const result = await convex.query(api.teams.getTeam,{
        email:user?.email
    })
    console.log(result)
    setTeamList(result)
    setActiveTeam(result[0])
   }

   useEffect(()=>{
    activeTeam && setActiveTeamInfo(activeTeam)
   },[activeTeam])

   useEffect(()=>{
    user && getTeamList()
   },[user])

   const onMenuClick = (item:any)=>{
    if(item.path){
        router.push(item.path)
    }
   }

  return (
       <div>
        <Popover>

            <PopoverTrigger>
            <div className='flex items-center gap-3 hover:bg-gray-200 p-2 rounded-md cursor-pointer '>
    
            <Image src="/logo.svg" alt="logo" width={40} height={40} />
            <h2 className='flex gap-2 items-center font-bold text-[17px]'>
                {activeTeam?.teamName}
                <ChevronDown />
            </h2>
            </div>
            </PopoverTrigger>
            <PopoverContent className='ml-7 p-4'>
                <div>
                    {teamList && teamList.map((team,index)=>(
                        <div className='flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md cursor-pointer' key={team._id}>
                          
                            <h2 key={index} onClick={()=>setActiveTeam(team)}
                            className={`p-2 hover:text-white rounded-md cursor-pointer ${activeTeam?._id==team._id ? "bg-blue-500 text-white" : ""}`}>
                                {team.teamName}</h2>
                        </div>
                    ))}
                </div>
                <Separator className='my-2' />
                <div>
                    {menus.map((menu)=>(
                        <h2 onClick={()=>onMenuClick(menu)} className='flex items-center gap-2 p-2
                         hover:bg-gray-200 rounded-md cursor-pointer' key={menu.id}>
                            <menu.icon className='h-4 w-4' />
                          {menu.name}
                          </h2>
                         
                    ))}
                    <LogoutLink>
                     <div className='flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md cursor-pointer' >
                            <LogOut className='h-4 w-4' />
                            <h2>Logout</h2>
                        </div>
                    </LogoutLink>    
                </div>
                <Separator className='my-2 bg-slate-200' />
                {/* user info */}
                {user &&<div className='mt-2 flex items-center gap-2'>
                    <Image src={user?.picture} alt="user" 
                    width={30} height={30} className='rounded-full' />
                </div>}
                <div>
                    <h2 className='font-bold text-[14px]'> {user?.given_name} {user?.family_name}</h2>
                    <h2 className='text-[12px] text-gray-500'>{user?.email}</h2>
                </div>

            </PopoverContent>
        </Popover>

        <Button variant="outline" className='w-full mt-8 bg-gray-200 gap-2 '>
            <LayoutGrid className='h-4 w-4' />
            <h2 className='text-[14px]'>All Files</h2>
        </Button>

       
        </div>
       
  )
}

export default SideNavTopSection