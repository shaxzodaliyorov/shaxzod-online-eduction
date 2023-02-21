const router = require('express').Router()
const userModel = require('../Model/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
router.get('/one', async (req, res, next) => {
   const token = req.headers.authorization
   try {
      const verify = jwt.verify(token, process.env.SECRET)
      const user = await userModel.findOne({ email: verify.email })
      if (user) {
         res.status(200).json(user)
      } else {
         res.status(403).json({ err: 'err' })
      }
   } catch (error) {
      res.status(500).json(error)
      next()
   }
})

router.get('/all/:userid', async (req, res) => {
   const userid = req.params.userid
   try {
      const user = await userModel.findById({ _id: userid })
      if (user.isadmin) {
         const users = await userModel.find()
         res.status(200).json(users.sort((a, b) => {
            return b.createdAt - a.updatedAt;
         }))
      } else {
         return res.status(403).json({ err: 'err' })
      }
   } catch (error) {
      res.status(200).json(error)
   }
})

router.put('/update/:id', async (req, res, next) => {
   const { firstname, lastname, profilepic, aboutme, country } = req.body
   const id = req.params.id
   try {
      const UpdateUser = await userModel.findByIdAndUpdate(id, { firstname, lastname, profilepic, aboutme, country })
      res.status(203).json({ ms: 'update user', UpdateUser })
   } catch (error) {
      res.status(500).json(error)
   }
})

router.put('/resetpassword/:id', async (req, res) => {
   const { currentpassword, newpassword } = req.body
   const id = req.params.id
   try {
      const user = await userModel.findById(id)
      const result = await bcrypt.compare(currentpassword, user.password)
      const newHashPassword = await bcrypt.hash(newpassword, 10)
      if (newpassword.length < 6) {
         return res.status(403).json({ err: "Parol 6 tadan kam Bo'lmasin !" })
      }
      if (result) {
         const NewUser = await userModel.findByIdAndUpdate(id, { password: newHashPassword })
         res.status(200).json(NewUser)
      } else {
         res.status(403).json({ err: "Parolingiz Xato Iltimos Qatadan Kiriting !" })
      }
   } catch (error) {
      res.status(500).json(error)
   }
})

module.exports = router