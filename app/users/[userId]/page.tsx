import React from 'react'

interface userIdpageProps {
    params: {
        userId: string
    }
}

export default function page({params}: userIdpageProps) {
  return (
    <div>aaa{params.userId}</div>
  )
}
