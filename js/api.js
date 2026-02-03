// API REST CONFIG
export const BASE_URL = 'http://localhost:3001';

// ENDPOINTS
export const ENDPOINTS = {
  users: '/users',
  tasks: '/tasks',
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

// CRUD
export const getTasks = async () => {
  const res = await fetch(`${BASE_URL}${ENDPOINTS.tasks}`);
  if (!res.ok) throw new Error('Error al obtener tareas');
  return await res.json();
};

export const createTask = async (task) => {
  const res = await fetch(`${BASE_URL}${ENDPOINTS.tasks}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return await res.json();
};

export const updateTask = async (id, updatedTask) => {
  const res = await fetch(`${BASE_URL}${ENDPOINTS.tasks}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTask),
  });
  return await res.json();
};

export const deleteTask = async (id) => {
  const res = await fetch(`${BASE_URL}${ENDPOINTS.tasks}/${id}`, {
    method: 'DELETE',
  });
  return await res.json();
};
