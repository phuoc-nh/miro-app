'use client'

import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { cn } from "@/lib/utils"
import { useMutation } from "convex/react"
import { Plus } from "lucide-react"
import { toast } from "sonner"

interface NewBoardButtonProps {
    orgId: string
    disabled?: boolean
}

export const NewBoardButton = ({orgId, disabled}: NewBoardButtonProps) => {
    const {mutate, pending} = useApiMutation(api.board.create)
    const onClick = () => {
        mutate({
            orgId,
            title: "Untitled"
        })
            .then((id) => {
                toast.success('Board created')
            })
            .catch(() => {
                toast.error('Fail to create board')
            })
    }
    
    return (
        
        <button 
            onClick={onClick}
            className={cn(
                "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
                (pending || disabled) && "opacity-75 hover:bg-blue-600 cursor-not-allowed"
            )}
            disabled={pending || disabled} >
                <Plus className="text-white w-12 h-12 stroke-1"></Plus>
                <p className="text-sm text-white font-light">
                    New board
                </p>
            </button>
    )
}