import PodcastList from "../models/PodcastList"

const Category = {
    
    async podcastLists(parent, args, contextValue, info) {

        const podcastLists = await PodcastList.find({ 'categories': parent.id })

        return podcastLists

    }

}

export { Category as default }