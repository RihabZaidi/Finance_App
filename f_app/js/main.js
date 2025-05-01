document.addEventListener("DOMContentLoaded", () => {
  // Expense form and list management
  
  const form = document.getElementById("expenseForm");
  const list = document.getElementById("expenseList");

  function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    list.innerHTML = "";

    expenses.slice().reverse().forEach(exp => {
      const item = document.createElement("li");
      item.textContent = `${exp.description} - ${exp.amount}€ (${exp.category}) on ${new Date(exp.date).toLocaleDateString()}`;
      list.appendChild(item);
    });
  }

  function addExpense(e) {
    e.preventDefault();

    const description = document.getElementById("expenseDescription").value;
    const amount = parseFloat(document.getElementById("expenseAmount").value);
    const category = document.getElementById("expenseCategory").value;

    if (!description || !amount || !category) return;

    const expense = {
      description,
      amount,
      category,
      date: new Date().toISOString()
    };

    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    form.reset();
    loadExpenses();
    updateSummary(); // update dashboard after adding an expense
  }

  if (form) {
    form.addEventListener("submit", addExpense);
    loadExpenses();
  }

  // Dashboard summary management
  function updateSummary() {
    const totalIncomeEl = document.getElementById("totalIncome");
    const totalExpensesEl = document.getElementById("totalExpenses");
    const budgetRemainingEl = document.getElementById("budgetRemaining");
    const currentSavingsEl = document.getElementById("currentSavings");
    const totalDebtEl = document.getElementById("totalDebt");

    if (
      totalIncomeEl &&
      totalExpensesEl &&
      budgetRemainingEl &&
      currentSavingsEl &&
      totalDebtEl
    ) {
      const incomes = JSON.parse(localStorage.getItem("incomes")) || [];
      const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
      const goals = JSON.parse(localStorage.getItem("goals")) || [];
      const debts = JSON.parse(localStorage.getItem("debts")) || [];

      const totalIncome = incomes.reduce((sum, inc) => sum + parseFloat(inc.amount), 0);
      const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
      const currentSavings = goals.reduce((sum, goal) => sum + parseFloat(goal.saved), 0);
      const totalDebt = debts.reduce((sum, debt) => sum + (debt.amount - debt.paid), 0);

      const budgetRemaining = totalIncome - totalExpenses;

      totalIncomeEl.textContent = `$${totalIncome.toFixed(2)}`;
      totalExpensesEl.textContent = `$${totalExpenses.toFixed(2)}`;
      budgetRemainingEl.textContent = `$${budgetRemaining.toFixed(2)}`;
      currentSavingsEl.textContent = `$${currentSavings.toFixed(2)}`;
      totalDebtEl.textContent = `$${totalDebt.toFixed(2)}`;
    }
  }
     
  // Call updateSummary once on page load
  updateSummary();
  // Restart button functionality
const restartButton = document.getElementById("restartButton");

if (restartButton) {
  restartButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to restart and clear all data? This cannot be undone.")) {
      localStorage.removeItem("incomes");
      localStorage.removeItem("expenses");
      localStorage.removeItem("debts");
      localStorage.removeItem("goals");
      location.reload(); // Refresh the page to update summary
    }
  });
}

});
