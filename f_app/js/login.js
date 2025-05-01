document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
  
    // Log to confirm if elements are being correctly accessed
    console.log(usernameInput, passwordInput, confirmPasswordInput);
  
    // Ensure these elements are not null
    if (!usernameInput || !passwordInput || !confirmPasswordInput) {
      console.error("Error: One or more form elements are missing or incorrect.");
      return;
    }
  
    // Listen for form submission
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();  // Prevent the form from submitting the default way
  
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();
      const confirmPassword = confirmPasswordInput.value.trim();
  
      // Validate inputs
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
  
      // Check if the username already exists (stored in localStorage)
      const existingUser = localStorage.getItem(username);
      if (existingUser) {
        alert('This username already exists. Please choose a different one.');
        return;
      }
  
      // Save the new account data in localStorage
      localStorage.setItem(username, JSON.stringify({ username, password }));
  
      // Redirect to index.html after account creation
      window.location.href = '../index.html'; // Go to the root directory and open index.html
    });
  });
  