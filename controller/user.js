
const prisma = require("../utils/dbConnect");


exports.createUser = async (req, res) => {
    const { name, email, password,role } = req.body;

    try {
        // Use Prisma's query builder to create a new user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password,
                role
            },
        });

        res.status(201).json({ success: true, message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user" });
    }
};


exports.getAllUsers = async(req,res)=>{
    const allUsers = await prisma.$queryRaw`
     SELECT * FROM "User"
    `

  return res.status(200).json({
    success : true,
    data : allUsers
  })

}



exports.getUserById = async (req, res) => {
  const { userId } = req.query;

  // Validate userId
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID is required"
    });
  }

  try {
    console.log(`Fetching data for user ID: ${userId}`);

    // Cast userId to integer explicitly in the query
    const data = await prisma.$queryRaw`
      SELECT * FROM "User"
      WHERE id = ${parseInt(userId)}
    `;

    // Check if data is found
    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Send successful response
    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: data
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user data"
    });
  }
};



exports.getAllProductOfUser = async(req,res)=>{

 const user_id = req.query.user_id

 if(!user_id) return res.status(400).json({
    success : false,
    message : "userId does not found"
 })



const allData = await prisma.$queryRaw`
      SELECT "User".name AS user_name,  "Product".name AS product_name, "Product".*
FROM "User"
RIGHT JOIN "Product" ON "Product".user_id = "User".id
WHERE "User".id = ${parseInt(user_id)};

    `;


  if(!allData) return res.status(400).json({
    success : false,
    message : "cannot find data"
  })

  return res.status(200).json({
    success : true,
     message : "data fetched successfuly",
     data : allData
  })


}