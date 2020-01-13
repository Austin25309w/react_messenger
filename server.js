const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:354e2f0c-87a6-4d23-ac8c-9ff937347ca8',
    key: 'aeef84fe-2f12-441f-a198-53b82de9b469:rnZmM3L0qp8gsNlpa9HQAQ+oH1XPbqTA2qCqXr0BtFU='
})

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
    const { username } =req.body
    chatkit
        .createUser({
            id:username,
            name: username
        })
        .then(() => res.sendStatus(201))
        .catch(error => {
            if(error.error === "services/chatkit/user_alreqdy_exists") {
                res.sendStatus(200)
            } else {
                res.status(error.status).json(error)
            }
        })
})

app.post('/authenticate', (req, res) => {
    const authData = chatkit.authenticate({ userId: req.query.user_id})
    res.status(authData.status).send(authData.body)
})

const PORT = 3001

app.listen(PORT, err => {
    if(err) {
        console.log(err)
    } else {
        console.log(`Running on port ${PORT}`)
    }
})