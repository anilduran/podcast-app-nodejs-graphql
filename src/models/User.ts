import mongoose from 'mongoose'

interface IUser {
    username: string
    email: string
    password: string
    profilePhotoUrl: string
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
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

const User = mongoose.model<IUser>('User', userSchema)

export { User as default }