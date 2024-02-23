"use client"

import { Link, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { Overlay } from "./Overlay";
import { formatDistance, formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { Footer } from "./Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/Actions";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";

interface BoardCardProps {
    id: string;
    title: string;
    authorName: string
    authorId: string;
    createdAt: number;
    imageUrl: string;
    orgId: string;
    isFavorite: boolean
}

export const BoardCard = (props: BoardCardProps) => {
    const {id, title, authorId, authorName, createdAt, imageUrl, orgId, isFavorite} = props
    const {userId} = useAuth()
    const authLabel = userId === authorId ? 'You' : authorName
    const createdAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true,
    })

    const {mutate: onFavorite } = useApiMutation(api.board.favorite)
    const {mutate: onUnFavorite } = useApiMutation(api.board.unfavorite)

    const toggleFavorite = () => {
        if (isFavorite) {
            onUnFavorite({id, orgId})
        } else {
            onFavorite({id, orgId})
        }
    }

    return (
        // <Link href={`/board/${id}`}>
        
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1 bg-amber-50">
                    <Image 
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-fit"
                    />
                    <Overlay />
                    <Actions 
                        id={id}
                        title={title}
                        side="right"
                    >   
                        <button
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none "
                        >
                            <MoreHorizontal 
                                className="text-white opacity-75 hover:opacity-100 transition-opacity "
                            />
                        </button>
                    </Actions>
                </div>
                <Footer
                    title={title}
                    authorLabel={authLabel}
                    createdAtLabel={createdAtLabel}
                    onClick={toggleFavorite}
                    disabled={false}
                    isFavorite={isFavorite} />
            </div>
        // </Link>
    )
}

BoardCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div className="aspect-[100/127] border rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full">

            </Skeleton>
        </div>
    )
}