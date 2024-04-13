import mongoose from "mongoose";

interface IPlaylist {
    name: string
    description: string
    imageUrl: string
    creator: mongoose.Schema.Types.ObjectId
    podcasts: Array<mongoose.Schema.Types.ObjectId>
    isDeleted: boolean
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
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    podcasts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Podcast'
        }
    ],
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
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