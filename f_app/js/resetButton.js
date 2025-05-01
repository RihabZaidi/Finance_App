document.addEventListener("DOMContentLoaded", () => {
  // Reset button functionality
  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to reset all data? This cannot be undone.")) {
        localStorage.clear();
        location.reload();
      }
    });
  }

  // Logout function to handle user logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
});

// Logout functionality
function logout() {
  localStorage.removeItem('loggedIn');
  window.location.href = 'login.html';  // Redirect to login page after logging out
}
