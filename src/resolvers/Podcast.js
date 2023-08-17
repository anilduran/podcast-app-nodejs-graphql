import User from '../models/User'

const Podcast = {
    async creator(parent, args, ctx, info) {
        const user = await User.findById(parent.creator)

        return user       
    }
}

export { Podcast as default }