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

const usersTableQuery = "CREATE TABLE if not exists 'users' ('id' int NOT NULL AUTO_INCREMENT, 'email' varchar(100) NOT NULL, 'firstname' varchar(45) NOT NULL, 'lastname' varchar(45) NOT NULL, 'password' varchar(150) NOT NULL, 'nickname' varchar(45) NOT NULL, PRIMARY KEY ('id'), UNIQUE KEY 'email_UNIQUE' ('email'), UNIQUE KEY 'nickname_UNIQUE' ('nickname')) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;";

const scoresTableQuery = `CREATE TABLE if not exists scores (email varchar(100) NOT NULL, nickname varchar(45) NOT NULL, score int NOT NULL, date datetime NOT NULL) 
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`;


connection.query(usersTableQuery, (err, result) => {
    if (err){
     
        return;
    }
    else{
        return;
    }
});

connection.query(scoresTableQuery, (err, result) => {
    if (err){
     
        return;
    }
    else{
        return;
    }
});
export default connection;