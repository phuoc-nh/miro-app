'use client'

import { Actions } from "@/components/Actions"
import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { useRenameModal } from "@/store/useRenameModal"
import { useQuery } from "convex/react"
import { Menu } from "lucide-react"
import { Poppins } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

interface InfoProps {
    boardId: string
}

const font = Poppins({
    subsets: ['latin'],
    weight: ['600']
})

const TabSeparator = () => {
    return (
        <div className="text-neutral-300 px-1.5">
            |
        </div>
    )
}

export const Info = ({boardId}: InfoProps) => {
    const data = useQuery(api.board.get, {
        id: boardId as Id<'boards'>
    })

    const {onOpen} = useRenameModal()

    if (!data) {
        return <Info.Skeleton /> 
    }

    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
            <Button asChild variant="board" className="px-2">
                <Link href='/'>
                    <Image src='/logo.svg' alt="logo" height={40} width={40}></Image>
                    <span className={cn(
                        "font-semibold text-xl ml-2 text-black",
                        font.className
                    )}>
                        Board
                    </span>
                </Link>
            </Button>
            <TabSeparator></TabSeparator>
            <Button variant='board' className="text-base font-normal px-2" onClick={() => onOpen(data._id, data.title)}>
                {data.title}
            </Button>
            <TabSeparator></TabSeparator>
            <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
                <div>
                    <Hint label="Main menu" side="bottom" sideOffset={10}>
                        <Button size='icon' variant='board'>
                            <Menu></Menu>
                        </Button>
                    </Hint>
                </div>
            </Actions>
        </div>
    )
}

Info.Skeleton = function InfoSkeleton() {
    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]">
            <Skeleton className="h-full w-full bg-muted-400"></Skeleton>
        </div>
    )
}