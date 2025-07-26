"use client"
import React, { use, useEffect, useState } from 'react'
import { Excalidraw } from '@excalidraw/excalidraw'
import {  MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { FILE } from '../../dashboard/_components/FileList';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { updateWhiteboard } from '@/convex/files';
import { toast } from 'sonner';

function Canvas({onSaveTrigger,fileId,fileData}:{onSaveTrigger:any,fileId:any,fileData:FILE}) {


  const [whiteBoardData,setWhiteBoardData]=useState<any>(null)

  const updateWhiteboard=useMutation(api.files.updateWhiteboard)

  useEffect(()=>{
    onSaveTrigger && saveWhiteboard()
  },[onSaveTrigger])  

  const saveWhiteboard=()=>{
     updateWhiteboard({
        _id:fileId,
        whiteboard:JSON.stringify(whiteBoardData)
      }).then(()=>{
        toast.success("Whiteboard saved")
      }).catch((error)=>{
        toast.error("Error saving whiteboard")
      })
  }  

  return (
    <div style={{ height: "100vh" }}>
    {fileData && <Excalidraw  
      onChange={(excalidrawElements, appState, files)=>{
        setWhiteBoardData(excalidrawElements)
        console.log("excalidrawElements ",excalidrawElements)
        console.log("appState ",appState)
        console.log("files ",files)
      }}
      theme="light"
      initialData={
        {
            elements: fileData && fileData?.whiteboard ? JSON.parse(fileData?.whiteboard) : []
        }
      }
      UIOptions={{
        canvasActions:{
            saveToActiveFile:false,
            loadScene:false,
            export:false,
            toggleTheme:false

        }
    }}
    
        
    >
        <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas/>
            <MainMenu.DefaultItems.SaveAsImage/>
            <MainMenu.DefaultItems.ChangeCanvasBackground/>
        </MainMenu>
        <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint/>
            <WelcomeScreen.Hints.MenuHint/>
            <WelcomeScreen.Hints.ToolbarHint/>
            <WelcomeScreen.Center>
                <WelcomeScreen.Center.MenuItemHelp/>
            </WelcomeScreen.Center>
        </WelcomeScreen>
        </Excalidraw>}
  </div>
  )
}

export default Canvas