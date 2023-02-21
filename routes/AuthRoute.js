const { Router } = require('express')
const bcrypt = require('bcryptjs')
const router = Router()
const userModel = require('../Model/UserModel')
const jwt = require('jsonwebtoken')
router.post('/register', async (req, res, next) => {
   const { firstname, lastname, email, password, } = req.body

   const hashPassword = await bcrypt.hash(password, 10)

   const FindEmail = await userModel.findOne({ email })

   if (FindEmail) {
      return res.status(403).json({ err: "Bu Email Ro'yxatdan O'tgan ! " })
   }
   const result = await userModel({ firstname, lastname, password: hashPassword, email })
   try {
      await result.save()
      res.status(200).json(result)
   } catch (error) {
      res.status(500).json(error)
      next()
   }
})


router.post('/login', async (req, res, next) => {
   const { email, password } = req.body
   try {
      const FindEmail = await userModel.findOne({ email: email })
      if (!FindEmail) {
         return res.status(404).json({ err: ' Bu Email Ro\'yxatdan O\'tmagan ! ' })
      }
      const result = await bcrypt.compare(password, FindEmail.password)
      if (result) {
         const token = jwt.sign({ email: FindEmail.email }, process.env.SECRET)
         res.status(200).json({ token: token })
      } else {
         res.status(403).json({ err: "Parol yoki Email Xato qatadan tekshirib uring!" })
      }
   } catch (error) {
      res.status(500).json(error)
      next()
   }
})

module.exports = router