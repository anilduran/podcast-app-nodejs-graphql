import User from '../models/User'
import Podcast from '../models/Podcast'
import Category from '../models/Category'

const PodcastList = {
    async creator(parent, args, ctx, info) {
        const user = await User.findById(parent.creator)
        return user
    },
    async podcasts(parent, args, ctx, info) {

        const podcasts = await Podcast.find({
            creator: parent.creator
        })

        return podcasts

    },
    async categories(parent, args, ctx, info) {

        const categories = await Category.find({
            
        })
        
        return categories

    }
}

export { PodcastList as default }