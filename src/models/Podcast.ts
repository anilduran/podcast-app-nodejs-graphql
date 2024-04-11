import mongoose from 'mongoose'

interface IPodcast {
    name: string
    description: string
    imageUrl: string
    podcastUrl: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    creator: mongoose.Schema.Types.ObjectId
}

const podcastSchema = new mongoose.Schema<IPodcast>({
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
    podcastUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    deletedAt: {
        type: Date,
        required: false
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const Podcast = mongoose.model<IPodcast>('Podcast', podcastSchema)

export { Podcast as default }