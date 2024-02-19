'use client'

import React from 'react'
import EmptyOrg from './_components/EmptyOrg'
import { useOrganization } from '@clerk/nextjs'
import BoardList from './_components/BoardList'

interface DashboardProps {
  searchParams: {
    search?: string
    favorites?: string
  }
}

export default function Dashboard({searchParams}: DashboardProps) {
  const {organization} = useOrganization()

  return (
    <div className='h-[calc(100%-80px)] p-6 flex-1'>
      {!organization ? (
        <EmptyOrg></EmptyOrg>
      ): (
        <BoardList orgId={organization.id} query={searchParams}>

        </BoardList>
      )}
    </div>
  )
}
