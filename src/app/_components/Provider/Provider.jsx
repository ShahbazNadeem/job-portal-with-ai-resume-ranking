'use client';

import React from 'react';
import { UserProvider } from '@/context/UserContext';
import { RecruiterProvider } from '@/context/RecruiterContext';
import { AdminProvider } from '@/context/AdminContext';
import { SessionProvider } from "next-auth/react"

export function Provider({ children }) {
    return (
        <>
            <AdminProvider>
                <RecruiterProvider>
                    <SessionProvider>
                        <UserProvider>
                            {children}
                        </UserProvider>
                    </SessionProvider>
                </RecruiterProvider>
            </AdminProvider>
        </>
    )
}