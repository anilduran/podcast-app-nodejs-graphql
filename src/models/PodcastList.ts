import mongoose, { mongo } from 'mongoose'

interface IPodcastList {
    name: string
    description: string
    imageUrl: string
    categories: Array<mongoose.Types.ObjectId>
    podcasts: Array<mongoose.Types.ObjectId>
    creator: mongoose.Types.ObjectId
    isVisible: boolean
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date   
}

const podcastListSchema = new mongoose.Schema<IPodcastList>({
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
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category'
        }
    ],
    podcasts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Podcast'
        }
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
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
        type: Date
    }
})

const PodcastList = mongoose.model<IPodcastList>('PodcastList', podcastListSchema)

export { PodcastList as default }