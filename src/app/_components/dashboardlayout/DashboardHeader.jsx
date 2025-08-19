import React from 'react'
import DashboardSidebar from './DashboardSidebar';

const DashboardHeader = () => {
    return (
        <div className='flex gap-5'>
            <DashboardSidebar /><h2>Welcome</h2>
            </div>
    )
}

export default DashboardHeader