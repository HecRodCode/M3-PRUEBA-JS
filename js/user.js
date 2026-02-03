import { getTasks, createTask, deleteTask, updateTask } from './api.js';
import * as Storage from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('taskForm');
  const eventsTableBody = document.getElementById('eventsTableBody');
  const createEventModal = new bootstrap.Modal(
    document.getElementById('createEventModal')
  );
  const createTaskBtn = document.getElementById('create-task');
  const taskFilters = document.getElementById('taskFilters');

  let allTasks = [];

  const currentUser = Storage.getSession();
  if (!currentUser) {
    window.location.href = './index.html';
    return;
  }

  // RENDER
  function renderTask(task) {
    const row = document.createElement('tr');
    row.setAttribute('data-id', task.id);
    row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.category}</td>
            <td>${task.priority}</td>
            <td>${task.status}</td>
            <td>${task.dueDate}</td>
            <td>
              <button class="btn btn-sm edit-btn"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-sm delete-btn"><i class="bi bi-trash"></i></button>
            </td>`;

    // DELETE
    row.querySelector('.delete-btn').addEventListener('click', async () => {
      if (confirm('Are you sure you want to delete this task?')) {
        await deleteTask(task.id);
        await reloadAll();
      }
    });

    // UPDATE
    row.querySelector('.edit-btn').addEventListener('click', () => {
      document.getElementById('taskTitle').value = task.title;
      document.getElementById('taskCategory').value = task.category;
      document.getElementById('taskPriority').value = task.priority;
      document.getElementById('taskStatus').value = task.status;
      document.getElementById('taskDueDate').value = task.dueDate;
      document.getElementById('taskDescription').value = task.description || '';
      taskForm.setAttribute('data-edit-id', task.id);
      createEventModal.show();
    });
    eventsTableBody.appendChild(row);
  }

  async function displayTasks(filterStatus = 'All Tasks') {
    eventsTableBody.innerHTML = '';
    const filteredTasks =
      filterStatus === 'All Tasks'
        ? allTasks
        : allTasks.filter((t) => t.status === filterStatus);

    if (filteredTasks.length === 0) {
      eventsTableBody.innerHTML = `<tr><td colspan="6" class="text-center">There are no tasks</td></tr>`;
    } else {
      filteredTasks.forEach(renderTask);
    }
    updateStats(allTasks);
    updateActiveButton(filterStatus);
  }

  async function reloadAll() {
    const rawTasks = await getTasks();
    allTasks = rawTasks.filter((t) => t.userId === currentUser.id);

    const activeBtn = taskFilters.querySelector('button.active');
    const currentStatus = activeBtn
      ? activeBtn.getAttribute('data-status')
      : 'All Tasks';
    displayTasks(currentStatus);
  }

  taskFilters.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (btn) displayTasks(btn.getAttribute('data-status'));
  });

  function updateActiveButton(activeStatus) {
    taskFilters.querySelectorAll('button').forEach((btn) => {
      btn.classList.toggle(
        'active',
        btn.getAttribute('data-status') === activeStatus
      );
    });
  }

  // CREATE
  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const editId = taskForm.getAttribute('data-edit-id');
    const taskData = {
      userId: currentUser.id,
      title: document.getElementById('taskTitle').value,
      category: document.getElementById('taskCategory').value,
      priority: document.getElementById('taskPriority').value,
      status: document.getElementById('taskStatus').value,
      dueDate: document.getElementById('taskDueDate').value,
      description: document.getElementById('taskDescription').value,
    };

    try {
      if (editId) {
        await updateTask(editId, taskData);
        taskForm.removeAttribute('data-edit-id');
      } else {
        await createTask(taskData);
      }
      await reloadAll();
      taskForm.reset();
      createEventModal.hide();
    } catch (error) {
      console.error('Error saving:', error);
    }
  });

  createTaskBtn.addEventListener('click', () => {
    taskForm.reset();
    taskForm.removeAttribute('data-edit-id');
    createEventModal.show();
  });

  reloadAll();
});

// STATS
function updateStats(tasks) {
  document.getElementById('totalEvents').textContent = tasks.length;
  document.getElementById('totalAttendees').textContent = tasks.filter(
    (t) => t.status === 'Completed'
  ).length;
  document.getElementById('upcomingEvents').textContent = tasks.filter(
    (t) => t.status === 'Pending'
  ).length;
  document.getElementById('totalRevenue').textContent = tasks.filter(
    (t) => t.status === 'In Progress'
  ).length;
}
