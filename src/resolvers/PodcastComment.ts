import Podcast from "../models/Podcast"
import User from "../models/User"

const PodcastComment = {
    async podcast(parent, args, contextValue, info) {
        const podcast = await Podcast.findById(parent.podcast)
        return podcast
    },
    async user(parent, args, contextValue, info) {
        const user = await User.findById(parent.user)
        return user
    }
}


export { PodcastComment as default }