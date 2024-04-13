import mongoose from 'mongoose'

interface IPodcast {
    name: string
    description: string
    imageUrl: string
    podcastUrl: string
    podcastList: mongoose.Schema.Types.ObjectId
    creator: mongoose.Schema.Types.ObjectId
    isVisible: boolean
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
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
    podcastList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PodcastList'
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isVisible: {
        type: Boolean,
        required: true,
        default: true
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
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
   
});

const Podcast = mongoose.model<IPodcast>('Podcast', podcastSchema)

export { Podcast as default }