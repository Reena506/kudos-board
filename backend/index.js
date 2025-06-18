const express = require('express')
const app = express()
const PORT = 3000

const routes=require('./routes/boards')
const routes=require('./routes/cards')

app.use(express.json())
app.use('/boards', routes)
app.use('/cards', routes)

app.get('/', (req, res) => {
  res.send('Welcome to my homepage!')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})