'use client'

import { useCallback, useState } from "react"
import { Info } from "./Info"
import { Participants } from "./Participants"
import { Toolbar } from "./Toolbar"
import { Camera, CanvasMode, CanvasState } from "@/types/canvas"
interface CanvasProps {
    boardId: string
}

import { useCanRedo, useCanUndo, useHistory, useMutation, useSelf } from "@/liveblocks.config"
import CursorPresence from "./CursorPresence"
import { pointerEventToCanvasPoint } from "@/lib/utils"


export const Canvas = ({boardId}: CanvasProps) => {
    const info = useSelf((me) => me.info)
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    })
    const [camera, setCamera] = useState<Camera>({x: 0, y: 0})
    const history = useHistory()
    const canUndo = useCanUndo()
    const canRedo = useCanRedo()
    const onWheel = useCallback((e: React.WheelEvent) => {

        setCamera((prev) => {
            return {
                x: prev.x - e.deltaX,
                y: prev.y - e.deltaY
            }
        })
    }, [])

    const onPointerMove = useMutation(({setMyPresence}, e: React.PointerEvent)=> {
        e.preventDefault()
        const current = pointerEventToCanvasPoint(e, camera)
        setMyPresence({cursor: current})
    },[])

    const onPointerLeave = useMutation(({setMyPresence}) => {
        setMyPresence({cursor: null})
    }, [])
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
            <svg
                className="h-[100vh] w-[100vw]"
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
            >
                <g>
                    <CursorPresence />
                </g>
            </svg>
        </main>
    )
}