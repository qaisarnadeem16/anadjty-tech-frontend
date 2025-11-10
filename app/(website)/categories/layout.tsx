import  SiteHeader  from '@/components/site-header'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="">
            <SiteHeader />
            <div>
                {children}
            </div>
        </div>
    )
}

export default Layout
