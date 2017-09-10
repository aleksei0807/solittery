import express from 'express'
import corsPrefetch from 'cors-prefetch-middleware'
import proxy from 'express-http-proxy'
 
const app = express()
 
app.use(corsPrefetch)

app.use('/', proxy('localhost:8545'))

const port = 1337

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

