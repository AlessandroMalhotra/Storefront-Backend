// CREATE A A SIGN IN ENDPOINT TO AND THEN CRRATE AUTHENTICATE FUNCTION TO AUTHENTICATE USER PASSWORD AT SIGN IN
//Async authenticate(username: string, password:string): Promise<User | null> {
// create client connection
// sql query to select user with given password
// await call to database with sql query and username
// check if result has a user object
// check the incoming password concatenated with pepper against the user hashed password in the database Bcrypt.compareSync(password+pepper, user.password_digest)
// }
