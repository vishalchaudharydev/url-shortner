require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const connection = require("./config/db");

const URL = require("./models/Url");

const app = express();
connection();

app.set("view engine", "ejs");

app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("Hello Vishal"));

app.use("/home", require("./routes/url"));


app.get("/:id", async (req, res) => {
     const shortID = req.params.id;
     const entery = await URL.findOneAndUpdate(
          { shortID },
          {
               $push: {
                    visitHistory: {
                         timeStamp: Date.now()
                    }
               }
          }
     );
     res.redirect(entery.redirectURL);
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));