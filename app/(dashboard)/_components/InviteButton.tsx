import React from 'react'
import {Plus} from 'lucide-react'
import { OrganizationProfile, useOrganization } from '@clerk/nextjs'
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'


export default function InviteButton() {
  return (
    <Dialog>
        <DialogTrigger>
            <Button variant='outline'>
                <Plus className='h-4 w-4 mr-2'/>
                Invite members
            </Button>
        </DialogTrigger>
        <DialogContent className='max-w-[880px] p-0'>
            <OrganizationProfile />
        </DialogContent>
    </Dialog>
  )
}
