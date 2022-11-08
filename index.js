const express = require('express')
const app = express()
const courses = require('./routes/courses')
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/courses', courses)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
