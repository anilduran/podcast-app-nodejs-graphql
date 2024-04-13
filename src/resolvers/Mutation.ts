import User from '../models/User'
import Podcast from '../models/Podcast'
import PodcastList from '../models/PodcastList'
import Category from '../models/Category'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Playlist from '../models/Playlist'
import authenticate from '../middlewares/authenticate'
import { GraphQLError } from 'graphql'
import PodcastComment from '../models/PodcastComment'
import PodcastListComment from '../models/PodcastListComment'

const Mutation = {
    async createUser(parent, args, contextValue, info) {

        authenticate(contextValue.token)

        const { username, email, password, profilePhotoUrl } = args.data

        const user = new User({ username, email, password, profilePhotoUrl })

        await user.save()

        return user

    },
    async updateUser(parent, args, contextValue, info) {

        const authenticatedUser = authenticate(contextValue.token)
        
        const user = await User.findById(args.id)

        if (user.id != authenticatedUser.id) {
            throw new GraphQLError('You are not authorized to update this user!')
        }
        
        const { username, email, password, profilePhotoUrl } = args.data

        if (username) {
            user.username = username
        }

        if (email) {
            user.email = email
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10)
         
            user.password = hashedPassword
        }

        if (profilePhotoUrl) {
            user.profilePhotoUrl = profilePhotoUrl
        }

        await user.save()

        return user

    },
    async deleteUser(parent, args, contextValue, info) {

        const authenticatedUser = authenticate(contextValue.token)

        const user = await User.findById(args.id)

        if (authenticatedUser.id != user.id) {
            throw new GraphQLError('You are not authorized to delete this user!')
        }

        const deletedUser = await User.findByIdAndDelete(args.id)

        return deletedUser

    },
    async createPodcast(parent, args, contextValue, info) {

        const user = authenticate(contextValue.token)

        const { name, description, imageUrl, podcastUrl, isVisible } = args.data

        const podcast = new Podcast({ name, description, imageUrl, podcastUrl, creator: user.id, isVisible })

        await podcast.save()

        return podcast

    },
    async updatePodcast(parent, args, contextValue, info) {

        const user = authenticate(contextValue.token)

        const { name, description, imageUrl, podcastUrl, isVisible } = args.data

        const podcast = await Podcast.findById(args.id)

        const podcastList = await PodcastList.findById(podcast.podcastList)

        if (podcastList.creator.toString() != user.id) {
            throw new GraphQLError('You are not authorized to update this podcast!')
        }

        if (name) {
            podcast.name = name
        }

        if (description) {
            podcast.description = description
        }

        if (imageUrl) {
            podcast.imageUrl = imageUrl
        }
        
        if (podcastUrl) {
            podcast.podcastUrl = podcastUrl
        }

        if (typeof isVisible !== 'undefined' || isVisible !== null) {
            podcast.isVisible = isVisible
        }

        await podcast.save()

        return podcast

    },
    async deletePodcast(parent, args, contextValue, info) {

        const user = authenticate(contextValue.token)

        const podcast = await Podcast.findById(args.id)

        const podcastList = await PodcastList.findById(podcast.podcastList)

        if (podcastList.creator.toString() != user.id) {
            throw new GraphQLError('You are not authorized to delete this podcast!')
        }

        const deletedPodcast = await Podcast.findByIdAndDelete(podcast.id)

        return deletedPodcast

    },
    async createPodcastList(parent, args, contextValue, info) {

        const user = authenticate(contextValue.token)

        const { name, description, imageUrl, isVisible } = args.data

        const podcastList = new PodcastList({ name, description, imageUrl, creator: user.id, isVisible })

        podcastList.save()

        return podcastList

    },
    async updatePodcastList(parent, args, contextValue, info) {

        const user = authenticate(contextValue.token)

        const podcastList = await PodcastList.findById(args.id)

        if (podcastList.creator.toString() != user.id) {
            throw new GraphQLError('You are not authorized to update this podcast list!')
        }

        const { name, description, imageUrl, isVisible } = args.data

        if (name) {
            podcastList.name = name
        }

        if (description) {
            podcastList.description = description
        }

        if (imageUrl) {
            podcastList.imageUrl = imageUrl
        }

        if (typeof isVisible !== 'undefined' || isVisible !== null) {
            podcastList.isVisible = isVisible
        }

        await podcastList.save()

        return podcastList

    },
    async deletePodcastList(parent, args, contextValue, info) {

        const user = authenticate(contextValue.token)

        const podcastList = await PodcastList.findById(args.id)

        if (podcastList.creator.toString() != user.id) {
            throw new GraphQLError('You are not authorized to delete this podcast list!')
        }

        const deletedPodcastList = await PodcastList.findByIdAndDelete(args.id)

        return deletedPodcastList

    },
    async createCategory(parent, args, contextValue, info) {

        authenticate(contextValue.token)

        const category = new Category({
            name: args.data.name,
            description: args.data.description
        })

        await category.save()

        return category

    },
    async updateCategory(parent, args, contextValue, info) {

        authenticate(contextValue.token)

        const category = await Category.findById(args.id)

        const { name, description } = args.data

        if (name) {
            category.name = name
        }

        if (description) {
            category.description = description
        }

        await category.save()

        return category

    },
    async deleteCategory(parent, args, contextValue, info) {

        authenticate(contextValue.token)

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
        const user = authenticate(contextValue.token)

        const { name, description, imageUrl } = args.data

        const playlist = new Playlist({ name, description, imageUrl, creator: user.id })

        await playlist.save()

        return playlist

    },
    async updatePlaylist(parent, args, contextValue, info) {
        const user = authenticate(contextValue.token)

        const playlist = await Playlist.findById(args.id)

        if (playlist.creator.toString() != user.id) {
            throw new GraphQLError('You are not authorized to update this playlist!')
        }

        const { name, description, imageUrl } = args.data
        
        if (name) {
            playlist.name = name
        }

        if (description) {
            playlist.description = description
        }

        if (imageUrl) {
            playlist.imageUrl = imageUrl
        }

        await playlist.save()

        return playlist

    },
    async deletePlaylist(parent, args, contextValue, info) {
        const user = authenticate(contextValue.token)

        const playlist = await Playlist.findById(args.id)

        if (playlist.creator.toString() != user.id) {
            throw new GraphQLError('You are not authorized to delete this playlist!')
        }

        const deletedPlaylist = await Playlist.findByIdAndDelete(playlist.id)

        return deletedPlaylist

    },
    async addPodcastToPlaylist(parent, args, contextValue, info) {

        const user = authenticate(contextValue.token)
        
        const playlist = await Playlist.findById(args.playlist)

        if (playlist.creator.toString() != user.id) {
            throw new GraphQLError('You are not authorized to perform this action!')
        }

        const podcast = await Podcast.findById(args.podcast)
        
        playlist.podcasts.push(args.podcast)
        
        await playlist.save()

        return podcast

    },
    async removePodcastFromPlaylist(parent, args, contextValue, info) {

        const user = authenticate(contextValue.token)

        const playlist = await Playlist.findById(args.playlist)

        if (playlist.creator.toString() != user.id) {
            throw new GraphQLError('You are not authorized to perform this action!')
        }
        
    },
    async createPodcastComment(parent, args, contextValue, info) {
        const user = authenticate(contextValue.token)
        
        const podcastComment = new PodcastComment({
            content: args.data.content,
            podcast: args.data.podcast,
            user: user.id
        })

        await podcastComment.save()

        return podcastComment

    },
    async updatePodcastComment(parent, args, contextValue, info) {
        const user = authenticate(contextValue.token)

        const podcastComment = await PodcastComment.findById(args.id)

        if (podcastComment.user.toString() != user.id) {
            throw new GraphQLError('You are not authorized to update this podcast comment!')
        }

        if (args.data.content) {
            podcastComment.content = args.data.content
        }

        await podcastComment.save()

        return podcastComment

    },
    async deletePodcastComment(parent, args, contextValue, info) {
        const user = authenticate(contextValue.token)

        const podcastComment = await PodcastComment.findById(args.id)

        if (podcastComment.user.toString() != user.id) {
            throw new GraphQLError('You are not authorized to delete this podcast comment!')
        }

        const deletedPodcastComment = await PodcastComment.findByIdAndDelete(args.id)

        return deletedPodcastComment

    },
    async createPodcastListComment(parent, args, contextValue, info) {
        const user = authenticate(contextValue.token)

        const podcastListComment = new PodcastListComment({
            content: args.data.content,
            podcastList: args.data.podcastList,
            user: user.id
        })

        await podcastListComment.save()

        return podcastListComment

    },
    async updatePodcastListComment(parent, args, contextValue, info) {
        const user = authenticate(contextValue.token)

        const podcastListComment = await PodcastListComment.findById(args.id)

        if (podcastListComment.user.toString() != user.id) {
            throw new GraphQLError('You are not authorized to update this podcast list comment!')
        }

        if (args.data.content) {
            podcastListComment.content = args.data.content
        }

        await podcastListComment.save()

        return podcastListComment

    },
    async deletePodcastListComment(parent, args, contextValue, info) {
        const user = authenticate(contextValue.token)

        const podcastListComment = await PodcastListComment.findById(args.id)

        if (podcastListComment.user.toString() != user.id) {
            throw new GraphQLError('You are not authorized to delete this podcast list comment!')
        }

        const deletedPodcastListComment = await PodcastListComment.findByIdAndDelete(args.id)

        return deletedPodcastListComment

    }
}

export { Mutation as default }