import mongoose from 'mongoose'

const bookmarkSchema = new mongoose.Schema({
    podcastId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Podcast'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Bookmark = mongoose.model('Bookmark', bookmarkSchema)

export { Bookmark as default }