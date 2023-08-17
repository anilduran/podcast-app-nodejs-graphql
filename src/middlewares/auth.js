import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    
    if (!token) {
        return res.status(403).json({
            message: 'You do not have a token!'
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.SALT)
        req.user = decoded
        return next()

    } catch(error) {
        return res.status(403).json({
            message: 'Invalid token!'
        })       
    }
}

export { verifyToken as default }