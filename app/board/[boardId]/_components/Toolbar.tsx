'use client'

import { Skeleton } from "@/components/ui/skeleton"
import { ToolButton } from "./ToolButton"
import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from "lucide-react"

export const Toolbar = () => {
    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
            <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
                <ToolButton
                    label="Select"
                    icon={MousePointer2}
                    onClick={() => {}}
                    isActive={false}
                ></ToolButton>
                <ToolButton
                    label="Text"
                    icon={Type}
                    onClick={() => {}}
                    isActive={false}
                ></ToolButton>
                <ToolButton
                    label="Sticky note"
                    icon={StickyNote}
                    onClick={() => {}}
                    isActive={false}
                ></ToolButton>
                <ToolButton
                    label="Rectangle"
                    icon={Square}
                    onClick={() => {}}
                    isActive={false}
                ></ToolButton>
                <ToolButton
                    label="Ellipse"
                    icon={Circle}
                    onClick={() => {}}
                    isActive={false}
                ></ToolButton>
                <ToolButton
                    label="Pen"
                    icon={Pencil}
                    onClick={() => {}}
                    isActive={false}
                ></ToolButton>
            </div>

            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
                <ToolButton
                    label="Undo"
                    icon={Undo2}
                    onClick={() => {}}
                    disabled={false}
                ></ToolButton>
                <ToolButton
                    label="Redo"
                    icon={Redo2}
                    onClick={() => {}}
                    disabled={false}
                ></ToolButton>
            </div>

        </div>
    )
}
Toolbar.Skeleton = function ToolbarSkeleton () {
    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md">
            {/* <Skeleton className="h-full w-full bg-muted"></Skeleton> */}
        </div>
    )
}