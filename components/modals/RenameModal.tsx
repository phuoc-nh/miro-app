'use client'

import {
    DialogContent,
    Dialog,
    DialogDescription,
    DialogHeader,
    DialogClose,
    DialogFooter,
    DialogTitle
} from '@/components/ui/dialog'
import { useRenameModal } from '@/store/useRenameModal'
import { FormEvent, FormEventHandler, useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'

export const RenameModal = () => {
    const {pending, mutate} = useApiMutation(api.board.update)
    const {
        isOpen,
        onClose,
        initialValues
    } = useRenameModal()

    const [title, setTitle] = useState(initialValues.title)
    useEffect(() => {
        setTitle(initialValues.title)
    }, [initialValues.title])

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        mutate({
            id: initialValues.id,
            title
        }).then(() => {
            onClose()
            toast.success('Board renamed')
        }).catch(() => toast.error('Failed to rename'))
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit board title
                    </DialogTitle>
                </DialogHeader>

                <DialogDescription>
                    Enter a new title
                </DialogDescription>
                <form action="" onSubmit={onSubmit} className='space-y-4'>
                    <Input
                        disabled={false}
                        required
                        maxLength={60}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Board title'
                    >
                    </Input>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type='button' variant='outline'>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={false} type='submit'>
                            Save
                        </Button>
                    </DialogFooter>
                </form>
                
            </DialogContent>

        </Dialog>
    )
}