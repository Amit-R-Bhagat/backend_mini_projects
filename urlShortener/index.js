const express = require("express");
const mongoose = require("mongoose");
const validUrl = require("valid-url");
const shortid = require("shortid");
const Url = require("./url");
const app = express();

//connect to db.
mongoose.connect("mongodb://127.0.0.1:27017/urlshortener", () => {
  console.log("DB connected");
});

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("success");
});

app.post("/shorten", async (req, res) => {
  try {
    const long_url = req.body.long_url;
    if (!validUrl.isUri(long_url)) {
      return next(new Error("invalid Url"));
    }

    let exists = await Url.exists({ long_url });

    let url;
    if (exists) {
      url = await Url.findOne({ long_url });
    } else {
      let short_url = shortid.generate();

      url = await Url.create({
        long_url,
        short_url,
      });
    }

    res.status(200).json({
      long_url: url.long_url,
      short_url: req.protocol + "://" + req.get("host") + "/" + url.short_url,
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/:short_url", async (req, res, next) => {
  try {
    let url = await Url.findOne({ short_url: req.params.short_url });

    if (!url) {
      return next(new Error("Invalid url"));
    }
    res.redirect(url.long_url);
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => console.log("Server started on port 3000"));
