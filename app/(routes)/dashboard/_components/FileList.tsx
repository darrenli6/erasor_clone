import React, { useContext, useEffect, useState } from 'react'
import { FileListContext } from '@/app/_context/FileListContext'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import moment from 'moment'
import Image from 'next/image'
import { Archive, MoreHorizontal } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'

export interface FILE {
   archive:boolean,
   createdBy:string,
   document:string,
   fileName:string,
   teamId:string,
   whiteBoard:string,
   _id:string,
   _creationTime:string,
}

function FileList() {

  const {fileList_,setFileList_}= useContext(FileListContext)  
  const [fileList,setFileList] = useState<any>([])
  const {user}= useKindeBrowserClient()
  const router = useRouter()

  useEffect(()=>{
    console.log(fileList_)
    fileList_&& setFileList(fileList_)
  
  },[fileList_])
  return (
    <div className='mt-8'>
        <div className="overflow-x-auto">
  <table className="min-w-full divide-y-2 divide-gray-200">
    <thead className="ltr:text-left rtl:text-right">
      <tr className="*:font-medium *:text-gray-900">
        <th className="px-3 py-2 whitespace-nowrap">File Name</th>
        <th className="px-3 py-2 whitespace-nowrap">Created By</th>
        <th className="px-3 py-2 whitespace-nowrap">Edited By</th>
        <th className="px-3 py-2 whitespace-nowrap">Status</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200">
    
    {fileList&&fileList.map((file:FILE,index:number)=>(
      <tr key={index} className="*:text-gray-900 *:first:font-medium">
        <td className="px-3 py-2 whitespace-nowrap cursor-pointer" onClick={()=>router.push(`/workspace/${file._id}`)}>{file.fileName}</td>
        <td className="px-3 py-2 whitespace-nowrap">{moment(file._creationTime).format("DD MMM YYYY")}</td>
        <td className="px-3 py-2 whitespace-nowrap">{moment(file._creationTime).format("DD MMM YYYY")}</td>
        <td className="px-3 py-2 whitespace-nowrap"><Image src={user?.picture} alt="user" width={20} height={20} /></td>
        <td className="px-3 py-2 whitespace-nowrap">
          
        <DropdownMenu>
  <DropdownMenuTrigger>
  <MoreHorizontal/>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
   
    <DropdownMenuItem className='gap-3'>
       <Archive className='h-4 w-4'/> Archive</DropdownMenuItem>
   
  </DropdownMenuContent>
</DropdownMenu>
        </td>
      </tr>
    ))}
 
    </tbody>
  </table>
</div>
    </div>
  )
}

export default FileList