"use client"
import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs'
// @ts-ignore
import Header from '@editorjs/header'
// @ts-ignore
import List from '@editorjs/list'
// @ts-ignore
import Checklist from '@editorjs/checklist'
// @ts-ignore
import Paragraph from '@editorjs/paragraph';
// @ts-ignore
import Warning from '@editorjs/warning';
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { FILE } from '../../dashboard/_components/FileList'


const rawDocument = {
    "time":1721865600000,
    "blocks":[
        {
            
            "data":{
                "text":"Document name",
                "level":2
            },
            "id":"123",
            "type":"header",
        } 
    ],
    "version":"2.8.1"
}
function Editor({onSaveTrigger,fileId,fileData}:{onSaveTrigger:any,fileId:any,fileData:FILE}) {

    const ref=useRef<EditorJS>()
    const [document,setDocument]=useState(rawDocument)
    const updateDocument=useMutation(api.files.updateDocument)


   useEffect(() => {
    fileData && initEditor()

   },[fileData])

   useEffect(() => {
    console.log("trigger save ",onSaveTrigger)
    onSaveTrigger && onSaveDocument()
   },[onSaveTrigger])

  const initEditor = () => {

    const editor = new EditorJS({
      tools: {
        header: {
          class: Header,
          shortcut: 'CMD+SHIFT+H',
          config: {
            placeholder: 'Enter a header',
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            placeholder: 'Enter a list',
            defaultStyle: 'unordered',
          },
         
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
          config: {
            placeholder: 'Enter a checklist',
          },
        },
        paragraph: Paragraph,
        warning: Warning,
      },
      holder: 'editorjs',
      data: fileData?JSON.parse(fileData.document):rawDocument,
    })
    ref.current=editor
  }


  const onSaveDocument=()=>{
     if(ref.current){
        ref.current.save().then((data:any)=>{
            console.log("save document ",data)
            updateDocument({
                _id:fileId,
                document:JSON.stringify(data)
            }).then(resp=>{
               
                    toast("save document success")
            
            }).catch((error:any)=>{
                console.log("error save document ",error)
            })
        }).catch((error:any)=>{
            console.log("error save document ",error)
        })
     }
  }

  return (
    <div>
        <div id='editorjs'  className='ml-10' ></div>
    </div>
  )
}

export default Editor