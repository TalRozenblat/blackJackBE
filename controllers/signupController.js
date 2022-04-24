import bcrypt from 'bcrypt';
import mysql from 'mysql';
import db from '../connection.js'

const connection = db;

const signUp = async (req, res) => {
    try{

        const getUserQuery = `SELECT * FROM users WHERE 'email' = '${req.body.email}';`;
        connection.query(getUserQuery, (err, result) => {
            if(Object.keys(result).length !== 0) {
                res.status(400).send('This email address is already being used.');
                return;
            }
        });

        if(req.body.password !== req.body.checkPassword){
            res.status(400).send("Passwords don't match.");
            return;
        }

        
        const hashedPassword = await bcrypt.hash(req.body.password , 10);
        
        const sqlInsert = `INSERT INTO users (email, firstname, lastname, nickname, password) VALUES ('${req.body.email}', '${req.body.firstname}', '${req.body.lastname}', '${req.body.nickname}', '${hashedPassword}' );`;

        connection.query(sqlInsert, (err, result) => {
            if (err){
                if(err.sqlMessage === `Duplicate entry '${req.body.email}' for key 'users.email_UNIQUE'`){
                    res.status(400).send('This email address is already being used.');
                    return;
                }
                else if(err.sqlMessage === `Duplicate entry '${req.body.nickname}' for key 'users.nickname_UNIQUE'`){
                    res.status(400).send('This nickname is already being used.'); 
                    return;
                }

                res.status(400).send(err);
                return;
            }
            else{

                res.status(201).send(result);
            }
        });
        
    }
    catch(err){
        res.send(err)
    }
}



export default { signUp }