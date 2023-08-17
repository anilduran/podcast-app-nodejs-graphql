import mongoose from 'mongoose'

const podcastListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
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

const PodcastList = mongoose.model('PodcastList', podcastListSchema)

export { PodcastList as default }