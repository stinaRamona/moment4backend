
const express = require("express"); 
require("dotenv").config();
const router = express.Router();
const jwt = require("jsonwebtoken"); 
const sqlite3 = require("sqlite3").verbose(); 
const bcrypt = require("bcrypt"); 

const db = new sqlite3.Database(process.env.DATABASE);

//Route för registrering 
router.post("/register", async (req, res) => {
    try {  
    const { email, username, password } = req.body; 

    //validering 
    if(!email || !username || !password) { //utveckla validering
        res.status(401).json({message: "Fälten får inte lämnas tomma"})
    }
    
    //hasha lösenord så det inte syns i databasen 
    let hashedPassword = await bcrypt.hash(req.body.password, 10)
    
    //kolla om användaren redan finns

    //Lägg till användaren 
    const sql = "INSERT INTO users (email, username, password) VALUES (?, ?, ?)"; 

    db.run(sql, [email, username, hashedPassword], (error) => {
        if(error){
            res.status(400).json({error: "Kunde inte skapa användare"}); 
        } else {
            res.status(201).json({message: "Användare skapad!"});
        }
    }); 
 
    } catch(error){
        res.status(500).json({error: "Något har gått fel med servern"})
    }
}); 

//routing för login
router.post("/login", async (req, res) => {
    try{
        const { username, password } = req.body;

        if( !username || !password) { //utveckla validering
            res.status(401).json({message: "Fälten får inte lämnas tomma"}); 
        }

        //kolla om användaren finns 
        const sql = `SELECT * FROM users WHERE username=?`; 
        db.get(sql, [username], async(err, row) => {
            if(err){
                res.status(400).json({message: "Kunde inte logga in. Försök igen"});
            } else if(!row) {
                res.status(401).json({message: "Fel användarnamn eller lösenord"}); 
            } else {
                //hamnar här om allt stämmer. Användare/lösenord kollas
                const passwordMatch = await bcrypt.compare(password, row.password);

                if(!passwordMatch){
                    res.status(401).json({message: "Fel användarnamn eller lösenord"}); 
                } else {
                    //JWT 
                    const payload = { username: username};
                    
                    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '10h'});
                    
                    const response = {
                        message: "Du loggas in", 
                        token: token
                    }

                    res.status(200).json({response}); 
                }
            }
        })

    } catch(error){
        res.status(500).json({error: "Något har gått fel med servern"}) 
    }
}); 

module.exports = router; 