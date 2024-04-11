import mongoose, { mongo } from 'mongoose'

interface IPodcastList {
    name: string
    description: string
    imageUrl: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    categories: Array<mongoose.Schema.Types.ObjectId>
    creator: mongoose.Schema.Types.ObjectId
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
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category'
        }
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const PodcastList = mongoose.model<IPodcastList>('PodcastList', podcastListSchema)

export { PodcastList as default }