import { GraphQLError } from 'graphql'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'

const authenticate = (token: string) => {

    try {

        const user = jwt.verify(token, process.env.SECRET)    

        if (!user) {
            throw new GraphQLError('User is not authenticated!')
        }

        return user

    } catch(error) {
        if (error.name === 'TokenExpiredError') {
            throw new GraphQLError('Token is expired!')
        } else if (error.name === 'JsonWebTokenError') {
            throw new GraphQLError('Token is malformed!')
        } else if (error.name === 'NotBeforeError') {
            throw new GraphQLError('Token is not active!')
        } else {
            throw new GraphQLError('Couldn\'t parse token!')
        }
       
    }
}

export { authenticate as default }