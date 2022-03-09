const express = require('express')
const cors = require('cors')

const app = express()
const port = 8060

app.use(cors())

app.get('/', (req, res) => {
  const date = new Date()
  res.json({ time: date.toTimeString()})
})

app.listen(port, () => {
  console.log(`MakeTime listening on port ${port}`)
})