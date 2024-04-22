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
        const users = await User.find()
        return users
    },
    async podcasts(parent, args, contextValue, info) {
        authenticate(contextValue.token)
        const podcasts = await Podcast.find()
        return podcasts
    },
    async podcastLists(parent, args, contextValue, info) {
        authenticate(contextValue.token)
        const podcastLists = await PodcastList.find()
        return podcastLists
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
        const podcastComments = await PodcastComment.find()
        return podcastComments
    },
    async podcastListComments(parent, args, contextValue, info) {
        authenticate(contextValue.token)
        const podcastListComments = await PodcastListComment.find()
        return podcastListComments
    }
};

export { Query as default };