const { urlencoded } = require("express");
const express = require("express");
const validUrl = require("valid-url");
const shortid = require("shortid");
const Url = require("./models/url");
// console.log(Url);

require("dotenv").config();
const app = express();

//middlewares
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("success");
});

app.post("/shorten", async (req, res) => {
  try {
    const { long_url, short } = req.body;

    if (!validUrl.isUri(long_url)) {
      res.json({
        status: "failure",
        msg: "Please enter a valid url",
      });
      return;
    }

    // const count = await Url.count({
    //     where: {
    //         short_url: short
    //     }
    // })

    //genereate short_url
    let short_url = shortid.generate();

    //storing thre urls in db
    const result = new Url({
      long_url,
      short_url,
    });

    if (!result) {
      res.json({
        status: "failure",
        msg: "Could not create shortened url",
      });
      return;
    }

    res.send({
      status: "success",
      msg: `${req.headers.host}/${short_url}`,
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
