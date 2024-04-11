import User from '../models/User'
import Podcast from '../models/Podcast'
import PodcastList from '../models/PodcastList'
import Category from '../models/Category'
import authenticate from '../middlewares/authenticate';

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
        const categories = await Category.find()
        return categories
    },
    async me(parent, args, contextValue, info) {
        authenticate(contextValue.token)
    }
};

export { Query as default };