const { Schema, model } = require('mongoose')

const videosSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   videolink: {
      type: String,
      required: true
   },
   videoLength: {
      type: String,
      required: true
   },
   course: {
      type: String,
      required: true
   },
   coursetitle: {
      type: String,
      required: true
   }
}, {
   timestamps: true
})

const videoModel = model('videos', videosSchema)

module.exports = videoModel