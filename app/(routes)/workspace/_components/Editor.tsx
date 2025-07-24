"use client"
import React, { useEffect, useRef } from 'react'
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


function Editor() {

    const ref=useRef<EditorJS>()

   useEffect(() => {
    initEditor()

   },[])

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
    })
    ref.current=editor
  }


  return (
    <div>
        <div id='editorjs'  className='ml-10' ></div>
    </div>
  )
}

export default Editor