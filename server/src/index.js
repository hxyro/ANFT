import express, { urlencoded } from 'express'

const app = express()
app.disable('x-powered-by')
app.use(urlencoded({ extended: true }))

app.use('/', (_req, res) => {
    res.status(200).send('hello')
})

app.listen(8080, () => console.log(`listening on: 8080`))
