import React from 'react'
import { Icons } from '@/data/Imports'

const Card1 = ({className}) => {
  return (
    <div className={`flex flex-col gap-2 p-2.5 ${className} rounded`}>
        <span className='flex justify-between flex-wrap gap-2'>
            <span className='p-1 border rounded font-semibold'>Fulltime</span>
            <span className='p-1 border rounded font-semibold'>Onsite</span>
            <span className='p-1 border rounded font-semibold'>$200K</span>
        </span>
        <span className='font-bold text-[18px]'>UX Designer</span>
        <span className='font-semibold text-[18px]'>Advoit Digital Agency</span>
        <span className='flex justify-between items-center'>
            <button>Apply</button>
            <span className='flex gap-1 text-[18px] font-semibold'><Icons.team size={25}/>24 Applied</span>
        </span>
    </div>
  )
}

export default Card1