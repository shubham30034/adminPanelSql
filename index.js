const express = require("express")
const app = express()
app.use(express.json())



const PORT = 5000

const userRouter = require("./routes/user")
const productRouter = require("./routes/product")
app.use("/api/v1",userRouter)
app.use("/api/v1",productRouter)

app.listen(PORT,()=>{
    console.log(`app is listening on ${PORT}`);
})