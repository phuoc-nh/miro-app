'use client'

import React, { useCallback, useMemo, useState } from "react"
import { Info } from "./Info"
import { Participants } from "./Participants"
import { Toolbar } from "./Toolbar"
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point } from "@/types/canvas"
import { useCanRedo, useCanUndo, useHistory, useMutation, useOthersMapped, useSelf, useStorage } from "@/liveblocks.config"
import CursorPresence from "./CursorPresence"
import { connectionIdToColor, pointerEventToCanvasPoint } from "@/lib/utils"
import {nanoid} from 'nanoid'
import { LiveObject } from "@liveblocks/client"
import { LayerPreview } from "./LayerPreview"
import SelectionBox from "./SelectionBox"
interface CanvasProps {
    boardId: string
}
const MAX_LAYERS = 100;

export const Canvas = ({boardId}: CanvasProps) => {
    const layerIds = useStorage((root) => root.layerIds)

    const info = useSelf((me) => me.info)
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    })
    const [lastUsedColor, setLastUsedColor] = useState<Color>({r: 255, g: 255, b: 255})

    const [camera, setCamera] = useState<Camera>({x: 0, y: 0})
    const history = useHistory()
    const canUndo = useCanUndo()
    const canRedo = useCanRedo()
    const insertLayer = useMutation((
        {storage, setMyPresence}, 
        layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note,
        position: Point
    ) => {
        const liveLayers = storage.get('layers')
        if (liveLayers.size >= MAX_LAYERS) {
            return
        }

        const liveLayerIds = storage.get('layerIds')
        const layerId = nanoid()
        const layer = new LiveObject({
            type: layerType,
            x: position.x,
            y: position.y,
            height: 100,
            width: 100,
            fill: lastUsedColor,
        })

        liveLayerIds.push(layerId)
        liveLayers.set(layerId, layer)
        setMyPresence({selection: [layerId]}, {addToHistory: true})
        setCanvasState({mode: CanvasMode.None})
    }, [lastUsedColor])
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

    const onPointerUp = useMutation(({}, e) => {
        const point = pointerEventToCanvasPoint(e, camera)
        if (canvasState.mode === CanvasMode.Inserting) {
            insertLayer(canvasState.layerType, point)
        } else {
            setCanvasState({mode: CanvasMode.None})
        }

        history.resume()
    }, [camera, canvasState])

    const selections = useOthersMapped((other) => other.presence.selection)
    const layerIdsToColorSelection = useMemo(() => {
        const layerIdsToColorSelection: Record<string, string> = {}

        for (const user of selections) {
            const [connectionId, selection] = user
            for (const layerId of selection) {
                layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId)
            }
        }

        return layerIdsToColorSelection
    }, []) 

    const onLayerPointerDown = useMutation(({self, setMyPresence}, e: React.PointerEvent, layerId: string) => {
        if (canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Inserting) {
            return
        }

        history.pause()
        e.stopPropagation()

        const point = pointerEventToCanvasPoint(e, camera)

        if (!self.presence.selection.includes(layerId)) {
            setMyPresence({selection: [layerId]}, {addToHistory: true})
        }

        setCanvasState({
            mode: CanvasMode.Translating,
            current: point
        })
    }, [
        setCanvasState,
        camera,
        history,
        canvasState.mode
    ])

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
                onPointerUp={onPointerUp}
            >
                <g
                    style={{
                        transform: `translate(${camera.x}px, ${camera.y}px)`
                    }}
                >
                    {layerIds.map((layerId) => (
                        <LayerPreview
                            key={layerId}
                            id={layerId}
                            onLayerPointerDown={onLayerPointerDown}
                            selectionColor={layerIdsToColorSelection[layerId]}
                        ></LayerPreview>
                    ))}
                    <SelectionBox
                        onResizeHandlePointerDown={() => {}}
                    ></SelectionBox>
                    <CursorPresence />
                </g>
            </svg>
        </main>
    )
}