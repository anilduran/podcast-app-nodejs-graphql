import mongoose from 'mongoose'

interface IPodcast {
    name: string
    description: string
    imageUrl: string
    podcastUrl: string
    podcastList: mongoose.Types.ObjectId
    creator: mongoose.Types.ObjectId
    categories: Array<mongoose.Types.ObjectId>
    isVisible: boolean
    isDeleted: boolean
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
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        }
    ],
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
    deletedAt: {
        type: Date,
        required: false
    },
   
}, {
    timestamps: true
});

const Podcast = mongoose.model<IPodcast>('Podcast', podcastSchema)

export { Podcast as default }