// Select form and list elements

const debtForm = document.getElementById('debtForm');
const debtList = document.getElementById('debtList');

// Retrieve debts from localStorage or start with an empty array
let debts = JSON.parse(localStorage.getItem('debts')) || [];

// Function to display debts
function displayDebts() {
  debtList.innerHTML = ''; // Clear the current list

  debts.forEach((debt, index) => {
    const remaining = (debt.amount - debt.paid).toFixed(2);
    let li = document.createElement('li');
    li.textContent = `${debt.name}: Paid €${debt.paid.toFixed(2)} / €${debt.amount.toFixed(2)} → Remaining €${remaining}`;

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.onclick = () => deleteDebt(index);
    li.appendChild(deleteBtn);

    debtList.appendChild(li);
  });
}

// Function to delete a debt
function deleteDebt(index) {
  debts.splice(index, 1);
  localStorage.setItem('debts', JSON.stringify(debts));
  displayDebts();
}

// Handle form submission
debtForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('debtName').value.trim();
  const amount = parseFloat(document.getElementById('debtAmount').value.trim());
  const paid = parseFloat(document.getElementById('debtPaid').value.trim());

  if (!name || isNaN(amount) || isNaN(paid) || amount <= 0 || paid < 0 || paid > amount) {
    alert('Please enter valid values for debt name, total amount, and amount repaid.');
    return;
  }

  debts.push({ name, amount, paid });
  localStorage.setItem('debts', JSON.stringify(debts));

  debtForm.reset();
  displayDebts();
});

// Show existing debts when the page loads
displayDebts();
