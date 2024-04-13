import PodcastComment from '../models/PodcastComment'
import PodcastList from '../models/PodcastList'
import User from '../models/User'

const Podcast = {
    async creator(parent, args, contextValue, info) {
        
        const user = await User.findById(parent.creator)

        return user

    },
    async comments(parent, args, contextValue, info) {
        const comments = await PodcastComment.find({ podcast: parent.id })
        return comments
    }
}

export { Podcast as default }