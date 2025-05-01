// Get references to the form and the list to display saved budgets
const budgetForm = document.getElementById('budgetForm');
const budgetList = document.getElementById('budgetList');

// Retrieve saved budgets from localStorage or initialize an empty array if not found
let budgets = JSON.parse(localStorage.getItem('budgets')) || [];

// Function to display all saved budgets
function displayBudgets() {
  budgetList.innerHTML = ''; // Clear the list before repopulating
  budgets.forEach((budget, index) => {
    const li = document.createElement('li');
    li.textContent = `${budget.month} - €${budget.amount.toFixed(2)}`;

    // Create and append delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.onclick = () => deleteBudget(index); // Bind delete action to each item
    li.appendChild(deleteBtn);

    budgetList.appendChild(li); // Add the list item to the list
  });
}

// Function to delete a budget from the list and localStorage
function deleteBudget(index) {
  budgets.splice(index, 1); // Remove the budget from the array
  localStorage.setItem('budgets', JSON.stringify(budgets)); // Save the updated list
  displayBudgets(); // Update the display
}

// Add event listener to handle form submission
budgetForm.addEventListener('submit', e => {
  e.preventDefault(); // Prevent form from submitting the default way

  // Get the values from the form inputs
  const month = document.getElementById('budgetMonth').value.trim();
  const amount = parseFloat(document.getElementById('budgetAmount').value.trim());

  // Validate input
  if (!month || isNaN(amount) || amount <= 0) {
    alert('Please enter a valid month and amount.');
    return;
  }

  // Add the new budget to the array
  budgets.push({ month, amount });

  // Save updated budgets array to localStorage
  localStorage.setItem('budgets', JSON.stringify(budgets));

  // Reset the form and update the display
  budgetForm.reset();
  displayBudgets();
});

// Call displayBudgets to show any saved budgets when the page is loaded
displayBudgets();

