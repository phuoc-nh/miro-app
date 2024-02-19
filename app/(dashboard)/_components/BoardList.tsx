'use client'
import React from 'react'
import EmptySearch from './EmptySearch'
import EmptyFavorites from './EmptyFavorites'
import EmptyBoards from './EmptyBoards'

interface BoardListProps {
    orgId: string
    query: {
        search?: string
        favorites?: string
    }
}

export default function BoardList({orgId, query}: BoardListProps) {
    const data = []

    if (!data?.length && query.search) {
        return (
            <EmptySearch></EmptySearch>
        )
    }

    if (!data?.length && query.favorites) {
        return (
            <EmptyFavorites></EmptyFavorites>
        )
    }

    if (!data.length) {
        return (
            <EmptyBoards></EmptyBoards>
        )
    }

    return (
        <div></div>
    )
}
