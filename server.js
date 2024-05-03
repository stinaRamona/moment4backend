const express = require("express"); 
const cors = require("cors"); 
const bodyParser = require("body-parser");
const authentication = require("./routes/authentication"); 
const jwt = require("jsonwebtoken"); 
require("dotenv").config(); 
let port = process.env.PORT || 3001;


const app = express();
app.use(bodyParser.json()); 
app.use(cors()); 

app.use("/api", authentication)

app.get("/api/mypage", authenticateToken, (req, res) => {
    res.json({message: "Skyddad sida"}); 
})

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
