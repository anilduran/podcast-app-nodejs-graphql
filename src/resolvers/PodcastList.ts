import User from '../models/User'
import { default as PodcastListModel } from '../models/PodcastList'
import PodcastListComment from '../models/PodcastListComment'

const PodcastList = {
    async creator(parent, args, contextValue, info) {
        const user = await User.findById(parent.creator)
        return user
    },
    async podcasts(parent, args, contextValue, info) {

       const podcastList = await PodcastListModel.findById(parent.id).populate('podcasts').exec()

       return podcastList.podcasts

    },
    async categories(parent, args, contextValue, info) {

        const podcastList = await PodcastListModel.findById(parent.id).populate('categories').exec()

        return podcastList.categories

    },
    async comments(parent, args, contextValue, info) {
        const comments = await PodcastListComment.find({ podcastList: parent.id })
        return comments
    }
}

export { PodcastList as default }