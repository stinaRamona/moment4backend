
const express = require("express"); 
const router = express.Router(); 

//Route för registrering 
router.post("/register", async (req, res) => {
    try {  
    const { username, password } = req.body; 

    //validering 
    if(!username || !password) { //utveckla validering
        res.status(401).json({message: "Fälten får inte lämnas tomma"})
    } else {
        res.status(201).json({message: "Användare skapad!"}); 
    }

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