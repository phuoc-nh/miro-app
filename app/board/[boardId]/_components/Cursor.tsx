'use client'

import { connectionIdToColor } from "@/lib/utils"
import { useOther } from "@/liveblocks.config"
import { MousePointer2 } from "lucide-react"
import { memo, useMemo } from "react"

interface CursorProps {
  connectionId: number
} 

const Cursor = ({connectionId}: CursorProps) => {
  const info = useOther(connectionId, (other) => other.info)
  const cursor = useOther(connectionId, (other) => other.presence.cursor)

  const name = info?.name || "Teammate"
  if (!cursor) return null

  const { x, y } = cursor

  return (
    <foreignObject
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      height={50}
      width={name.length * 10 + 20} 
      className="relative drop-shadow-md"
    >
      <MousePointer2 
        style={{
          fill: connectionIdToColor(connectionId),
          color: connectionIdToColor(connectionId),
        }}
        className="h-5 w-5" />

      <div
        className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold"
      >
        {name}
      </div>
    </foreignObject>
  )
}

export default Cursor