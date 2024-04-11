import User from '../models/User'
import Podcast from '../models/Podcast'
import PodcastList from '../models/PodcastList'
import Category from '../models/Category'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const Mutation = {
    async createUser(parent, args, contextValue, info) {

        const { username, email, password, profilePhotoUrl } = args.data

        const user = new User({ username, email, password, profilePhotoUrl })

        await user.save()

        return user

    },
    async updateUser(parent, args, contextValue, info) {
        
        const user = await User.findById(args.id)
        
        const { username, email, password, profilePhotoUrl } = args.data

        user.username = username
        user.email = email
        user.password = password
        user.profilePhotoUrl = profilePhotoUrl

        user.save()

        return user

    },
    async deleteUser(parent, args, contextValue, info) {

        const user = await User.findByIdAndDelete(args.id)

        return user

    },
    async createPodcast(parent, args, contextValue, info) {

        const { name, description, imageUrl, podcastUrl, creator } = args.data

        const podcast = new Podcast({ name, description, imageUrl, podcastUrl, creator })

        await podcast.save()

        return podcast

    },
    async updatePodcast(parent, args, contextValue, info) {

        const podcast = await Podcast.findById(args.id)

        const { name, description, imageUrl, podcastUrl, creator } = args.data

        podcast.name = name
        podcast.description = description
        podcast.imageUrl = imageUrl
        podcast.podcastUrl = podcastUrl
        podcast.creator = creator

        await podcast.save()

        return podcast

    },
    async deletePodcast(parent, args, contextValue, info) {

        const podcast = await Podcast.findByIdAndDelete(args.id)
        return podcast

    },
    async createPodcastList(parent, args, contextValue, info) {

        const { name, description, imageUrl, creator } = args.data

        const podcastList = new PodcastList({ name, description, imageUrl, creator })

        podcastList.save()

        return podcastList

    },
    async updatePodcastList(parent, args, contextValue, info) {

        const podcastList = await PodcastList.findById(args.id)

        const { name, description, imageUrl, creator } = args.data

        podcastList.name = name
        podcastList.description = description
        podcastList.imageUrl = imageUrl
        podcastList.creator = creator

        podcastList.save()

        return podcastList

    },
    async deletePodcastList(parent, args, contextValue, info) {

        const podcastList = await PodcastList.findByIdAndDelete(args.id)

        return podcastList

    },
    async createCategory(parent, args, contextValue, info) {

        const category = new Category({
            name: args.data.name,
            description: args.data.description
        })

        await category.save()

        return category

    },
    async updateCategory(parent, args, contextValue, info) {

        const category = await Category.findById(args.id)

        category.name = args.data.name
        category.description = args.data.description

        await category.save()

        return category

    },
    async deleteCategory(parent, args, contextValue, info) {

        const category = await Category.findByIdAndDelete(args.id)
        
        return category

    },
    async signIn(parent, args, contextValue, info) {
  
        const user = await User.findOne({ email: args.data.email })
    
        if (!user) {
            throw new Error('User does not exist!')
        } 

        if (!await bcrypt.compare(args.data.password, user.password)) {
            throw new Error('Password is wrong!')
        }
     
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email
            },
            process.env.SECRET,
            {
                expiresIn: '24h'
            }
        )

        return token

    },
    async signUp(parent, args, contextValue, info) {

        const userExists = await User.exists({
            $or: [
                {
                    username: args.data.username
                },
                {
                    email: args.data.email
                }
            ]
        })
 
        if (userExists) {
            throw new Error('User already exists!')
        } 

        const encryptedPassword = await bcrypt.hash(args.data.password, 10)

        const user = new User({
            username: args.data.username,
            email: args.data.email,
            password: encryptedPassword,
        })

        await user.save()
    
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email
            },
            process.env.SECRET,
            {
                expiresIn: '24h'
            }
        )
   
     
        return token

    },
    async createPlaylist(parent, args, contextValue, info) {

    },
    async updatePlaylist(parent, args, contextValue, info) {

    },
    async deletePlaylist(parent, args, contextValue, info) {

    },
    async addPodcastToPlaylist(parent, args, contextValue, info) {

    },
    async removePodcastFromPlaylist(parent, args, contextValue, info) {
        
    }
}

export { Mutation as default }