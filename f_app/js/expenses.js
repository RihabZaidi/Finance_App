const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Display expenses
function displayExpenses() {
  expenseList.innerHTML = ''; // Clear the list
  if (expenses.length === 0) {
    expenseList.innerHTML = '<li>No expenses yet!</li>';
    return;
  }
  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${expense.description} - €${expense.amount.toFixed(2)} (${expense.category})
      <button onclick="deleteExpense(${index})">❌</button>
    `;
    expenseList.appendChild(li);
  });
}

// Delete an expense
function deleteExpense(index) {
  expenses.splice(index, 1); // Remove the expense from the array
  localStorage.setItem('expenses', JSON.stringify(expenses)); // Update localStorage
  displayExpenses(); // Re-render the expenses list
}

// Add new expense
expenseForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the default form submission
  
  const description = document.getElementById('expenseDescription').value.trim();
  const amount = parseFloat(document.getElementById('expenseAmount').value);
  const category = document.getElementById('expenseCategory').value;

  if (!description || isNaN(amount) || amount <= 0 || !category) {
    alert("Please fill out all fields with valid values.");
    return;
  }

  expenses.push({ description, amount, category }); // Add new expense
  localStorage.setItem('expenses', JSON.stringify(expenses)); // Save to localStorage
  expenseForm.reset(); // Reset the form fields
  displayExpenses(); // Re-render the expenses list
});

// Initial display
displayExpenses();
