const { model, Schema } = require('mongoose')

const courseSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   courseImg: {
      type: String,
      default: ""
   },
   videos: {
      type: Array,
      default: []
   },
   price: {
      type: String,
      required: true
   },
   dagree: {
      type: String,
      required: true
   },
   language: {
      type: String,
      required: true
   },
   hours: {
      type: String,
      required: true
   },
   tech: {
      type: String,
      required: true
   },
   techimg: {
      type: String,
      required: true
   },
   discription: {
      type: String,
      required: true
   }
}, {
   timestamps: true
})

const CourseModel = model('courses', courseSchema)

module.exports = CourseModel