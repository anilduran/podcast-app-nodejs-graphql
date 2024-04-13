import mongoose from "mongoose";

interface IPodcastListComment {
    content: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    isDeleted: boolean
    user: mongoose.Schema.Types.ObjectId
    podcastList: mongoose.Schema.Types.ObjectId
}

const podcastListCommentSchema = new mongoose.Schema<IPodcastListComment>({
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
    podcastList: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'PodcastList'
    }
});

const PodcastListComment = mongoose.model<IPodcastListComment>('PodcastListComment', podcastListCommentSchema)

export default PodcastListComment