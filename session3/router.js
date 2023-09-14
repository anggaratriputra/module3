import express from "express";

const router = express.Router();

//middleware logging client request
router.use((req, res, next) => {
    console.log(req.url)
    req.customData = "ini dari middleware"
    next();
});

router.get("/", (req, res) => {
  console.log(req.customData)
  res.send("root");
});

router.get("/about", (req, res) => {
  res.send("about");
});

router.get("/random.txt", (req, res) => {
  res.send("random.txt");
});

router.get("/users/:userID", (req, res) => {
  res.json({
    method: req.method,
    url: req.url,
    params: req.params,
    query: req.query,
    cookies: req.cookies,
    headers: req.headers,
    hostHeader: req.header("Host"),
  });
});

router.get("/message", (req, res) => {
  res
    .set("Custom-Header", "halo")
    .status(203)
    .send(`Hello ${req.header("Nama")}`);
});

router.post("/users", (req, res) => {
  console.log(req.body);
  res.send(req.body);
})

router.get("example/a"),
  (req, res, next) => {
    console.log("ini di /example/a handler pertama");
    next();
  },
  (req, res) => {
    res.send("/example/a");
  };

export default router;
