// API Base URL
const API_URL = 'http://localhost:5000/api';

// Update handleSignup function
async function handleSignup(e) {
  e.preventDefault();
  
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirm = document.getElementById('confirmPassword').value;
  
  // ... validation code ...
  
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      showMessage('success', 'Account Created!', data.message);
      // Store token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Switch to login
      setTimeout(() => switchAuthTab('login'), 1500);
    } else {
      showMessage('error', 'Signup Failed', data.error);
    }
  } catch (error) {
    showMessage('error', 'Error', 'Server connection failed');
  }
  
  return false;
}

// Update handleLogin function
async function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      showMessage('success', 'Login Successful!', `Welcome back, ${data.user.name}!`);
      
      // Store token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Update UI
      document.getElementById('loginBtn').innerHTML = '✓ Logged In!';
      setTimeout(() => {
        document.getElementById('loginBtn').innerHTML = 'Login';
      }, 2000);
    } else {
      showMessage('error', 'Login Failed', data.error);
    }
  } catch (error) {
    showMessage('error', 'Error', 'Server connection failed');
  }
  
  return false;
}

// Update handleContact function
async function handleContact(e) {
  e.preventDefault();
  
  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  const message = document.getElementById('contactMessage').value;
  
  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      showMessage('success', 'Message Sent!', 'Thank you for contacting me!');
      e.target.reset();
    } else {
      showMessage('error', 'Error', data.error);
    }
  } catch (error) {
    showMessage('error', 'Error', 'Server connection failed');
  }
  
  return false;
}

// Load users from database
async function loadUsers() {
  try {
    const response = await fetch(`${API_URL}/users`);
    const users = await response.json();
    
    const userItems = document.getElementById('userItems');
    let html = '';
    users.forEach(user => {
      html += `
        <div class="user-item" onclick="fillLoginCredentials('${user.email}')" style="cursor: pointer;">
          <span>👤 ${user.email}</span>
          <span>🔑 (click to fill)</span>
        </div>
      `;
    });
    userItems.innerHTML = html;
  } catch (error) {
    console.log('Could not load users');
  }
}

// Update fillLoginCredentials
function fillLoginCredentials(email) {
  document.getElementById('loginEmail').value = email;
  document.getElementById('loginPassword').value = '';
  showMessage('success', 'Email Filled', 'Enter your password to login');
}

// Load users on page load
window.addEventListener('load', () => {
  loadUsers();
});