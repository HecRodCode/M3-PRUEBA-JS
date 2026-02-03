// CLEAR FORM
export function clearRegisterForm() {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
  document.getElementById('confirmPassword').value = '';
  document.getElementById('name').focus();
}
