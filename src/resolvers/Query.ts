import User from '../models/User'
import Podcast from '../models/Podcast'
import PodcastList from '../models/PodcastList'
import Category from '../models/Category'
import authenticate from '../middlewares/authenticate';
import PodcastComment from '../models/PodcastComment';
import PodcastListComment from '../models/PodcastListComment';

const Query = {
    async users(parent, args, contextValue, info) {
        authenticate(contextValue.token)

        let query = {}

        if (args.cursor) {
            query = {
                _id: { $gt: args.cursor }
            }
        }

        const users = await User.find(query).limit(args.limit + 1).sort({ _id: 1 }).exec()

        const hasNextPage = users.length > args.limit
        const edges = hasNextPage ? users.slice(0, -1) : users
        const endCursor = edges[edges.length - 1]?._id

        return {
            edges,
            pageInfo: {
                hasNextPage,
                endCursor
            }
        }
    },
    async podcasts(parent, args, contextValue, info) {
        authenticate(contextValue.token)

        let query = {}

        if (args.cursor) {
            query = {
                _id: { $gt: args.cursor }
            }
        }

        const podcasts = await Podcast.find(query).limit(args.limit + 1).sort({ _id: 1 }).exec()

        const hasNextPage = podcasts.length > args.limit
        const edges = hasNextPage ? podcasts.slice(0, -1) : podcasts
        const endCursor = edges[edges.length - 1]?._id

        return {
            edges,
            pageInfo: {
                hasNextPage,
                endCursor
            }
        }
    },
    async podcastLists(parent, args, contextValue, info) {
        authenticate(contextValue.token)

        let query = {}

        if (args.cursor) {
            query = {
                _id: { $gt: args.cursor }
            }
        }

        const podcastLists = await PodcastList.find(query).limit(args.limit + 1).sort({ _id: 1 }).exec()

        const hasNextPage = podcastLists.length > args.limit
        const edges = hasNextPage ? podcastLists.slice(0, -1) : podcastLists
        const endCursor = edges[edges.length - 1]?._id

        return {
            edges,
            pageInfo: {
                hasNextPage,
                endCursor
            }
        }
    },
    async categories(parent, args, contextValue, info) {
        authenticate(contextValue.token)
        
        let query = {}

        if (args.cursor) {
            query = {
                _id: { $gt: args.cursor }
            }
        }
        
        const categories = await Category.find(query).limit(args.limit + 1).sort({ _id: 1 }).exec()

        const hasNextPage = categories.length > args.limit
        const edges = hasNextPage ? categories.slice(0, -1) : categories
        const endCursor = edges[edges.length - 1]?._id

        return {
            edges,
            pageInfo: {
                hasNextPage,
                endCursor
            }
        }
    },
    async me(parent, args, contextValue, info) {
        const authenticatedUser = authenticate(contextValue.token)

        const user = await User.findById(authenticatedUser.id)

        return user
    },
    async podcastComments(parent, args, contextValue, info) {
        authenticate(contextValue.token)

        let query = {}

        if (args.cursor) {
            query = {
                _id: { $gt: args.cursor }
            }
        }

        const podcastComments = await PodcastComment.find(query).limit(args.limit + 1).sort({ _id: 1 }).exec()

        const hasNextPage = podcastComments.length > args.limit
        const edges = hasNextPage ? podcastComments.slice(0, -1) : podcastComments
        const endCursor = edges[edges.length - 1]?._id

        return {
            edges,
            pageInfo: {
                hasNextPage,
                endCursor
            }
        }
    },
    async podcastListComments(parent, args, contextValue, info) {
        authenticate(contextValue.token)

        let query = {}

        if (args.cursor) {
            query = {
                _id: { $gt: args.cursor }
            }
        }

        const podcastListComments = await PodcastListComment.find(query).limit(args.limit + 1).sort({ _id: 1 }).exec()

        const hasNextPage = podcastListComments.length > args.limit
        const edges = hasNextPage ? podcastListComments.slice(0, -1) : podcastListComments
        const endCursor = edges[edges.length - 1]?._id

        return {
            edges,
            pageInfo: {
                hasNextPage,
                endCursor
            }
        }
    }
}

export { Query as default }