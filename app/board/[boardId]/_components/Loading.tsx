'use client'

import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";
import { Info } from "./Info";
import { Participants } from "./Participants";
import { Toolbar } from "./Toolbar";

export const Loading = () => {
    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
            <Loader className="h-6 w-6 text-muted-foreground animate-spin"></Loader>
            <Info.Skeleton></Info.Skeleton>
            <Participants.Skeleton></Participants.Skeleton>
            <Toolbar.Skeleton></Toolbar.Skeleton>
        </main>
    )
}