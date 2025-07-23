import { Archive, ChevronDown, Flag, Github } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import SideNavTopSection, { TEAM } from './SideNavTopSection'
import SideNavBottomSection from './SideNavBottomSection'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { FileListContext } from '@/app/_context/FileListContext'


function SideNav() {

    const {user}=useKindeBrowserClient()
    const [activeTeam,setActiveTeam] = useState<TEAM>()

    const createFile=useMutation(api.files.createFile)
    const convex = useConvex()
    const [totalFiles,setTotalFiles] = useState<number>(0)
    const {fileList_,setFileList_}=useContext(FileListContext)

    const onFileCreate=(fileName:string)=>{
        console.log("file created "+fileName)
        createFile({
            fileName:fileName,
            teamId:activeTeam?._id || "",
            createdBy:user?.email || "" ,
            archive:false,
            document:"",
            whiteboard:""
        }).then((res)=>{
            console.log(res)
            if(res){
              getFiles()
               toast.success("File created successfully")
            }
        }).catch((err)=>{
            console.log(err)
            toast.error("File creation failed")
        })
    }

    useEffect(()=>{
        if(activeTeam){
            getFiles()
        }
    },[activeTeam])

    const getFiles = async ()=>{
        const files =await convex.query(api.files.getFiles,{
            teamId:activeTeam?._id || ""
        })
        console.log(files)
        setFileList_(files)
        setTotalFiles(files.length)
    }

   
  return (
    <div className='bg-gray-100 h-screen fixed w-64 border-r flex flex-col'>
       <div className='flex-1'>
       <SideNavTopSection user={user} setActiveTeamInfo={(activeTeam:TEAM)=>setActiveTeam(activeTeam)} />
       </div>
       <div>
         <SideNavBottomSection 
         totalFiles={totalFiles}
         onFileCreate={onFileCreate} />
       </div>
    </div>

  )
}

export default SideNav