import mongoose from "mongoose";

interface IPlaylist {
    name: string
    description: string
    imageUrl: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}

const playlistSchema = new mongoose.Schema<IPlaylist>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    deletedAt: {
        type: Date
    }
})


const Playlist = mongoose.model<IPlaylist>('Playlist', playlistSchema)

export { Playlist as default }