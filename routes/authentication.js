
const express = require("express"); 
require("dotenv").config();
const router = express.Router();
const sqlite3 = require("sqlite3").verbose(); 

const db = new sqlite3.Database(process.env.DATABASE);

//Route för registrering 
router.post("/register", async (req, res) => {
    try {  
    const { email, username, password } = req.body; 

    //validering 
    if(!email || !username || !password) { //utveckla validering
        res.status(401).json({message: "Fälten får inte lämnas tomma"})
    }
    
    //kolla om användaren redan finns
    
    //Lägg till användaren 
    const sql = "INSERT INTO users (email, username, password) VALUES (?, ?, ?)"; 

    db.run(sql, [email, username, password], (error) => {
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

        if(!username || !password) { //utveckla validering
            res.status(401).json({message: "Fälten får inte lämnas tomma"}); 
        }

        if(username === "Stina" && password === "password1"){
            res.status(200).json({message: "Du har loggats in!"}); 
        } else {
            res.status(401).json({error: "fel användarnamn eller lösenord!"}); 
        }

    } catch(error){
        res.status(500).json({error: "Något har gått fel med servern"}) 
    }
}); 

module.exports = router; 