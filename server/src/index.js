import express, { urlencoded } from 'express'
import cors from 'cors'
import { connect } from './utils/db.connect'
import { getTemporaryUrl } from './utils/s3TemporaryUrl'
import dotenv from 'dotenv'
import { UserDb } from './models/user'
import { AnftDb } from './models/anft'
import bcrypt from 'bcrypt'
dotenv.config()

const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI

const app = express()
app.use(cors())
app.use(express.json())
app.disable('x-powered-by')
app.use(urlencoded({ extended: true }))

app.post('/bid', async (req, res) => {
    const { id } = req.body
    const isanft = await AnftDb.findById(id)
    if (isanft) {
        const anft = await AnftDb.findByIdAndUpdate(id, {
            price: isanft.price + 10,
        })
        console.log(anft)
        res.json({ status: 'ok', success: true }).end()
    } else {
        res.json({ status: 'error', success: false }).end()
    }
})
app.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (email && password) {
        const User = await UserDb.findOne({ email })
        if (!User) {
            return res.json({ status: 'error', error: 'Invalid Email or password' }).end()
        }
        const isValid = await bcrypt.compare(password, User.password)
        if (isValid) {
            res.json({ status: 'ok', success: true }).end()
        } else {
            res.json({ status: 'error', error: 'Invalid Email or password' }).end()
        }
    }
    console.log(req.body)
})

app.post('/signup', async (req, res) => {
    const { email, password } = req.body
    if (email && password) {
        const newPassword = await bcrypt.hash(password, 5)
        console.log(newPassword)
        try {
            const User = await UserDb.create({ email, password: newPassword })
            res.json({ status: 'ok', success: true }).end()
        } catch (e) {
            console.log(e)
            res.json({ status: 'error', error: 'user already exists' }).end()
        }
    }
    console.log(req.body)
})

app.post('/add', async (req, res) => {
    const { imageUrl, name, price, user } = req.body
    console.log(req.body)

    try {
        const Anft = await AnftDb.create({ imageUrl, name, price: price, user })
        res.json({ status: 'ok', success: true }).end()
        console.log(req.body)
    } catch (e) {
        res.json({ status: 'error', error: 'Failed to mint' }).end()
        console.log(e)
    }
})

app.get('/', async (req, res) => {
    const data = (await AnftDb.find()).reverse()
    console.log(data)

    if (data) {
        res.json({ status: 'ok', success: true, anft: data }).end()
    } else {
        res.json({ status: 'error', error: 'server error' }).end()
    }
})

app.get('/get/s3url', async (req, res) => {
    const url = await getTemporaryUrl()
    res.json(url).end()
})

const start = async () => {
    await connect(MONGO_URI).then(() => {
        console.log('connected')
        app.listen(PORT, () => console.log(`listening on: ${PORT}`))
    })
}

start()
