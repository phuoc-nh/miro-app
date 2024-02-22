'use client'

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "./ui/dropdown-menu"
import { Link2, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api"
import { ConfirmModal } from "./ConfirmMoal"
import { Button } from "./ui/button"
import { useRenameModal } from "@/store/useRenameModal"
interface ActionsProps {
    children: React.ReactNode
    side?: DropdownMenuContentProps['side']
    sideOffset?: DropdownMenuContentProps['sideOffset']
    id: string
    title: string
}

export const Actions = ({
    children,
    title,
    id,
    sideOffset,
    side
}: ActionsProps) => {
    const { onOpen } = useRenameModal()

    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`
        ).then(() => {
            toast.success('Linked copied')
        }).catch(() => {
            toast.error('Failed to copy link')
        })
    }
    const { mutate, pending} = useApiMutation(api.board.remove)
    const onDelete = () => {
        mutate({id})
            .then(() => toast.success('Board deleted'))
            .catch(() => toast.error('Failed to delete board'))
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side={side}
                sideOffset={sideOffset}
                className="w-60"
                onClick={(e) => e.stopPropagation()}
            >
                <DropdownMenuItem
                    onClick={onCopyLink}
                    className="p-3 cursor-pointer"
                >
                    <Link2 className="h-4 w-4 mr-2"></Link2>
                    Copy board link
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => onOpen(id, title)}
                    className="p-3 cursor-pointer"
                >
                    <Pencil className="h-4 w-4 mr-2"></Pencil>
                    Rename
                </DropdownMenuItem>

                <ConfirmModal 
                    header="Delete board?"
                    description="This will delete the board and all of its contents."
                    onConfirm={onDelete}
                >
                    <Button
                        variant='ghost'
                        className="p-3 cursor-pointer text-sm justify-start font-normal w-full"
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </Button>
                </ConfirmModal>
                
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}