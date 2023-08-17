import { createSchema, createYoga } from 'graphql-yoga'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'
import Podcast from './resolvers/Podcast'
import PodcastList from './resolvers/PodcastList'
import Category from './resolvers/Category'
import Bookmark from './resolvers/Bookmark'
import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express()

dotenv.config({
    path: __dirname + '/.env'
})

const yoga = createYoga({
    schema: createSchema({
        typeDefs: readFileSync(join(__dirname, 'schema.graphql'), 'utf-8'),
        resolvers: {
            Query,
            Mutation,
            User,
            Podcast,
            PodcastList,
            Category,
            Bookmark
        }
    }),
    context(request) {
        return {
            request
        }
    }
})

app.use(yoga.graphqlEndpoint, yoga)

const bootstrap = async () => {
    await mongoose.connect('mongodb://localhost:27017/podcastdb')

    app.listen(4000, () => {
        console.log('server is running...')
    })

}

bootstrap()