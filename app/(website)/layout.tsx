import ScrollToTop from '@/components/ui/scrollToTop'
import React, { FC, ReactNode } from 'react'

interface LayoutProp {
    children: ReactNode;
}

const Layout: FC<LayoutProp> = ({ children }) => {
    return (
        <div>
            {children}
            <ScrollToTop />
        </div>
    )
}

export default Layout
