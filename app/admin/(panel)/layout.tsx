import DashboardLayout from '@/components/admin/layout/admin-layout';
import ProtectedRoute from '@/components/admin/shared/ProtectedRoute';
import ErrorBoundary from '@/components/admin/shared/ErrorBoundary';
import React, { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode;
}

const layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        // <ErrorBoundary>
            <ProtectedRoute>
                <DashboardLayout>
                    {children}
                </DashboardLayout>
            </ProtectedRoute>
        // </ErrorBoundary>
    )
}

export default layout;
