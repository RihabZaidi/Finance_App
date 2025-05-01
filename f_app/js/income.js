const incomeForm = document.getElementById('incomeForm');
const incomeList = document.getElementById('incomeList');
let incomes = JSON.parse(localStorage.getItem('incomes')) || [];

// Display incomes
function displayIncomes() {
  incomeList.innerHTML = '';
  if (incomes.length === 0) {
    incomeList.innerHTML = '<li>No incomes yet!</li>';
    return;
  }
  incomes.forEach((income, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${income.source} - €${income.amount.toFixed(2)}
      <button onclick="deleteIncome(${index})">❌</button>`;
    incomeList.appendChild(li);
  });
}

// Delete an income entry
function deleteIncome(index) {
  incomes.splice(index, 1);
  localStorage.setItem('incomes', JSON.stringify(incomes));
  displayIncomes();
}

// Add new income
incomeForm.addEventListener('submit', e => {
  e.preventDefault();
  const source = document.getElementById('incomeSource').value.trim();
  const amount = parseFloat(document.getElementById('incomeAmount').value);

  if (!source || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid source and amount.");
    return;
  }

  incomes.push({ source, amount });
  localStorage.setItem('incomes', JSON.stringify(incomes));
  incomeForm.reset();
  displayIncomes();
});

// Initial display
displayIncomes();
