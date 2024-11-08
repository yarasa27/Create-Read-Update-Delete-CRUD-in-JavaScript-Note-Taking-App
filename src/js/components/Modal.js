/**
 * @copyright codewithsadee 2023
 */

'use strict';

/**
 * 
 * @param {string} title
 * @returns {Object} 
 */

const DeleteConfirmModal = function (title) {
    const /** {HTMLElement} */ $modal = document.createElement('div');
    $modal.classList.add('modal');
    $modal.innerHTML = `
        <h3 class="modal-title text-title-medium">Are you sure you want to delete <strong>"${title}"</strong>?</h3>
        <div class="modal-footer">
            <button class="btn text">
                <span class="text-label-large">Cancel</span>
                <div class="state-layel"></div>
            </button>
            <button class="btn fill">
                <span class="text-label-large">Delete</span>
                <div class="state-layel"></div>
            </button>
        </div>
    `;
    /**
     * Opens the delete confirmation modal by appending it to the document body
     */
    const open = function() {
        document.body.appendChild($modal);
    }
    return { open }
};

export { DeleteConfirmModal }