import React from 'react'
import { EllipsisVerticalIcon, ShareIcon, PrinterIcon } from '@heroicons/react/24/outline';

const Subheader = () => {
  return (
    <>
      <header className="relative flex flex-col bg-blue-900 px-8 pt-4 pb-6">
        {/* First Line */}
        <div className="flex items-center space-x-4">
          <span className="shrink-0 text-base font-semibold text-white">
            My Course Plan
          </span>
          <button>
            <EllipsisVerticalIcon className="size-6 text-white"/>
          </button>

          <button className="shrink-0 rounded-md bg-blue-500 px-3 py-1 text-sm text-blue-50">
            Clear Plan
          </button>
        </div>

        {/* Second Line */}
        <div className="text-2xl flex space-x-3 py-2 font-bold text-white">
          <span className=''>Bachelor of Science</span>
          <button className="underline hover:text-blue-500">Select Course</button>
        </div>

        {/* Buttons */}
        <div className='flex absolute bottom-2 right-1 space-x-2 p-3'>
          <button>
            <ShareIcon className='flex size-5 text-white'/>
          </button>

          <button>
            <PrinterIcon className='flex size-5 text-white'/>
          </button>

        </div>
      </header>
    </>
  );
}

export default Subheader