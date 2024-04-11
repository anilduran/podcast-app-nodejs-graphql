import mongoose from 'mongoose'

interface IUser {
    username: string
    email: string
    password: string
    profilePhotoUrl: string
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
    }
})

const User = mongoose.model<IUser>('User', userSchema)

export { User as default }