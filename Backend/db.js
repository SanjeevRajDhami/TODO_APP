import sql from "mysql2"

const db = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todo"
})
db.connect((err) => {
    if (err) return console.log("DB Connection Failed");
    console.log("DB Connected");
})

export default db