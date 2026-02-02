// API REST CONFIG
export const BASE_URL = 'http://localhost:3001';

// ENDPOINTS
export const ENDPOINTS = {
  users: '/users',
  task: '/task',
};

// USERS
export const getUsers = async () => {
  const res = await fetch(BASE_URL + ENDPOINTS.users);
  return res.json();
};

export const createUser = async (user) => {
  const res = await fetch(BASE_URL + ENDPOINTS.users, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return res.json();
};
