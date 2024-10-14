// npm init -y
// npm install express mysql cors nodemon
/* package.json: add:  "type": "module", - When "type": "module" is set in
package.json, it tells Node.js that the code in the project should be treated as
ECMAScript modules (ESM) rather than CommonJS modules. This means that you can
use import and export syntax for module handling, as opposed to the older require()
and module.exports used in CommonJS. */


import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import * as dotenv from 'dotenv';
import studentQueries from  './queries/studentQueries.js'

const app = express();
app.use(cors());
app.use(express.json())

dotenv.config();


const db = mysql.createConnection ({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASS,
  database: 'crud'
})


db.connect((err) => {
  if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
  }
  console.log('Connected to the database as ID', db.threadId);
  
  // Create the students table if it doesn't exist
  db.query(studentQueries.createTable, (error, results) => {
      if (error) {
          console.error('Error creating table:', error);
      } else {
          console.log('Students table created or already exists.');
      }
  });
});


app.get('/', (req, res) => {
  const sql = "SELECT * FROM  student";
  db.query(sql, (err, result) => {
    if(err) return res.status(500).json({Message: "Error inside server"});
    return res.status(200).json(result)
  })
})

app.post('/student', (req, res)=> {
  const {name, email} = req.body;
  const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?, ?)";
/*   const values = [
    req.body.name,
    req.body.email
  ] */
  db.query(sql, [name, email], (err, result) => {
    if(err) return res.status(500).json(err);
    return res.status(201).json(result);
  })

})

app.get('/read/:id', (req, res) => {
  const {id} = req.params;
  const sql = "SELECT * FROM  student where ID = ?";
  db.query(sql, [id], (err, result) => {
    if(err) return res.status(500).json({Message: "Error inside server"});
    return res.status(200).json(result)
  })
})

app.put('/update/:id', (req, res)=> {
  const {id} = req.params;
  const {name, email} = req.body;
  const sql = "UPDATE student SET `Name` = ?, `Email` = ? WHERE ID = ?"
  db.query(sql, [name, email, id], (err, result) => {
    if(err) return res.status(500).json({Message: "Error inside server"});
    if(result.affectedRows === 0) return res.status(404).json({Message: 'Student not found'})
    res.status(200).json(result)
  })
  
})

app.delete('/delete/:id', (req, res) => {
  const {id} = req.params;
  const sql = "DELETE FROM student WHERE ID = ?"
  db.query(sql, [id], (err, result) => {
    if(err) return res.status(500).json({Message: "Error inside server"});
    res.status(200).json({Message: "Resource deleted successfully"})
  })
})

app.listen(5000, ()=> {
  console.log("Listening on port 5000")
})

