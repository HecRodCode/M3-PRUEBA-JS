import * as Api from './api.js';
import * as Storage from './storage.js';
import { clearRegisterForm } from './utils.js';
import { redirectIfLoggedIn } from './guards.js';

// === VERIFY LOGIN ===
redirectIfLoggedIn();

// === SIGN UP ===
const formRegister = document.getElementById('register-form');

if (formRegister) {
  formRegister.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const password = document.getElementById('password');
      const confirmPassword = document.getElementById('confirmPassword');
      const message = document.getElementById('register-message');

      message.innerText = '';

      // VALIDATIONS
      if (
        !nameInput.value.trim() ||
        !emailInput.value.trim() ||
        !password.value.trim() ||
        !confirmPassword.value.trim()
      ) {
        message.style.color = 'red';
        message.innerText = 'Fill all fields';
        return;
      }

      if (password.value !== confirmPassword.value) {
        message.style.color = 'red';
        message.innerText = 'Passwords do not match';
        return;
      }

      const users = await Api.getUsers();
      const userExists = users.some(
        (u) =>
          u.email.toLowerCase() === emailInput.value.toLowerCase() ||
          u.phone === phoneInput.value
      );

      if (userExists) {
        message.style.color = 'red';
        message.innerText = 'User already registered';
        return;
      }

      // CREATE USER
      await Api.createUser({
        name: nameInput.value,
        email: emailInput.value,
        password: password.value,
      });

      clearRegisterForm();

      message.style.color = 'green';
      message.innerText = '✓ User registered successfully! You can now login.';

      setTimeout(() => {
        const loginTab = document.querySelector('[data-bs-target="#login"]');
        if (loginTab) loginTab.click();
      }, 2000);
    } catch (error) {
      console.error(error);
      const message = document.getElementById('register-message');
      message.style.color = 'red';
      message.innerText = 'Server error, try again';
    }
  });
}

// === SIGN IN ===
const btnLogin = document.getElementById('login-btn');

if (btnLogin) {
  btnLogin.addEventListener('click', async () => {
    const identifier = document.getElementById('identifier').value.trim();
    const password = document.getElementById('password').value;
    const message = document.getElementById('login-message');

    if (!identifier || !password) {
      message.style.color = 'red';
      message.innerText = 'Fill all fields';
      return;
    }

    try {
      const users = await Api.getUsers();

      // SEARCH USER
      const user = users.find(
        (u) =>
          (u.email === identifier || u.name === identifier) &&
          u.password === password
      );

      if (!user) {
        message.style.color = 'red';
        message.innerText = 'Invalid credentials';
        return;
      }

      // SAVE SESSION
      Storage.saveSession({
        id: user.id,
        name: user.name,
        email: user.email,
      });

      message.style.color = 'green';
      message.innerText = '✓ Login successful! Redirecting...';

      // REDIRECT BY ROLE
      setTimeout(() => {
        if (user.name === 'Rod ADMIN' || user.email === 'ADMIN@admin.com') {
          window.location.href = './admin-dashboard.html';
        } else {
          window.location.href = './user-dashboard.html';
        }
      }, 1000);
    } catch (error) {
      console.error(error);
      message.style.color = 'red';
      message.innerText = 'Server error, try again';
    }
  });
}
