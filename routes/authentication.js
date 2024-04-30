
const express = require("express"); 
const router = express.Router(); 

//Route för registrering 
router.post("/register", async (req, res) => {
    res.json({message: "register called"})
}); 

//routing för login
router.post("/login", async (req, res) => {
    res.json({message: "login called"})
}); 

module.exports = router; 