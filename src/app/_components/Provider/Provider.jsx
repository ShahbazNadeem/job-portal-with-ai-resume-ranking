'use client';

import React from 'react';
import { UserProvider } from '@/context/UserContext';
import { RecruiterProvider } from '@/context/RecruiterContext';
import { AdminProvider } from '@/context/AdminContext';
import { SessionProvider } from "next-auth/react"
import { JobsProvider } from '@/context/JobsContext';
import { ManageRecruiterProvider } from '@/context/ManageRecruitersContext';
import { AppliedJobsProvider } from '@/context/AppliedJobsContext';

export function Provider({ children }) {
    return (
        <>
            <JobsProvider>
                <AppliedJobsProvider>
                    <AdminProvider>
                        <ManageRecruiterProvider>
                            <RecruiterProvider>
                                <SessionProvider>
                                    <UserProvider>
                                        {children}
                                    </UserProvider>
                                </SessionProvider>
                            </RecruiterProvider>
                        </ManageRecruiterProvider>
                    </AdminProvider>
                </AppliedJobsProvider>
            </JobsProvider>
        </>
    )
}