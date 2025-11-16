// frontend/common/alert.js

export function showAlert(type, message, duration = 5000) {
  const alertContainer = document.getElementById('globalAlertContainer');
  if (!alertContainer) {
    console.error('Alert container not found!');
    return;
  }

  const alertEl = document.createElement('div');
  alertEl.className = `alert-custom ${type}`; // Use custom classes
  alertEl.innerHTML = `
    <div>${message}</div>
    <button type="button" class="close-btn">&times;</button>
  `;

  alertContainer.prepend(alertEl); // Add to top

  // Show the alert with a fade-in effect
  setTimeout(() => {
    alertEl.classList.add('show');
  }, 10); // Small delay to trigger CSS transition

  // Auto-dismiss after a duration
  const timer = setTimeout(() => {
    alertEl.classList.remove('show');
    alertEl.classList.add('hide');
    // Remove element after transition
    alertEl.addEventListener('transitionend', () => alertEl.remove());
  }, duration);

  // Dismiss on close button click
  alertEl.querySelector('.close-btn').addEventListener('click', () => {
    clearTimeout(timer); // Prevent auto-dismiss if manually closed
    alertEl.classList.remove('show');
    alertEl.classList.add('hide');
    alertEl.addEventListener('transitionend', () => alertEl.remove());
  });
}