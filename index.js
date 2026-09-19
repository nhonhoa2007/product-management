require('dotenv').config();
const express = require("express");


const route = require("./routes/client/index.routes")
const adminRoutes = require("./routes/admin/index.route")

const database = require("./config/database");
const app = express();

const port = process.env.PORT;

database.connect();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));

//routes
route(app);
adminRoutes(app)

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

