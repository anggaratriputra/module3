import fs from "fs";

export function getExpense() {
  const db = fs.readFileSync("./db.json");
  const json = String(db);
  const obj = JSON.parse(json);

  // Add this function to convert timestamps to Date objects
  function convertTimestampToDateString(timestamp) {
    const date = new Date(timestamp);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);
    return formattedDate; // Format date as "DD-MM-YYYY"
  }

  // Iterate through the expenses and replace timestamps with Date strings
  const expensesWithDate = obj.expenses.map((expense) => ({
    ...expense,
    timestamp: convertTimestampToDateString(expense.timestamp),
  }));

  return expensesWithDate;
}

export function createNewExpense(newExpense) {
  const db = fs.readFileSync("./db.json");
  const json = String(db);
  const obj = JSON.parse(json);
  const id = Math.max(...obj.expenses.map((expense) => expense.id)) + 1;
  const newData = { id, ...newExpense };
  obj.expenses.push(newData);
  fs.writeFileSync("./db.json", JSON.stringify(obj));
  return newData
}

export function editExpense(expenseId, updatedExpenseData) {
    const db = fs.readFileSync("./db.json");
    const json = String(db);
    const obj = JSON.parse(json);
  
    // Find the index of the expense to edit
    const expenseIndex = obj.expenses.findIndex(expense => expense.id === expenseId);
  
    if (expenseIndex === -1) {
      throw new Error("Expense not found"); // Handle error if the expense is not found
    }
  
    // Update the expense data
    obj.expenses[expenseIndex] = {
      ...obj.expenses[expenseIndex],
      ...updatedExpenseData,
    };
  
    // Save the updated expenses data to your database (e.g., db.json)
    fs.writeFileSync("./db.json", JSON.stringify(obj));
  
    // Return the updated expense
    return obj.expenses[expenseIndex];
  }
