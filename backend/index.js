import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(express.json());
app.use(cors());
// Use body-parser middleware to parse incoming request bodies
app.use(bodyParser.json());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root1234",
  database: "test",
});
var inputValue = "";
app.post("/", (req, res) => {
  inputValue = req.body.table_name;
  if (inputValue) {
    console.log(`Received input value: ${inputValue}`);
    res.send("Table Name " + inputValue);
  } else {
    console.log("Table name not found");
  }
});

// READ COLUMNS DYNAMICALLY

app.get("/", (req, res) => {
  const tableName = inputValue; // Change table name here
  const q = `DESCRIBE ${tableName}`;
  db.query(q, (err, results) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    const columns = results.map((result) => ({
      column_name: result.Field,
      data_type: result.Type,
    }));
    return res.json(columns);
  });
});

try {
  app.listen(8800, () => {
    console.log("Connected to backend");
  });
} catch (err) {
  console.error(err);
}
