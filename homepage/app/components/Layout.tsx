import React from 'react'
import Sidebar from './Sidebar'

type LayoutProps = {
    children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div className="flex h-screen">
        <Sidebar />
        <main className='flex-1 p-6 bg-gray-1000'>{children}</main>
    </div>
  )
}

export default Layout