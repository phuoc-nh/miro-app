import React from 'react'
import Sidebar from './_components/Sidebar'
import OrgSidebar from './_components/OrgSidebar'
import Navbar from './_components/Navbar'

interface DashboardLayoutProps {
    children: React.ReactNode
} 

export default function DashboardLayout({children}: DashboardLayoutProps) {
  return (
    <main className='h-full'>
        <Sidebar></Sidebar>
        <div className='pl-[60px] h-full'>
			<div className='flex gap-x-4 h-full'>
				<OrgSidebar></OrgSidebar>
				<div className='h-full  flex-1'>
					<Navbar></Navbar>
					{children}
				</div>
			</div>
		</div>
    </main>
  )
}
