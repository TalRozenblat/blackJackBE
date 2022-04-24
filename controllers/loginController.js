import bcrypt from 'bcrypt';
import mysql from 'mysql';
import db from '../connection.js'

const connection = db;

const login = async (req, res) => {
    
    const sqlQuery = `SELECT * FROM users WHERE email = '${req.body.email}';`;


    const user = connection.query(sqlQuery, async (err, result) => {
        if (err){
            res.send(err);
            return;
        }
        else{
            if (result[0] === undefined){
                res.status(400).send('Email or password is incorrect.');
                return;
            }
            if(await bcrypt.compare(req.body.password, result[0].password)){
                delete result[0].password;
                res.send(result[0]);
                return;
            }
            else{
                res.status(400).send('Email or password is incorrect.');
                return;
            }
        
        }
    })

    
}
   




export default { login }

