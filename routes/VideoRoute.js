const router = require('express').Router()
const videoModel = require('../Model/CourseVideo')
const courseModel = require('../Model/CourseModel')
const userModel = require('../Model/UserModel')

router.post('/post/:coursesid/:userid', async (req, res) => {
   const { title, videolink, videoLength } = req.body
   const coursesid = req.params.coursesid
   const userid = req.params.userid
   try {
      const user = await userModel.findOne({ _id: userid })
      if (user.isadmin) {
         const FindCourse = await courseModel.findOne({ _id: coursesid })
         const video = await videoModel.create({ title, videolink, videoLength, course: coursesid, coursetitle: FindCourse.title })
         await courseModel.findOneAndUpdate(FindCourse._id, { $push: { videos: video._id } })
         res.status(200).json(video)
      } else {
         return res.status(403).json({ ms: 'err' })
      }
   } catch (error) {
      res.status(500).send(error)
   }
})

router.get('/get/:courseid', async (req, res) => {
   const courseid = req.params.courseid
   try {
      const FindCourse = await courseModel.findOne({ _id: courseid })
      const Coursevideos = await videoModel.find({ _id: FindCourse.videos })
      res.status(200).json(Coursevideos)
   } catch (error) {
      res.status(500).send(error)
   }
})

router.delete('/delete/:videoid/:userid', async (req, res) => {
   const videoid = req.params.videoid
   const userid = req.params.userid
   try {
      const user = await userModel.findOne({ _id: userid })
      if (user.isadmin) {
         const deleteVideo = await videoModel.findOneAndDelete({ _id: videoid })
         const FindCourse = await courseModel.findOne({ _id: deleteVideo.course })
         if (FindCourse.videos.includes(deleteVideo._id)) {
            await FindCourse.updateOne({ $pull: { videos: deleteVideo._id } })
            res.status(200).json({ ms: "Deleted video" })
         }
      } else {
         return res.status(403).json({ err: "err" })
      }
   } catch (error) {
      res.status(500).send(error)
   }
})

router.put("/update/:videoid/:userid", async (req, res) => {
   const userid = req.params.userid
   const videoid = req.params.videoid
   const { title, videolink, videoLength } = req.body
   try {
      const user = await userModel.findOne({ _id: userid })
      if (user.isadmin) {
         const updateVideo = await videoModel.findOneAndUpdate(videoid, { title, videolink, videoLength })
         res.status(200).json(updateVideo)
      } else {
         return res.status(403).json({ err: 'err' })
      }
   } catch (error) {
      res.status(500).send(error)
   }
})

router.get('/allget', async (req, res) => {
   try {
      const videos = await videoModel.find({})
      res.status(200).json(videos)
   } catch (error) {
      res.status(500).send(error)
   }
})

module.exports = router