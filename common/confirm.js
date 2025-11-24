export function globalConfirm({ title, message, keyword, confirmText = 'Confirm' }) {
  return new Promise((resolve) => {
    // Remove existing modal if any
    const existingModal = document.getElementById('globalConfirmModal');
    if (existingModal) {
      existingModal.remove();
    }

    // Create modal structure
    const modal = document.createElement('div');
    modal.id = 'globalConfirmModal';
    modal.className = 'modal show';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button type="button" class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <p>${message}</p>
          <div class="form-group" style="margin-top: 1rem;">
            <label class="form-label">Please type <strong>${keyword}</strong> to confirm:</label>
            <input type="text" id="confirmInput" class="form-input" autocomplete="off">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary cancel-btn">Cancel</button>
          <button type="button" class="btn btn-danger confirm-btn" disabled>${confirmText}</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const confirmInput = modal.querySelector('#confirmInput');
    const confirmBtn = modal.querySelector('.confirm-btn');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const closeBtn = modal.querySelector('.modal-close');

    function closeModal() {
      modal.remove();
      resolve(false); // Resolve with false on cancel/close
    }

    confirmInput.addEventListener('input', () => {
      confirmBtn.disabled = confirmInput.value !== keyword;
    });

    confirmBtn.addEventListener('click', () => {
      if (confirmInput.value === keyword) {
        modal.remove();
        resolve(true); // Resolve with true on success
      }
    });

    cancelBtn.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal if clicking outside of it
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    confirmInput.focus();
  });
}
