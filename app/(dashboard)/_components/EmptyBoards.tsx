'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import {api} from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import { useOrganization } from '@clerk/nextjs'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { toast } from 'sonner'

export default function EmptyBoards() {
    const {organization} = useOrganization()
    const {mutate, pending} = useApiMutation(api.board.create)
    const onClick = () => {
        if (!organization) return

        mutate({
            title: 'Untitled',
            orgId: organization.id
        }).then(() => {
            toast.success('Board created!')
            // TODO: 
        }).catch(() => {
            toast.error('Failed to create board')
        })
    }
    return (
        <div className='h-full flex flex-col items-center justify-center'>
            <Image src='note.svg' alt='empty-search' height={110} width={110}></Image>
            <h2 className='text-2xl font-semibold mt-6'>Create your first board</h2>
            <p className='text-muted-foreground text-sm mt-2 mb-2'>Start by creating a board for your organization</p>
            <Button disabled={pending} size='lg' onClick={onClick}>
                Create board
            </Button>
        </div>
    )
}
