const express = require('express')
const cors = require('cors')

const app = express()
const port = 8080

app.use(cors())

app.get('/', (req, res) => {
  res.json({ data: 'serviceAv2 response data' })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})