// Importa i dati dei post dal file data.js
const { json } = require('express');
const postsList = require('../data/data');

//importa db
const connection = require('../data/db');


// Funzione per gestire la rotta GET e filtrare i post in base ai tag
const index = (req, res) => {
    const sql = "SELECT * FROM `posts`;";
    connection.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Errore interno server"
            })
        } else {
            return res.status(200).json({
                status: "success",
                data: result
            })
        };
    })

};


// Funzione per gestire la rotta GET per mostrare uno specifico elenento in base all'id
const show = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM `posts` WHERE `id`= ?";

    const tagsSql = `SELECT tags.*
    FROM posts 
    JOIN post_tag 
    ON posts.id = post_tag.post_id 
    JOIN tags 
    ON tags.id = post_tag.tag_id
    WHERE posts.id = ?`;


    connection.query(sql, [id], (err, posts) => {

        if (err) {
            return res.status(500).json({
                message: "Errore interno server"
            })
        }else if (posts.length === 0) {
            return res.status(400).json({
                message: "Post non trovato"
            })

        } else {
            connection.query(tagsSql, [id], (err, tags) => {
                if (err) {
                    return res.status(500).json({
                        message: "Errore interno del server"
                    });
                }

                const postTags = {
                    ...posts[0],
                    tags: tags
                };

                return res.status(200).json({
                    status: "success",
                    data: postTags
                });
            });
        }
    })
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
    const sql = "DELETE FROM `posts` WHERE `id`= ?";
    const id = req.params.id;
    connection.query(sql, [id], (err) => {
        if (err) {
            return res.status(500).json({
                message: "Errore interno server"
            })
        } else {
            return res.sendStatus(204)
        };
    })
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