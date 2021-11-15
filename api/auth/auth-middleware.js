const User = require('../user/user-model')

const checkUsernameFree = async (req, res, next) => {
    try {
        const [user] = await User.findBy({ username: req.body.username })
        if (user) {
            res.status(401).json({ message: "username taken" })
        } else {
            req.user = user
            next()
        }
    } catch (err) {
        console.log(err)
    }
}

const checkUsernameExists = async (req, res, next) => {
    try {
        const [user] = await User.findBy({ username: req.body.username })
        if (user) {
            req.user = user
            next()
        } else {
            res.json({ message: "invalid credentials" })
        }
    } catch (err) {
        console.log(err)
    }
}

const validatePayload = async (req, res, next) => {
    const { username, password } = req.body
    try {
        if (!username || !password) {
            res.status(401).json({ message: "username and password required" })
        } else {
            next()
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    checkUsernameFree,
    validatePayload,
    checkUsernameExists
}