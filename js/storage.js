// SAVE SESSION
export function saveSession(user) {
  sessionStorage.setItem('urbanSportUser', JSON.stringify(user));
}

// GET SESSION
export function getSession() {
  const session = sessionStorage.getItem('urbanSportUser');
  return session ? JSON.parse(session) : null;
}

// DELETE SESSION
export function clearSession() {
  sessionStorage.removeItem('urbanSportUser');
}

// VERIFY SESSION
export function isLoggedIn() {
  return getSession() !== null;
}
