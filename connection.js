import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'pesach'
})

connection.connect((err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log('connected')
    }
});

export default connection;