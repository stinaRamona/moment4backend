require("dotenv").config(); 
const express = require("express"); 
const sqlite3 = require("sqlite3").verbose(); 

const db = new sqlite3.Database(process.env.DATABASE); 

db.run(`CREATE TABLE users(
    id  INTEGER PRIMARY KEY AUTOINCREMENT,
    email   VARCHAR(300) NOT NULL, 
    username    VARCHAR(300) NOT NULL UNIQUE, 
    password    VARCHAR(300) NOT NULL, 
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

