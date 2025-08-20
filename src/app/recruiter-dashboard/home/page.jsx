import React from 'react'
import RecruiterDashboard from '../page'
import Allpost from '@/app/_components/Allpost'

const page = () => {
  return (
    <RecruiterDashboard>
      <section>
        <div className="container">
          <Allpost />
        </div>
      </section>
    </RecruiterDashboard>
  )
}

export default page