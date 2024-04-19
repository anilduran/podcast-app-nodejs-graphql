import mongoose from "mongoose";

interface IPodcastListComment {
    content: string
    deletedAt: Date
    isDeleted: boolean
    user: mongoose.Types.ObjectId
    podcastList: mongoose.Types.ObjectId
}

const podcastListCommentSchema = new mongoose.Schema<IPodcastListComment>({
    content: {
        type: String,
        required: true
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
}, {
    timestamps: true
});

const PodcastListComment = mongoose.model<IPodcastListComment>('PodcastListComment', podcastListCommentSchema)

export default PodcastListComment