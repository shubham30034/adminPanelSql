const { all } = require("../routes/user")
const prisma = require("../utils/dbConnect")

exports.createProduct = async(req,res)=>{
    try {

        const {name,description,user_id} = req.body


        const product = await prisma.$executeRaw`
           
        INSERT INTO "Product"
        (name,description,user_id)
      VALUES  (${name},${description},${parseInt(user_id,10)})
        
        `
        
        if(!product) return res.status(400).json({
            success : false,
            message : "Unable to Create Product"
        })
        
        
        
        return res.status(200).json({
            success : true,
            message : "Prpduct created successfuly",
        })
        
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "internal server error",
            error : error
        })
        
    }



}



exports.getAllProductByUserId = async(req,res)=>{

   const user_id = req.query.user_id

    if(!user_id) return res.status(400).json({
        success : false,
        message : "userId does not found"
    })



   const allProduct = await prisma.$queryRaw`
    SELECT * FROM "Product" 
    WHERE user_id = ${parseInt(user_id)}
   
   `
 
 if(!allProduct) return res.status.json({
    success : false,
    message : "cannot find products"
 })


 return res.status(200).json({
    success : true,
    message : "product fetched successfuly",
    data : allProduct
 })



}