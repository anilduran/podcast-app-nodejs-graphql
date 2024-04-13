import { default as PlaylistModel } from "../models/Playlist"
import User from "../models/User"

const Playlist = {
    async podcasts(parent, args, contextValue, info) {

        const playlist = await PlaylistModel.findById(parent.id).populate('podcasts').exec()

        return playlist.podcasts

    },
    async creator(parent, args, contextValue, info) {

        const user = await User.findById(parent.creator)
        
        return user

    }
}

export { Playlist as default }