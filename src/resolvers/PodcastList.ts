import User from '../models/User'
import Podcast from '../models/Podcast'
import Category from '../models/Category'

const PodcastList = {
    async creator(parent, args, contextValue, info) {
        const user = await User.findById(parent.creator)
        return user
    },
    async podcasts(parent, args, contextValue, info) {

        const podcasts = await Podcast.find({
            creator: parent.creator
        })

        return podcasts

    },
    async categories(parent, args, contextValue, info) {

        const categories = await Category.find({
            
        })
        
        return categories

    }
}

export { PodcastList as default }