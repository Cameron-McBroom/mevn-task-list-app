require('dotenv').config({path: __dirname + '/.env'})

module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 3000
}
