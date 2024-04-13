import Playlist from '../models/Playlist'
import Podcast from '../models/Podcast'
import PodcastList from '../models/PodcastList'

const User = {
    async podcasts(parent, args, contextValue, info) {

        const podcasts = await Podcast.find({ creator: parent.id })

        return podcasts

    },
    async podcastLists(parent, args, contextValue, info) {

        const podcastLists = await PodcastList.find({ creator: parent.id })

        return podcastLists

    },
    async playlists(parent, args, contextValue, info) {

        const playlists = await Playlist.find({ creator: parent.id })

        return playlists

    }
}

export { User as default }