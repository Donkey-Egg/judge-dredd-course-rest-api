const express = require('express')
const app = express()
const port = 3000
const course = require('./course');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  console.log(`Sample`)
  res.send('Hello World!')
})

app.use('/course', course);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
console.log(__filename)