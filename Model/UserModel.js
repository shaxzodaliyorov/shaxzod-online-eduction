const { model, Schema } = require('mongoose')

const userSchema = new Schema({
   firstname: {
      type: String,
      required: true
   },
   lastname: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   profilepic: {
      type: String,
      default: "",
   },
   isadmin: {
      type: Boolean,
      default: false
   },
   mycourses: {
      type: Array,
      default: []
   },
   aboutme: {
      type: String,
      default: ""
   },
   country: {
      type: String,
      default: "Uzbekiston"
   }
},
   { timestamps: true }
)

const userModel = model('users', userSchema)

module.exports = userModel
