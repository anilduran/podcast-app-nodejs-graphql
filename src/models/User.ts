import mongoose from 'mongoose'

interface IUser {
    username: string
    email: string
    password: string
    profilePhotoUrl: string
    isDeleted: boolean
    likedPodcasts: Array<mongoose.Types.ObjectId>
    subscribedPodcastLists: Array<mongoose.Types.ObjectId>
    deletedAt: Date
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePhotoUrl: {
        type: String,
        required: false
    },
    likedPodcasts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Podcast'            
        }
    ],
    subscribedPodcastLists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PodcastList'
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

const User = mongoose.model<IUser>('User', userSchema)

export { User as default }