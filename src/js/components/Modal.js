/**
 * @copyright codewithsadee 2023
 */

'use strict';

const /** {HTMLElement} */ $overlay = document.createElement('div');
$overlay.classList.add('overlay', 'modal-overlay');

/**
 * 
 * @param {string} [title='Untitled'] 
 * @param {string} [text='Add your note...'] 
 * @param {string} [time=''] 
 * @returns {Object} 
 */
const NoteModal = function(title = 'Untitled', text = 'Add your note...', time = '') {
    const /** {HTMLElement} */ $modal = document.createElement('div');
    $modal.classList.add('modal');

    $modal.innerHTML = `
        <button class="icon-btn large" aria-label="Close modal">
            <span class="material-symbols-rounded" aria-hidden="true">close</span>
            <div class="state-layer"></div>
        </button>
        <input type="text" placeholder="Untitled" value="${title}" class="modal-title text-title-medium" data-note-field>
        <textarea placeholder="Take a note..." class="modal-text text-body-large custom-scrollbar" data-note-field>${text}</textarea>
        <div class="modal-footer">
            <span class="time text-label-large">${time}</span>
            <button class="btn text" data-submit-btn>
                <span class="text-label-large">Save</span>
                <div class="state-layel"></div>
            </button>
        </div>
    `;

    const /** {HTMLElement} */ [$titleField, $textField] = $modal.querySelectorAll('[data-note-field]');

    const open = function() {
        document.body.appendChild($modal);
        document.body.appendChild($overlay);
        $titleField.focus();
    }
    return { open }
}

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
            <button class="btn text" data-action-btn="false">
                <span class="text-label-large">Cancel</span>
                <div class="state-layel"></div>
            </button>
            <button class="btn fill" data-action-btn="true">
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
        document.body.appendChild($overlay);
    };

    const /** {Array<HTMLElement>} */ $actionBtns = $modal.querySelectorAll('[data-action-btn]'); 

    /**
     * Closes the delete confirmation modal by removing it from the document body
     */
    const close = function() {
        document.body.removeChild($modal);
        document.body.removeChild($overlay);
    }

    /**
     * 
     * @param {Function} callback 
     */
    const onSubmit = function(callback) {
        $actionBtns.forEach($btn => $btn.addEventListener('click', function() {
            const /** {Boolean} */ isConfirm = this.dataset.actionBtn === 'true' ? true : false;

            callback(isConfirm);
        }));
    }

    return { open, close, onSubmit };

};

export { DeleteConfirmModal, NoteModal }