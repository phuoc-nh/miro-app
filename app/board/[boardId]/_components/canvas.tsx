'use client'

import { Info } from "./Info"
import { Participants } from "./Participants"
import { Toolbar } from "./Toolbar"

interface CanvasProps {
    boardId: string
}

import { useSelf } from "@/liveblocks.config"


export const Canvas = ({boardId}: CanvasProps) => {
    const info = useSelf((me) => me.info)
    console.log(info)

    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none">
            <Info boardId={boardId}></Info>
            <Participants></Participants>
            <Toolbar></Toolbar>
        </main>
    )
}