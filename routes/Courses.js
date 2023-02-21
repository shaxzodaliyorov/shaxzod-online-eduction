const router = require('express').Router()
const CourseModel = require('../Model/CourseModel')
const userModel = require('../Model/UserModel')
const videoModel = require('../Model/CourseVideo')

router.post('/post/:userid', async (req, res, next) => {
   const userid = req.params.userid
   const { title, courseImg, price, dagree, language, hours, tech, techimg, discription } = req.body
   try {
      const user = await userModel.findOne({ _id: userid })
      if (user.isadmin) {
         const Course = await CourseModel.create({ title, courseImg, price, dagree, language, hours, tech, discription, techimg })
         res.status(200).json(Course)
      } else {
         return res.status(403).json({ err: 'err' })
      }
   } catch (error) {
      res.status(500).json(error)
   }
})

router.get('/get', async (req, res) => {
   try {
      const courses = await CourseModel.find({})
      res.status(200).json(courses)
   } catch (error) {
      res.status(500).json(error)
   }
})

router.get('/get/:id', async (req, res) => {
   const id = req.params.id
   try {
      const OneCourse = await CourseModel.findOne({ _id: id })
      res.status(200).json(OneCourse)
   } catch (error) {
      res.status(500).json(error)
   }
})

router.put('/update/:id', async (req, res) => {
   const id = req.params.id
   const { title, price, dagree, language, hours, tech, userid } = req.body
   const user = await userModel.findOne({ _id: userid })
   try {
      if (user.isadmin) {
         const update = await CourseModel.findByIdAndUpdate(id, { title, price, dagree, language, hours, tech })
         res.status(200).json(update)
      } else {
         return res.status(403).json({ err: 'err' })
      }
   } catch (error) {
      res.status(500).json(error)
   }
})

router.delete('/delete/:id/:userid', async (req, res) => {
   const { id, userid } = req.params
   try {
      const user = await userModel.findOne({ _id: userid })
      if (user.isadmin) {
         const deleteInfo = await CourseModel.findOneAndDelete({ _id: id })
         const CourseVideos = await videoModel.find({ _id: deleteInfo.videos })
         CourseVideos.forEach(async (item, index) => {
            await videoModel.findOneAndDelete({ _id: item._id })
         })
         res.status(200).json({ ms: 'deleted all Video and Course' })
      } else {
         return res.status(403).json({ err: 'err' })
      }
   } catch (error) {
      res.status(500).json(error)
   }
})

module.exports = router