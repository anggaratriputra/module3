import express from "express";
import router from "./router.js";
import { getExpense, createNewExpense, editExpense } from "./db.js";
const PORT = 8000;

const app = express();
app.use(express.json());

// app.use("", router);

app.get("/expenses", (req, res) => {
  const expensesWithDate = getExpense(); // Use the modified getExpense function
  res.json(expensesWithDate); // Send the expenses with Date strings in the response
});

app.get("/expenses/:id", (req, res) => {
  const expenseId = parseInt(req.params.id);
  const expenses = getExpense(); // Get all expenses
  const expense = expenses.find((expense) => expense.id === expenseId);

  if (!expense) {
    // If the expense with the given ID is not found, return a 404 response
    return res.status(404).json({ message: "Expense not found" });
  }

  // If the expense is found, return it in the response
  res.json(expense);
});

app.post("/expenses", (req, res) => {
  const { name, nominal, category, timestamp } = req.body;

  try {
    // Convert the date string in "DD-MM-YYYY" format to a timestamp
    const [day, month, year] = timestamp.split("/").map(Number);
    const newTimestamp = new Date(year, month - 1, day).getTime();

    // Create the new expense object with the timestamp
    const newExpense = { name, nominal, category, timestamp: newTimestamp };

    // Call the createNewExpense function with the newExpense object
    const newData = createNewExpense(newExpense);

    // Format the timestamp for the response as "DD-MM-YYYY"
    const formattedTimestamp = new Date(newTimestamp).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    // Respond with the newly created expense, including the formatted timestamp
    res.status(201).json({ id: newData.id, name, nominal, category, timestamp: formattedTimestamp });
  } catch (error) {
    res.status(400).json({ message: "Invalid date format. Please provide the date in 'DD/MM/YYYY' format." });
  }
});

//404 middleware
app.use((req, res, next) => {
  res.status(404).send("not found bro!");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something is wrong!");
});

app.listen(PORT, () => {
  console.log(`app running on localhost: ${PORT}`);
});
