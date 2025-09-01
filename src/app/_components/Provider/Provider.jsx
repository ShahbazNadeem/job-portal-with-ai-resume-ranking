'use client';

import React from 'react';
import { UserProvider } from '@/context/UserContext';
import { RecruiterProvider } from '@/context/RecruiterContext';
import { AdminProvider } from '@/context/AdminContext';
import { SessionProvider } from "next-auth/react"
import { JobsProvider } from '@/context/JobsContext';
import { ManageRecruiterProvider } from '@/context/ManageRecruitersContext';

export function Provider({ children }) {
    return (
        <>
            <JobsProvider>
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
            </JobsProvider>
        </>
    )
}