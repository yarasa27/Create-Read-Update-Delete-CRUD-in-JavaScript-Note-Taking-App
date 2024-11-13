/**
 * @copyright codewithsadee 2023
 */

'use strict';

/**
 * Module import
 */

import { addEventOnElements, getGreetingMsg, activeNotebook, makeElemEditable } from "./utils.js";
import { Tooltip } from "./components/Tooltip.js";
import { db } from "./db.js";
import { client } from "./client.js";
import { NoteModal } from "./components/Modal.js";

/**
 * Toggle sidebar in small screen
 */

const /** {HTMLElement} */ $sidebar = document.querySelector('[data-sidebar]');
const /** {Array<HTMLElement>} */ $sidebarTogglers = document.querySelectorAll('[data-sidebar-toggler]');
const /** {HTMLElement} */ $overlay = document.querySelector('[data-sidebar-overlay]');

addEventOnElements($sidebarTogglers, 'click', function() {
    $sidebar.classList.toggle('active');
    $overlay.classList.toggle('active');
});

/**
 * Initialize tooltip behavior for all DOM elements with 'data-tooltip' attribute.
 */

const  /** {Array<HTMLElement>} */ $tooltipElems = document.querySelectorAll('[data-tooltip]');
$tooltipElems.forEach($elem => Tooltip($elem));

/**
 * show greeting message on homepage
 */
const /** {HTMLElement} */ $greetElem = document.querySelector('[data-greeting]');
const /** {number} */ currentHour = new Date().getHours();
$greetElem.textContent = getGreetingMsg(currentHour);

/**
 * Show current date on homepage
 */

const /** "HTMLElement" */ $currentDateElem = document.querySelector('[data-current-date]'); 
$currentDateElem.textContent = new Date().toDateString().replace(' ', ', ');

/**
 * Notebook create field
 */

const /** {HTMLElement} */ $sidebarList = document.querySelector('[data-sidebar-list]');
const /** {HTMLElement} */ $addNotebookBtn = document.querySelector('[data-add-notebook]');

const showNotebookField = function () {
    const /** {HTMLElement} */ $navItem = document.createElement('div');
    $navItem.classList.add('nav-item');

    $navItem.innerHTML = `
        <span class="text text-label-large" data-notebook-field></span>
        <div class="state-layer"></div>
    `;
    $sidebarList.appendChild($navItem);
    
    const /** [HTMLElement] */ $navItemField = $navItem.querySelector('[data-notebook-field]');

    // Active new created notebook and deactive the last one.
    activeNotebook.call($navItem);

    // Make notobook field content editable and focus
    makeElemEditable($navItemField);

    // When user press 'Enter' then create notebook
    $navItemField.addEventListener('keydown', createNotebook);
}

$addNotebookBtn.addEventListener('click', showNotebookField);

/**
 * 
 * @param {KeyboardEvent} event 
 */

const createNotebook = function (event) {
    if(event.key === 'Enter') {
        // Store new created notebook in database
        const /** {Object} */ notebookData = db.post.notebook(this.textContent || 'Untitled'); // this: $navItemField
        this.parentElement.remove();

        // Render navItem
        client.notebook.create(notebookData);
    }
}

const renderExistedNotebook = function () {
    const /** {Array} */ notebookList = db.get.notebook();
    client.notebook.read(notebookList);
}
renderExistedNotebook();

const /** {Array<HTMLElement>} */ $noteCreateBtns = document.querySelectorAll('[data-note-create-btn]');

addEventOnElements($noteCreateBtns, 'click', function() {
    // Create and open a new modal 
    const /** {Object} */ modal = NoteModal();
    modal.open();

    modal.onSubmit(noteObj => {
        const /** {string} */ activeNotebookId = document.querySelector('[data-notebook].active').dataset.notebook;

        const /** {Object} */ noteData = db.post.note(activeNotebookId, noteObj);
        client.note.create(noteData);
        modal.close();
    });
});


const renderExistedNote = function() {
    const /** {string | undefined} */ activeNotebookId = document.querySelector('[data-notebook].active')?.dataset.notebook;

    if (activeNotebookId) {
        const /** {Array<Object>} */ noteList = db.get.note(activeNotebookId);
        console.log(noteList);

        // Display existing note
        client.note.read(noteList);
    }
}

renderExistedNote();