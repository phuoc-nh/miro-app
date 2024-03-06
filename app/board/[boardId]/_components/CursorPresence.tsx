'use client'

import { useOthersConnectionIds } from '@/liveblocks.config'
import React, { memo } from 'react'
import Cursor from './Cursor'

const Cursors = () => {
  const ids = useOthersConnectionIds()
  return (
    <>
      {ids.map((id) => (
        <Cursor
          key={id}
          connectionId={id}
        ></Cursor>
      ))}
    </>
  )
}

export default function CursorPresence() {
    


  return (
    <>
      {/* Draft pencil */}
      <Cursors />
    </>
  )
}
