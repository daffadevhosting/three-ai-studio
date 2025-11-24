export function globalPrompt({ title, message, inputType = 'text', inputPlaceholder = '', confirmText = 'Confirm', initialValue = '' }) {
  return new Promise((resolve) => {
    // Remove existing modal if any
    const existingModal = document.getElementById('globalPromptModal');
    if (existingModal) {
      existingModal.remove();
    }

    // Create modal structure
    const modal = document.createElement('div');
    modal.id = 'globalPromptModal';
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
            <input type="${inputType}" id="promptInput" class="form-input" placeholder="${inputPlaceholder}" value="${initialValue}" autocomplete="off">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary cancel-btn">Cancel</button>
          <button type="button" class="btn btn-primary confirm-btn">${confirmText}</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const promptInput = modal.querySelector('#promptInput');
    const confirmBtn = modal.querySelector('.confirm-btn');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const closeBtn = modal.querySelector('.modal-close');

    function closeModal() {
      modal.remove();
      resolve(null); // Resolve with null on cancel/close
    }

    function confirm() {
        const value = promptInput.value;
        modal.remove();
        resolve(value);
    }

    confirmBtn.addEventListener('click', confirm);
    cancelBtn.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    promptInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            confirm();
        }
    });

    promptInput.focus();
  });
}
