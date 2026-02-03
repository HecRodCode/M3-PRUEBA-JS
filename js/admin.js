import { getTasks, deleteTask, createTask } from './api.js';
import * as Storage from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  const eventsTableBody = document.getElementById('eventsTableBody');
  const searchInput = document.getElementById('searchInput');
  const taskForm = document.getElementById('taskForm');
  const createTaskBtn = document.getElementById('create-task');
  const createEventModal = new bootstrap.Modal(
    document.getElementById('createEventModal')
  );

  const currentUser = Storage.getSession();
  let allTasks = [];

  // RENDER
  function displayTasks(tasksToRender) {
    eventsTableBody.innerHTML = '';

    if (!tasksToRender || tasksToRender.length === 0) {
      eventsTableBody.innerHTML = `<tr><td colspan="6" class="text-center">No tasks found</td></tr>`;
      return;
    }

    tasksToRender.forEach((task) => {
      const row = document.createElement('tr');
      row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.category}</td>
            <td>${task.priority}</td>
            <td><span class="badge ${task.status === 'Completed' ? 'bg-success' : 'bg-warning'}">${task.status}</span></td>
            <td>${task.userId || 'Sistema'}</td> 
            <td>
              <button class="btn btn-sm btn-danger delete-btn">
                <i class="bi bi-trash"></i>
              </button>
            </td>`;

      row.querySelector('.delete-btn').addEventListener('click', async () => {
        if (confirm(`¿ADMIN, delete: "${task.title}"?`)) {
          await deleteTask(task.id);
          await reloadAll();
        }
      });
      eventsTableBody.appendChild(row);
    });
  }

  // METRICS
  function updateStats(tasks) {
    const safeSet = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    const taskList = Array.isArray(tasks) ? tasks : [];

    safeSet('totalEvents', taskList.length);
    safeSet(
      'totalAttendees',
      taskList.filter((t) => t.status === 'Completed').length
    );
    safeSet(
      'upcomingEvents',
      taskList.filter((t) => t.status === 'Pending').length
    );
    safeSet(
      'totalRevenue',
      taskList.filter((t) => t.status === 'In Progress').length
    );
  }

  //
  async function reloadAll() {
    try {
      const data = await getTasks();
      allTasks = Array.isArray(data) ? data : data.tasks || [];

      displayTasks(allTasks);
      updateStats(allTasks);
    } catch (error) {
      console.error('Rendering error:', error);
    }
  }

  // SEARCH
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filtered = allTasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm)
      );
      displayTasks(filtered);
    });
  }

  // CREATE TASK
  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const taskData = {
      userId: currentUser?.id || 'Admin',
      title: document.getElementById('taskTitle').value,
      category: document.getElementById('taskCategory').value,
      priority: document.getElementById('taskPriority').value,
      status: document.getElementById('taskStatus').value,
      dueDate: document.getElementById('taskDueDate').value,
      description: document.getElementById('taskDescription').value,
    };

    await createTask(taskData);
    await reloadAll();
    taskForm.reset();
    createEventModal.hide();
  });

  createTaskBtn.addEventListener('click', () => {
    taskForm.reset();
    createEventModal.show();
  });

  reloadAll();
});
