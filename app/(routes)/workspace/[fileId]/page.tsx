"use client"
import React, { useEffect, useState } from 'react'
import WorkspaceHeader from '@/app/(routes)/workspace/_components/WorkspaceHeader'
import Editor from '../_components/Editor'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { FILE } from '../../dashboard/_components/FileList'
import Canvas from '../_components/Canvas'

function Workspace({params}:any) {

    const [triggerSave,setTriggerSave]=useState(false)
    const convex = useConvex()
    const [fileData,setFileData]=useState<FILE|any>()

    useEffect(()=>{
        console.log("params fileId  ",params.fileId)
        params.fileId && getFileData()
    },[])


    const getFileData =async()=>{
        const fileData = await convex.query(api.files.getFileById,{
            _id:params.fileId
        })
        console.log("fileData ",fileData)
        setFileData(fileData)
    }


  return (
    <div>
        <WorkspaceHeader onSave={()=>setTriggerSave(!triggerSave)} />

        <div className='grid grid-cols-1 md:grid-cols-2'>
            {/* document */}
            <div className='bg-gray-100 h-screen'>
               <Editor onSaveTrigger={triggerSave} fileId={params.fileId}
                fileData={fileData}
               />
            </div>

                {/* canvas */}    
            <div className='bg-red-100 h-screen border-l '>
               <Canvas onSaveTrigger={triggerSave} fileId={params.fileId}
                fileData={fileData}
               />
            </div>


        </div>
    </div>
  )
}

export default Workspace