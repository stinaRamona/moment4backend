const express = require("express"); 
const cors = require("cors"); 
const bodyParser = require("body-parser");
const authentication = require("./routes/authentication"); 
const jwt = require("jsonwebtoken"); 
const sqlite3 = require("sqlite3"); 
require("dotenv").config(); 
let port = process.env.PORT || 3001;


const app = express();
app.use(bodyParser.json()); 
app.use(cors()); 

const db = new sqlite3.Database(process.env.DATABASE);

app.use("/api", authentication)
 

app.get("/api/mypage", authenticateToken, (req, res) => {

    username = req.body.username; 

    db.run(`SELECT * FROM users WHERE username = ?`, [username], (err, result) => {
        if(err){
            res.status(500).json({message: "Något gick fel" + err})
            return
        }

        if(result.length === 0) {
            res.status(404).json({message: "Hittade ingen data!"})
        } else {
            res.json(result)
        }
    });
 
}); 

//validera token
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if(token == null){
        res.status(401).json({message: "Du har inte tillgång till denna sida. Token saknas."}); 
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err){
            return res.status(403).json({message: "Ogiltigt token!"}); 
        }

        req.username = username; 
        next()
    })

}

app.listen(port, () => {
    console.log(`Servern är startad på port: ${port}`)
}); 
