const express = require("express")

const router = express.Router()
const {createUser,getAllUsers,getUserById,getAllProductOfUser} = require("../controller/user")

router.post("/createuser",createUser)
router.get("/getUsers",getAllUsers)
router.get("/getUserById",getUserById)
router.get("/getAllProuduct",getAllProductOfUser)


module.exports = router

