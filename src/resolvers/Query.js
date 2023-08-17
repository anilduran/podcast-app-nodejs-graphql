import User from '../models/User'
import Podcast from '../models/Podcast'
import PodcastList from '../models/PodcastList'
import Bookmark from '../models/Bookmark'
import Category from '../models/Category'

const Query = {
    async users() {
        const users = await User.find()
        return users
    },
    async podcasts() {
        const podcasts = await Podcast.find()
        return podcasts
    },
    async podcastLists() {
        const podcastLists = await PodcastList.find()
        return podcastLists
    },
    async categories() {
        const categories = await Category.find()
        return categories
    },
    async bookmarks() {
        const bookmarks = await Bookmark.find()
        return bookmarks
    },
    async me() {

    }
};

export { Query as default };