'use client';

import React from 'react';
import { UserProvider } from '@/context/UserContext';
import { RecruiterProvider } from '@/context/RecruiterContext';
import { AdminProvider } from '@/context/AdminContext';

export function Provider({ children }) {
    return (
        <>
            <AdminProvider>
                <RecruiterProvider>
                    <UserProvider>
                        {children}
                    </UserProvider>
                </RecruiterProvider>
            </AdminProvider>
        </>
    )
}