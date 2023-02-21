const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require("cors");
const app = express()
dotenv.config()

app.use(cors());

app.use(express.json({ limit: '50mb', extended: true }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

const DATABASEURL = process.env.DATABASE

mongoose.connect(DATABASEURL)
  .then(() => console.log('connected successfully data base'))
  .catch((err) => console.log(`error ${err}`))

app.get("/", async (req, res) => {
  res.send('shaxzod aliyorov')
});

app.use('/api/auth/', require('./routes/AuthRoute'))
app.use('/api/user/', require('./routes/UserRoute'))
app.use('/api/courses/', require('./routes/Courses'))
app.use('/api/videos/', require('./routes/VideoRoute'))

const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`running server to ${PORT} port`))