const express = require("express");
const route = require("./routes/client/index.routes")
const app = express();
const port = 3001;

app.set("view engine", "pug");
app.set("views","./views");
route(app);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
