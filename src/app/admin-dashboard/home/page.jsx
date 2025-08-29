'use client'
import React from 'react'
import RecruiterDashboard from '../page'
import Allpost from '@/app/_components/Allpost'

const page = () => {
  return (
    <RecruiterDashboard>
      <section>
        <div className="container">
          <div className="mt-3 max-h-[650px] overflow-y-auto hide-scrollbar">
            <Allpost />
          </div>
        </div>
      </section>
    </RecruiterDashboard>
  )
}

export default page