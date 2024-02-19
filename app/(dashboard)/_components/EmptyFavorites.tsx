import Image from 'next/image'
import React from 'react'

export default function EmptyFavorites() {
    return (
        <div className='h-full flex flex-col items-center justify-center'>
            <Image src='empty-favorites.svg' alt='empty-search' height={140} width={140}></Image>
            <h2 className='text-2xl font-semibold mt-6'>No favorites found</h2>
            <p className='text-muted-foreground text-sm mt-2'>Try favoriting a board</p>
        </div>
    )
}
