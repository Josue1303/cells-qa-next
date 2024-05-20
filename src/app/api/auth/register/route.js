// // const { NextResponse } = require("next/server");
// import bcrypt from "bcrypt";
// import db from "@/libs/db";
// import jwt from "jsonwebtoken";

// export async function POST(req,res) {
  
//   // const { username, email, password } = req.body;

//   try {
//     const data = await req.json();
//     const emailFound = await db.user.findUnique({
//       where: { email: data.email },
//     });

//     if (emailFound) {
//       //   return NextResponse.json({ error: "Email already exists" }, 400);
//       res.status(400).json({ error: "Email already exists" });
//       return res.end();
//     }
//     const userFound = await db.user.findUnique({
//       where: { username: data.username },
//     });

//     if (userFound) {
//       res.status(400).json({ error: "Username already exists" });
//       return res.end();
//     }

//     const hashedPassword = await bcrypt.hash(data.password, 10);
    
//     const newUser = await db.user.create({
//       data: {
//         username: data.username,
//         email: data.email,
//         password: hashedPassword,
//       },
//     });
//     const { password, ...user } = newUser;

//     // const token = jwt.sign({ userId: newUser.userId }, "your_secret_key", {
//     //   expiresIn: "10h",
//     // });
//     // return NextResponse.json({ token, username });
//   } catch (error) {
//     // return NextResponse.json({ error: "Failed to register" }, 500);
//     console.error('Error processing request:', error);
//     console.log("pausa")
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// }
