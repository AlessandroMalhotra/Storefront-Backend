// CREATE A A SIGN IN ENDPOINT TO AND THEN CRRATE AUTHENTICATE FUNCTION TO AUTHENTICATE USER PASSWORD AT SIGN IN
//Async authenticate(username: string, password:string): Promise<User | null> {
// create client connection
// sql query to select user with given password
// await call to database with sql query and username
// check if result has a user object
// check the incoming password concatenated with pepper against the user hashed password in the database Bcrypt.compareSync(password+pepper, user.password_digest)
// }
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import client from '../Database/database';
import { User } from '../Models/user';

const BCRYPT_PASSWORD = process.env.BCRYPT_PASSWORD as string;

const authenticate = async(u:User): Promise<User | null> => {
    const username = u.username;
    const password = u.password;
    const connection = await client.connect();
    const sql = 'SELECT password FROM users WHERE username = {username}';

    const result = await connection.query(sql, [username]);

    console.log(result);

    if(result.rows.length) {
        const user = result.rows[0];

        console.log(user);
        
        if(bcrypt.compareSync(password+BCRYPT_PASSWORD, user.password)){
            return user;
        }
    }
    return null
}
