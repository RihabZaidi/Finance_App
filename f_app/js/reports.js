document.addEventListener("DOMContentLoaded", () => {
  // Retrieve data from localStorage
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  const incomes = JSON.parse(localStorage.getItem('incomes')) || [];

  // Expense by Category aggregation
  const expenseCategories = {};
  expenses.forEach(e => {
    expenseCategories[e.category] = (expenseCategories[e.category] || 0) + parseFloat(e.amount);
  });

  // Expense by Category Pie Chart
  const ctx1 = document.getElementById('expensesChart').getContext('2d');
  new Chart(ctx1, {
    type: 'pie',
    data: {
      labels: Object.keys(expenseCategories),
      datasets: [{
        label: 'Expenses by Category',
        data: Object.values(expenseCategories),
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#4bc0c0', '#8dd3c7', '#fb8072']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });

  // Total Income vs Expenses Bar Chart
  const totalIncome = incomes.reduce((sum, i) => sum + parseFloat(i.amount), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);

  const ctx2 = document.getElementById('incomeVsExpensesChart').getContext('2d');
  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: ['Income', 'Expenses'],
      datasets: [{
        label: '€ Amount',
        data: [totalIncome, totalExpenses],
        backgroundColor: ['#4caf50', '#f44336']
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
});
