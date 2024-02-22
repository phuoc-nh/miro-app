import {mutation} from './_generated/server'
import {v} from 'convex/values'

const images = [
    '/placeholders/1.svg',
    '/placeholders/2.svg',
    '/placeholders/3.svg',
    '/placeholders/4.svg',
    '/placeholders/5.svg',
    '/placeholders/6.svg',
    '/placeholders/7.svg',
    '/placeholders/8.svg',
    '/placeholders/9.svg',
    '/placeholders/10.svg',
]

export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error('Unauthorized')
        }

        const randomImage = images[Math.floor(Math.random() * images.length)]
        const board = await ctx.db.insert('boards', {
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage
        })

        return  board
    }
})

export const remove = mutation({
    args: {id: v.id('boards')},
    handler: async (ctx, args) => {
        const identity = ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error('Unauthorized')
        }

        await ctx.db.delete(args.id)
    } 
})

export const update =  mutation({
    args: {id: v.id('boards'), title: v.string()},
    async handler(ctx, args) {
        const identity = ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error('Unauthorized')
        }

        const title = args.title.trim();
        const id = args.id
        if (title.length > 60) {
            throw new Error('Title can not be longer than 60 chars')
        }

        const board = await ctx.db.patch(
            id,
            {
                title
            }
        )

        return board
    },
})