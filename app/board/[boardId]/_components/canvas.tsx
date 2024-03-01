'use client'

import { useState } from "react"
import { Info } from "./Info"
import { Participants } from "./Participants"
import { Toolbar } from "./Toolbar"
import { CanvasMode, CanvasState } from "@/types/canvas"
interface CanvasProps {
    boardId: string
}

import { useCanRedo, useCanUndo, useHistory, useSelf } from "@/liveblocks.config"


export const Canvas = ({boardId}: CanvasProps) => {
    const info = useSelf((me) => me.info)
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    })

    const history = useHistory()
    const canUndo = useCanUndo()
    const canRedo = useCanRedo()
    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none">
            <Info boardId={boardId}></Info>
            <Participants></Participants>
            <Toolbar 
                canvasState={canvasState}
                setCanvasState={setCanvasState}
                canRedo={canRedo}
                canUndo={canUndo}
                undo={history.undo}
                redo={history.redo}
            ></Toolbar>
        </main>
    )
}