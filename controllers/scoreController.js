import mysql from 'mysql';
import db from '../connection.js'

const connection = db;

const addScore = async (req, res) => {
    
    const checkTableQuery = `SELECT * FROM users WHERE email = '${req.body.email}';`;

    // CREATE TABLE `pesach`.`scores` (
    //     `email` VARCHAR(100) NOT NULL,
    //     `nickname` VARCHAR(45) NOT NULL,
    //     `score` INT NOT NULL,
    //     `date` DATETIME NOT NULL,
    //     PRIMARY KEY (`email`));

    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const sqlInsert = `INSERT INTO scores (nickname, email, score, date) VALUES ('${req.body.nickname}', '${req.body.email}', '${req.body.score}', '${date}');`;
    
    connection.query(sqlInsert, (err, result) => {
        if (err){
         
            res.status(400).send(err);
            return;
        }
        else{

            res.status(201).send(result);
            return;
        }
    });

    
}

const lastScore = async (req, res) => {
    
    const sqlQuery = `SELECT *
    FROM scores
    WHERE email IN (SELECT email FROM users WHERE id = '${req.params.id}') ORDER BY date DESC LIMIT 1;`
    
    connection.query(sqlQuery, (err, result) => {
        if (err){
         
            res.status(400).send(err);
            return;
        }
        else{
            res.status(200).send(result[0]);
            return;
        }
    });

    
}

const highScore = async (req, res) => {
    
    const sqlQuery = `SELECT *
    FROM scores
    WHERE email IN (SELECT email FROM users WHERE id = '${req.params.id}') ORDER BY score DESC LIMIT 1;`
    
    connection.query(sqlQuery, (err, result) => {
        if (err){
         
            res.status(400).send(err);
            return;
        }
        else{

            res.status(200).send(result[0]);
        }
    });

}
export default { addScore, lastScore, highScore }
