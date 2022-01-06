const fs = require("fs");
const rp = require("request-promise");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const url =
  "https://docs.google.com/forms/d/e/1FAIpQLSeHfXr-SAgfRSGIXC7WN_KyD8afGDUeR6xWKm65orp-NXljsw/viewform";
// https://www.reddit.com/
// https://archivepmo.nic.in/

// rp(url).then((webpage) => {
//   console.log(webpage);
// });
(async () => {
  try {
    console.log("hello world");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({ path: "example.png" });
    const html = await page.content();
    const $ = cheerio.load(html);
    $(".freebirdFormviewerComponentsQuestionBaseTitle").each(function () {
      let data = $(this).text();
      console.log(data);
      fs.unlinkSync("data.txt");
      fs.appendFileSync("data.txt", `${data.replace("*", "")}\n`);
    });
  } catch (err) {
    console.log(err);
  }
})();

// rp(url)
//   .then((webpage) => {
//     const $ = cheerio.load(webpage);
//     const names = $(".title a");
//     const lifespans = $(".subtitle");

//     // console.log(names[0].children[0].data);
//     // console.log(lifespans[0].children[0].data);

//     const data = [];
//     for (let index = 0; index < names.length; index++) {
//       data.push({
//         name: names[index].children[0].data,
//         lifespan: lifespans[index].children[0].data,
//       });
//     }

//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
