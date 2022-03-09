const express = require('express')
const cors = require('cors')
const axios =require('axios')

const app = express()
const port = 8080
const gatewayURL = 'http://35.86.102.245:8000'
const SERVICES_DOMAIN = 'apps.local:8080'

app.use(cors())


// const requestTime = async () => {
//   try {
//     const baseURL = 'http://localhost:8060'
//     const response = await axios.get(baseURL + '/')
//     return response.data
//   } catch(err) {
//     console.log('Error making get request to makeTime', err)
//   }
// }

app.get('/', async (req, res) => {
  try {
    const time = await axios.get(`http://${gatewayURL}/api/makeTime`)
    res.json(time)
  } catch(err) {
    console.log(err)
    res.status(500).send(err)
  }

})

app.get('/ab', async (req, res) => {
  try {
    const serviceA = await axios.get(`http://servicea.${SERVICES_DOMAIN}/`)
    const serviceB = await axios.get(`http://serviceb.${SERVICES_DOMAIN}/`)
    res.json(serviceA.data.data + ' and ' + serviceB.data.data)
  } catch(err) {
    console.log(err)
    res.status(500).send(err)
  }

})

app.get('/test', (req, res) => {
  res.json({test: 'test endpoint' })
})

app.listen(port, () => {
  console.log(`GetTime server listening on port ${port}`)
})

