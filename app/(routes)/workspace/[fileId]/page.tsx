import React from 'react'
import WorkspaceHeader from '@/app/(routes)/workspace/_components/WorkspaceHeader'
import Editor from '../_components/Editor'

function Workspace() {
  return (
    <div>
        <WorkspaceHeader />

        <div className='grid grid-cols-1 md:grid-cols-2'>
            {/* document */}
            <div className='bg-gray-100 h-screen'>
               <Editor />
            </div>

                {/* canvas */}    
            <div className='bg-red-100 h-screen '>
                canvas
            </div>


        </div>
    </div>
  )
}

export default Workspace