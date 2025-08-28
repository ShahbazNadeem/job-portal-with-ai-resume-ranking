'use client';

import React from 'react';
import { UserProvider } from '@/context/UserContext';
import { RecruiterProvider } from '@/context/RecruiterContext';
import { AdminProvider } from '@/context/AdminContext';
import { SessionProvider } from "next-auth/react"
import { JobsProvider } from '@/context/JobsContext';

export function Provider({ children }) {
    return (
        <>
            <JobsProvider>
                <AdminProvider>
                    <RecruiterProvider>
                        <SessionProvider>
                            <UserProvider>
                                {children}
                            </UserProvider>
                        </SessionProvider>
                    </RecruiterProvider>
                </AdminProvider>
            </JobsProvider>
        </>
    )
}