import mongoose from "mongoose";

interface IPlaylist {
    name: string
    description: string
    imageUrl: string
    creator: mongoose.Types.ObjectId
    podcasts: Array<mongoose.Types.ObjectId>
    isDeleted: boolean
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
    deletedAt: {
        type: Date
    }
}, {
    timestamps: true
})


const Playlist = mongoose.model<IPlaylist>('Playlist', playlistSchema)

export { Playlist as default }