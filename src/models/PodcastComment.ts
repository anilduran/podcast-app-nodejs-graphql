import mongoose from "mongoose";

interface IPodcastComment {
    content: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date,
    isDeleted: boolean
    user: mongoose.Types.ObjectId
    podcast: mongoose.Types.ObjectId
}


const podcastCommentSchema = new mongoose.Schema<IPodcastComment>({
    content: {
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
        type: Date
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    podcast: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Podcast'
    }
})

const PodcastComment = mongoose.model<IPodcastComment>('PodcastComment', podcastCommentSchema)

export default PodcastComment