const express = require("express")
const router = express.Router()


const {createProduct,getAllProductByUserId} = require("../controller/producct")


router.post("/createProduct",createProduct)
router.get("/getProductByUser",getAllProductByUserId)



module.exports = router