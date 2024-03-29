import {mutation, query} from './_generated/server'
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
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error('Unauthorized')
        }

        const favorite = await ctx.db.query('userFavorites')
            .withIndex('by_user_board', (q) =>
                q
                    .eq('userId', identity.subject)
                    .eq('boardId', args.id)
            )
            .unique()

        if (favorite) {
            await ctx.db.delete(favorite._id)
        }

        await ctx.db.delete(args.id)
    } 
})

export const update =  mutation({
    args: {id: v.id('boards'), title: v.string()},
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity()
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

export const favorite = mutation({
    args: {id: v.id('boards'), orgId: v.string()},
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error('Unauthorized')
        }
        
        const board = await ctx.db.get(args.id)
        if (!board) throw new Error('Board not found')

        const userId = identity.subject
        const existingFavorite = await ctx.db
            .query('userFavorites')
            .withIndex('by_user_board_org', (q) => 
                q
                    .eq('userId', userId)
                    .eq('boardId', board._id)
                    .eq('orgId', args.orgId)
            ).unique()

        if (existingFavorite) {
            throw new Error('Board already favorited')
        }

        await ctx.db.insert('userFavorites', {
            boardId: board._id,
            userId,
            orgId: args.orgId
        })

        return board
    },  
})

export const unfavorite = mutation({
    args: {id: v.id('boards'), orgId: v.string()},
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error('Unauthorized')
        }
        
        const board = await ctx.db.get(args.id)
        if (!board) throw new Error('Board not found')

        const userId = identity.subject
        const existingFavorite = await ctx.db
            .query('userFavorites')
            .withIndex('by_user_board', (q) => 
                q
                    .eq('userId', userId)
                    .eq('boardId', board._id)
            ).unique()

        if (!existingFavorite) {
            throw new Error('Favorite board not found')
        }

        await ctx.db.delete(existingFavorite._id)

        return board

    },  
})

export const get = query({
    args: {id: v.id('boards')},
    async handler(ctx, args) {
        const board = await ctx.db.get(args.id)

        return board    
    },
})