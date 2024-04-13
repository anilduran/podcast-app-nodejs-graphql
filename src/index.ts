import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'
import Podcast from './resolvers/Podcast'
import PodcastList from './resolvers/PodcastList'
import Category from './resolvers/Category'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import Playlist from './resolvers/Playlist'

dotenv.config({
    path: __dirname + '/.env'
})


const server = new ApolloServer({
    typeDefs: readFileSync(join(__dirname, 'schema.graphql'), 'utf-8'),
    resolvers: {
        Query,
        Mutation,
        User,
        Podcast,
        PodcastList,
        Category,
        Playlist
    }    
})



const bootstrap = async () => {
    await mongoose.connect('mongodb://localhost:27017/podcastdb')

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({req, res}) => ({
            token: req.headers.authorization
        })
    })

    console.log('server is listening on' + url)

}

bootstrap()