const express = require("express");
const fileupload = require("express-fileupload");
const app = express();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

let courses = [
  {
    id: "11",
    name: "nodejs",
    price: 299,
  },
  {
    id: "22",
    name: "django",
    price: 499,
  },
  {
    id: "33",
    name: "php",
    price: 199,
  },
];

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileupload());

app.get("/", (req, res) => {
  res.status(200).send("hello");
});

app.get("/api/v1/myapp", (req, res) => {
  res.status(200).send("hello world");
});

app.get("/api/v1/myappobject", (req, res) => {
  res.status(200).send({
    id: "223",
    name: "backend",
    price: 999,
  });
});

app.get("/api/v1/myapparray", (req, res) => {
  res.status(200).send(courses);
});

app.get("/api/v1/course/:courseId", (req, res) => {
  const myCourse = courses.find((course) => course.id === req.params.courseId);
  res.status(200).send(myCourse);
});

app.post("/api/v1/addCourse", (req, res) => {
  console.log(req.body);
  courses.push(req.body);
  res.send(true);
});

app.get("/api/v1/coursequery", (req, res) => {
  let location = req.query.location;
  let device = req.query.device;

  res.send({
    location,
    device,
  });
});

app.post("/api/v1/courseupload", (req, res) => {
  const file = req.files.file;
  let path = __dirname + "/images/" + Date.now() + ".jpg";

  file.mv(path, (err) => res.send(true));
});

app.listen(3000, () => console.log("server started on port 3000"));
