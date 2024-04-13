import PodcastList from "../models/PodcastList"
import User from "../models/User"

const PodcastListComment = {
    async podcastList(parent, args, contextValue, info) {
        const podcastList = await PodcastList.findById(parent.podcastList)
        return podcastList
    },
    async user(parent, args, contextValue, info) {
        const user = await User.findById(parent.user)
        return user
    }
}


export { PodcastListComment as default }