const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000

const boardroutes=require('./routes/boards')
const cardroutes=require('./routes/cards')

app.use(express.json())
app.use(cors())
app.use('/boards', boardroutes)
app.use('/cards', cardroutes)

app.get('/', (req, res) => {
  res.send('Welcome to my homepage!')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})