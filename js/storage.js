// SAVE SESSION
export function saveSession(user) {
  sessionStorage.setItem('currentUser', JSON.stringify(user));
}

// GET SESSION
export function getSession() {
  const session = sessionStorage.getItem('currentUser');
  return session ? JSON.parse(session) : null;
}

// DELETE SESSION
export function clearSession() {
  sessionStorage.removeItem('currentUser');
}

// VERIFY SESSION
export function isLoggedIn() {
  return getSession() !== null;
}
