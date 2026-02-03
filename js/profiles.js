import * as Storage from './storage.js';
import * as Api from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  // VERIFI SESSION
  const currentUserSession = Storage.getSession();
  if (!currentUserSession || !currentUserSession.id) {
    window.location.href = './index.html';
    return;
  }

  let fullUserProfile = null;
  const editProfileModal = new bootstrap.Modal(
    document.getElementById('editProfileModal')
  );
  const profileEditForm = document.getElementById('profileEditForm');

  // RENDER INFO
  function renderProfile(user, taskCount = 0) {
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('taskCount').textContent = taskCount;
    const roleBadge = document.getElementById('userRoleBadge');
    if (roleBadge) {
      roleBadge.textContent = user.email.includes('@admin.com')
        ? 'System Admin'
        : 'User';
    }

    document.getElementById('infoFullName').textContent = user.name;
    document.getElementById('infoEmployeeId').textContent =
      user.employeeId || 'N/A';
    document.getElementById('infoPhone').textContent = user.phone || 'N/A';
    document.getElementById('infoRoleLevel').textContent =
      user.roleLevel || 'N/A';
    if (user.joinDate) {
      document.getElementById('infoJoinDate').textContent = new Date(
        user.joinDate
      ).toLocaleDateString();
    }

    document.getElementById('editFullName').value = user.name;
    document.getElementById('editPhone').value = user.phone || '';
  }

  async function loadData() {
    try {
      fullUserProfile = await Api.getUser(currentUserSession.id);
      const allTasks = await Api.getTasks();
      const userTasks = allTasks.filter(
        (t) => t.userId === currentUserSession.id
      );

      renderProfile(fullUserProfile, userTasks.length);
    } catch (error) {
      console.error('Error loading profile data:', error);
      alert('Error al cargar los datos del perfil.');
    }
  }

  profileEditForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const updatedData = {
      name: document.getElementById('editFullName').value,
      phone: document.getElementById('editPhone').value,
    };

    try {
      const updatedUser = await Api.updateUser(
        currentUserSession.id,
        updatedData
      );

      fullUserProfile = updatedUser;
      renderProfile(
        fullUserProfile,
        document.getElementById('taskCount').textContent
      );

      editProfileModal.hide();
      alert('Perfil actualizado correctamente.');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error al actualizar el perfil.');
    }
  });

  loadData();
});
