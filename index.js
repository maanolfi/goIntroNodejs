const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "njk");

const users = ["Marco", "Bruna", "Carlos", "Auriana"];

const logMiddleware = (req, res, next) => {
  console.log(
    `HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}`
  );
  next();
};

app.get("/", (req, res) => {
  return res.render("list", { users });
});

app.get("/new", (req, res) => {
  return res.render("new");
});

app.post("/create", (req, res) => {
  users.push(req.body.user);
  res.redirect("/");
});

app.get("/login", logMiddleware, (req, res) => {
  return res.send("login");
});

app.get("/login/:id", (req, res) => {
  /* quando se passa parametro depois da barra */
  return res.send(`Bem vindo, seu id é: ${req.params.id}`);
});

app.get("/teste", (req, res) => {
  /** quando se passa parametro usando o interrogação ?name=marco */
  return res.send(`Bem vindo, ${req.query.name}`);
});

app.listen(3000, console.log("Rodando o servidor express"));
