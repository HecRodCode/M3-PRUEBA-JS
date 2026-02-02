import { getSession, clearSession } from './storage.js';

// === ROUTE PROTECTION ===
export function protectRoute(requiredRole) {
  const session = getSession();

  if (!session) {
    alert('You must be logged in to access this page');
    window.location.href = '../../index.html'; // IF THERE IS NO SESSION, REDIRECT TO INDEX
    return false;
  }

  if (requiredRole && session.role !== requiredRole) {
    alert(`This page is only for ${requiredRole}s`);

    // REDIRECT BY ROLE
    if (session.role === 'admin') {
      window.location.href = '../admin/dashboard.html';
    } else {
      window.location.href = '../player/courts.html';
    }
    return false;
  }

  return true;
}

export function redirectIfLoggedIn() {
  const session = getSession();

  if (session) {
    if (session.role === 'admin') {
      window.location.href = './pages/admin/dashboard.html';
    } else {
      window.location.href = './pages/player/courts.html';
    }
    return true;
  }

  return false;
}

export function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    clearSession();
    window.location.href = '../../index.html';
  }
}
