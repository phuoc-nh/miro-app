'use client'

import { useStorage } from "@/liveblocks.config"
import { LayerType } from "@/types/canvas"
import { useMemo } from "react"
import Rectangle from "./Rectangle"

interface LayerPreviewProps {
  id: string
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void
  selectionColor?: string
}

export const LayerPreview = ({
  id,
  onLayerPointerDown,
  selectionColor = '#000',
}: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id))
    if (!layer) {
        return null
    }

    console.log('LayerPreview', layer.type, layer)

    switch (layer.type) {
      case LayerType.Rectangle:
        return (
          <Rectangle 
            id={id} 
            layer={layer} 
            onPointerDown={onLayerPointerDown} 
            selectionColor={selectionColor}
          ></Rectangle>
        )
      default:
        console.log('Unknown layer type', layer.type)
        return null
    }

}