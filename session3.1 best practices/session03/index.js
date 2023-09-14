const express = require("express");
const PORT = 8000;

const app = express();
app.use(express.json());

// routing
const expenseRouter = require("./expenseRouter");
app.use("/expenses", expenseRouter);

// 404 middleware
app.use((req, res) => {
  console.log(`404: ${req.url}`);
  res.status(404).json({
    msg: "NOT FOUND",
  });
});

// error middleware handler
app.use((error, req, res, next) => {
  console.log(`500: ${req.url}`);
  console.log(error);
  res.status(500).json({
    msg: "FATAL ERROR",
    error,
  });
});

app.listen(PORT, () => {
  console.log(`application start on port ${PORT}`);
});
