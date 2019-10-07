const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("views/desafio", {
  autoescape: true,
  express: app,
  watch: true
});

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "njk");

const checkMiddleware = (req, res, next) => {
  req.query.age ? next() : res.redirect("/");
};

app.get("/", (req, res) => {
  return res.render("home");
});

app.post("/check", (req, res) => {
  if (req.body.age > 18) {
    res.redirect(`/major/?age=${req.body.age}`);
  } else {
    res.redirect(`/minor/?age=${req.body.age}`);
  }
});

app.get("/major", checkMiddleware, (req, res) => {
  res.render("major", { age: req.query.age });
});

app.get("/minor", checkMiddleware, (req, res) => {
  res.render("minor", { age: req.query.age });
});

app.listen(3001);
