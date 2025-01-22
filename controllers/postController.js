// Importa i dati dei post dal file data.js
const { json } = require('express');
const postsList = require('../data/data');

//importa db
const connection = require('../data/db');


// Funzione per gestire la rotta GET e filtrare i post in base ai tag
const index = (req, res) => {
    const sql ="SELECT * FROM `posts`;";
    connection.query(sql, (err, result) => {
       if(err){
        return res.status(500), json({
            message: "Errore interno server",
        })
       } else{
        return res.status(200), json({
            status:"succes",
            data: result,
        })
       }
    })
    
};


// Funzione per gestire la rotta GET per mostrare uno specifico elenento in base all'id
const show = (req, res) => {
    

};


// // Funzione che gestisce la rotta POST che crea un nuovo post e lo aggiunge all'array dei posts
// const store = (req, res) => {
    
// };


// // Funzione che gestisce la rotta PUT che modifica le preprieta di un oggetto (id escluso)
// const update = (req, res) => {
    
// };


// const modify = (req, res) => {
    
// };


// Funzione pr eliminare un post
const destroy = (req, res) => {
    
};

// Esporta le funzioni 
module.exports = {
    index,
    show,
    // store,
    // update,
    // modify,
    destroy
};