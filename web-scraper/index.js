const rp = require("request-promise");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const url = "https://www.reddit.com/";
// https://www.reddit.com/
// https://archivepmo.nic.in/

// rp(url).then((webpage) => {
//   console.log(webpage);
// });

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path: "example.png" });
  const html = await page.content();
  const $ = cheerio.load(html);
  $("h3").each(function () {
    console.log($(this).text());
  });
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
