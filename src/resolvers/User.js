import Podcast from '../models/Podcast'
import PodcastList from '../models/PodcastList'
import Bookmark from '../models/Bookmark'

const User = {
    async podcasts(parent, args, ctx, info) {

        const podcasts = await Podcast.find({
            creator: parent.id
        })

        return podcasts

    },
    async podcastLists(parent, args, ctx, info) {

        const podcastLists = await PodcastList.find({
            creator: parent.id
        })

        return podcastLists

    },
    async bookmarks(parent, args, ctx, info) {

        const bookmarks = await Bookmark.find({
            userId: parent.id
        })

        return bookmarks

    }
}

export { User as default }