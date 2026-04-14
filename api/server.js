// import pool from './db.js';

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   let conn;

//   try {
//     const { username, email, password } = req.body;

//     conn = await pool.getConnection();

//     await conn.query(
//       "INSERT INTO users(username, email, password) VALUES (?, ?, ?)",
//       [username, email, password]
//     );

//     res.status(200).json({ message: "User added successfully" });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error adding user" });

//   } finally {
//     if (conn) conn.release();
//   }
// }


const express = require('express')
const cors = require('cors');
const pool = require('./db')



const app = express()

//Enable CORS
app.use(cors());

//middleware to read the json
app.use(express.json())
app.use(express.urlencoded({extended:true}));

//route to handle form submission
app.post('/add-user',async (req,res) =>{
    let conn;
    try {
        const { username, email, password } = req.body;
        conn = await pool.getConnection();
        await conn.query(
      "INSERT INTO users(username, email, password) VALUES (?, ?, ?)",
      [username, email, password]
    );

    res.send("User added successfully");
       
   
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding user");
    }finally{
        if (conn) conn.release();
    }
})

app.listen("3001",()=>{
    console.log('server is running..')
})