"use client"

import React from 'react'
import Image from 'next/image'
import {
    useOrganization,
    useOrganizationList
} from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { Hint } from '@/components/hint'

interface ItemProps {
    id: string;
    name: string;
    imageUrl: string;
}

export default function Item({
    id,
    imageUrl,
    name
}: ItemProps) {
    const { organization } = useOrganization()
    const {setActive} = useOrganizationList()

    const isActive = organization?.id === id 

    const onClick = () => {
        if (!setActive) return;

        setActive({organization: id})
    }

    return (
        <Hint label={name} side='right' align='start' sideOffset={15}>
            <div className=''> 
            {/* aspect-square */}
                <Image 
                    src={imageUrl} 
                    alt={name} 
                    onClick={onClick}
                    width={50}
                    height={50}
                    className={cn(
                        "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
                        isActive && "opacity-100"
                    )}
                />

            </div>
        </Hint>
    )
}
