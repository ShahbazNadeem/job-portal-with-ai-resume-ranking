'use client'
import React from 'react'
import Allpost from '@/app/_components/Allpost'
import AdminDashboard from '../page'

const page = () => {
  return (
    <AdminDashboard>
      <section>
        <div className="container">
          <div className="mt-3 max-h-[650px] overflow-y-auto hide-scrollbar">
            <Allpost />
          </div>
        </div>
      </section>
    </AdminDashboard>
  )
}

export default page