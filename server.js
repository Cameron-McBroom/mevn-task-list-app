const express = require("express");
const mongoose = require("mongoose");
const {PORT, MONGO_URI} = require("./config");
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const taskListItemRoutes = require('./routes/api/taskListItems')
const path = require('path')



app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    })
    .then(() => console.log('MongoDb database connected ...'))
    .catch((err) => console.log(err))


app.use('/api/taskListItems', taskListItemRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))
