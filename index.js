const express = require('express')
const path = require('path')
const mysql = require("mysql");
const PORT = process.env.PORT || 5001
const db = mysql.createConnection({
  user: "luckynum",
  host: "119.59.120.138",
  password: ":WeYw2E62egY6[",
  database: "luckynum_data",
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/test-api/:usr', (req, res) => {
    var usr_val = req.params.usr //ตัวแปรที่เก็บค่า username
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("get value /username/" + usr_val)
    res.end()
  })
  .get('/test-database', (req, res) => {
    db.connect((err) => {
      if (err) {
        console.error("Error connecting to MySQL database: ", err);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(err)
        res.end()
        return;
      }
      console.log("Connected to MySQL database!");
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write("success")
      res.end()
    });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));


// const express = require("express");
// const app = express();
// const mysql = require("mysql");
// const cors = require("cors");
// const PORT = process.env.PORT || 5001

// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//   user: "luckynum",
//   host: "119.59.120.138",
//   password: ":WeYw2E62egY6[",
//   database: "luckynum_data",
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL database: ", err);
//     return;
//   }
//   console.log("Connected to MySQL database!");
// });

// app.post("/test/:usr", (req, res) => {
//   var usr_val = req.params.usr //ตัวแปรที่เก็บค่า username
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.write("get value /username/" + usr_val)
//   res.end()
// });

// app.post("/login", (req, res) => {
//   const query = "SELECT * FROM lk_user WHERE user_id = ? AND user_reserve_password = ?";
//   const user = req.body.email;
//   const password = req.body.password;

//   db.query(query, [user, password], (err, result) => {
//     if (err) {
//       console.error("Error executing MySQL query: ", err);
//       res.status(500).json({ error: "An error occurred while processing your request." });
//     } else {
//       if (result.length > 0) {
//         const user = result[0];
//         res.json({ success: true, message: "Login successful!", user: user.user_id, user_type: user.user_type });
//       } else {
//         res.json({ success: false, message: "Invalid email or password." });
//       }
//     }
//   });
// });

// app.post("/get-list-by-user", (req, res) => {
//   const query = "SELECT * FROM lk_data_hdr hdr INNER JOIN lk_data_dtl dtl ON hdr.data_hdr_id = dtl.data_dtl_id WHERE data_hdr_user = ? GROUP BY data_hdr_id";
//   const user = req.body.user;

//   db.query(query, [user], (err, result) => {
//     if (err) {
//       console.error("Error executing MySQL query: ", err);
//       res.status(500).json({ error: "An error occurred while processing your request." });
//     } else {
//       if (result.length > 0) {
//         const data = result; // Store the result in the 'data' variable
//         res.json({ success: true, message: "Last Data Selected", data: data });
//       } else {
//         res.json({ success: false, message: "Not Last Data Selected" });
//       }
//     }
//   });
// });

// app.post("/get-last-lot", (req, res) => {
//   const query = "SELECT * FROM lk_data_hdr ORDER BY data_hdr_id DESC LIMIT 1";

//   db.query(query, (err, result) => {
//     if (err) {
//       console.error("Error executing MySQL query: ", err);
//       res.status(500).json({ error: "An error occurred while processing your request." });
//     } else {
//       if (result.length > 0) {
//         const id = result[0];
//         res.json({ success: true, message: "Last Data Selected", id: id.data_hdr_id });
//       } else {
//         res.json({ success: false, message: "Not Last Data Selected" });
//       }
//     }
//   });
// });

// app.post("/add-header", (req, res) => {
//   const query = "INSERT INTO lk_data_hdr (data_hdr_id, data_hdr_lot_type, data_hdr_date, data_hdr_user, data_hdr_total_price, data_hdr_comment) VALUES (?, ?, ?, ?, ?, ?) ";
//   const id = req.body.id;
//   const type = req.body.type;
//   const date = req.body.date;
//   const user = req.body.user;
//   const price = req.body.price;
//   const comment = req.body.comment;

//   db.query(query, [id, type, date, user, price, comment], (err, result) => {
//     if (err) {
//       console.error("Error executing MySQL query: ", err);
//       res.status(500).json({ error: "An error occurred while processing your request." });
//     } else {
//       if (result.affectedRows > 0) {
//         res.json({ success: true, message: "Insertion successful!" });
//       } else {
//         res.json({ success: false, message: "Insertion failed." });
//       }
//     }
//   });
// });

// app.post("/add-body", (req, res) => {
//   const query = "INSERT INTO lk_data_dtl (data_dtl_id, data_dtl_type, data_dtl_number, data_dtl_type_price, data_dtl_discount, data_dtl_bet, data_dtl_price, data_dtl_date, data_dtl_user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ";
//   const id = req.body.id;
//   const type = req.body.type;
//   const number = req.body.number;
//   const type_price = req.body.type_price;
//   const discount = req.body.discount;
//   const bet = req.body.bet;
//   const price = req.body.price;
//   const date = req.body.date;
//   const user = req.body.user;

//   db.query(query, [id, type, number, type_price, discount, bet, price, date, user], (err, result) => {
//     if (err) {
//       console.error("Error executing MySQL query: ", err);
//       res.status(500).json({ error: "An error occurred while processing your request." });
//     } else {
//       if (result.affectedRows > 0) {
//         res.json({ success: true, message: "Insertion successful!" });
//       } else {
//         res.json({ success: false, message: "Insertion failed." });
//       }
//     }
//   });
// });

// app.post("/search", (req, res) => {
//   const query = "SELECT * FROM lk_data_dtl dtl INNER JOIN lk_data_hdr hdr ON dtl.data_dtl_id = hdr.data_hdr_id WHERE data_dtl_number = ? AND data_dtl_date BETWEEN ? AND ?";
//   const number = req.body.number;
//   const date_from = req.body.date_from;
//   const date_to = req.body.date_to;
//   db.query(query, [number, date_from, date_to], (err, result) => {
//     if (err) {
//       console.error("Error executing MySQL query: ", err);
//       res.status(500).json({ error: "An error occurred while processing your request." });
//     } else {
//       if (result.length > 0) {
//         const data = result; // Store the result in the 'data' variable
//         res.json({ success: true, message: "Last Data Selected", data: data });
//       } else {
//         res.json({ success: false, message: "Not Last Data Selected" });
//       }
//     }
//   });
// });

// app.post("/delete-by-id", (req, res) => {
//   const query = "DELETE hdr, dtl FROM lk_data_hdr hdr INNER JOIN lk_data_dtl dtl ON hdr.data_hdr_id = dtl.data_dtl_id WHERE hdr.data_hdr_id = ? AND dtl.data_dtl_id = ?";
//   const id = req.body.id;
//   db.query(query, [id, id], (err, result) => {
//     if (err) {
//       console.error("Error executing MySQL query: ", err);
//       res.status(500).json({ error: "An error occurred while processing your request." });
//     } else {
//       if (result.affectedRows > 0) {
//         res.json({ success: true, message: "Data deleted successfully." });
//       } else {
//         res.json({ success: false, message: "No matching data found for deletion." });
//       }
//     }
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${port}`);
// });
