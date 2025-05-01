
const savingsForm = document.getElementById('savingsForm');
const goalsList = document.getElementById('goalsList');
let goals = JSON.parse(localStorage.getItem('goals')) || [];

function displayGoals() {
  goalsList.innerHTML = '';
  goals.forEach((goal, index) => {
    const li = document.createElement('li');
    const percent = ((goal.saved / goal.target) * 100).toFixed(1);
    li.textContent = `${goal.name}: €${goal.saved} / €${goal.target} (${percent}%)`;
    li.innerHTML += ` <button onclick="deleteGoal(${index})">❌</button>`;
    goalsList.appendChild(li);
  });
}

function deleteGoal(index) {
  goals.splice(index, 1);
  localStorage.setItem('goals', JSON.stringify(goals));
  displayGoals();
}

savingsForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('goalName').value;
  const target = parseFloat(document.getElementById('goalTarget').value);
  const saved = parseFloat(document.getElementById('goalSaved').value);

  goals.push({ name, target, saved });
  localStorage.setItem('goals', JSON.stringify(goals));
  savingsForm.reset();
  displayGoals();
});

displayGoals();
