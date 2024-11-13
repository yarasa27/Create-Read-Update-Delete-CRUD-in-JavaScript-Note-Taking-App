/**
 * @copyright codewithsadee 2023
 */

'use strict';

/**
 * Import module
 */
import { NavItem } from "./components/NavItem.js";
import { activeNotebook } from "./utils.js";
import { Card } from "./components/Card.js";

const /** {HTMLElement} */ $sidebarList = document.querySelector('[data-sidebar-list]');
const /** {HTMLElement} */ $notePanelTitle = document.querySelector('[data-note-panel-title]');
const /** {HTMLElement} */ $notePanel = document.querySelector('[data-note-panel');
const /** {Array<HTMLElement>} */ $noteCreateBtns = document.querySelectorAll('[data-note-create-btn]'); 
const /** {string} */ emptyNotesTemplate = `
    <div class="empty-notes">
        <span class="material-symbols-rounded" aria-hidden="true">note_stack</span>
        <div class="text-headline-small">No notes</div>
    </div>
`;

/**
 * 
 * @param {boolean} isThereAnyNotebook
 */
const disableNoteCreateBtns = function(isThereAnyNotebook) {
    $noteCreateBtns.forEach($item => {
        $item[isThereAnyNotebook ? 'removeAttribute' : 'setAttribute']('disabled', '');
    });
}

/**
 * @namespace
 * @property {Object} notebook
 * @property {Object} note
 */
export const client = {

    /**
     * @param {Object} notebookData
     */
    notebook: {
        create(notebookData) {  
            const /** {HTMLElement} */ $navItem = NavItem(notebookData.id, notebookData.name);
            $sidebarList.appendChild($navItem);
            activeNotebook.call($navItem);
            $notePanelTitle.textContent = notebookData.name;
            $notePanel.innerHTML = emptyNotesTemplate;
            disableNoteCreateBtns(true);
        },
        /**
         * @param {Array<Object>} notebookList
         */
        read(notebookList) {
            disableNoteCreateBtns(notebookList.length);
            notebookList.forEach((notebookData, index) => {
                const /** {HTMLElement} */ $navItem = NavItem(notebookData.id, notebookData.name);
                if(index === 0) {
                    activeNotebook.call($navItem);
                    $notePanelTitle.textContent = notebookData.name;
                } 
                $sidebarList.appendChild($navItem);
            });
        },

        /**
         * 
         * @param {string} notebookId 
         * @param {string} notebookData 
         */
        update(notebookId, notebookData) {
            const /** {HTMLElement} */ $oldNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);
            const /** {HTMElement} */ $newNotebook = NavItem(notebookData.id, notebookData.name);

            $notePanelTitle.textContent = notebookData.name;
            $sidebarList.replaceChild($newNotebook, $oldNotebook);
            activeNotebook.call($newNotebook);
        },

        /**
         * 
         * @param {string} notebookId 
         */
        delete(notebookId) {
            const /** {HTMLElement} */ $deletedNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);
            const /** {HTMLElement | null} */ $activeNavItem = $deletedNotebook.nextElementSibling ?? $deletedNotebook.previousElementSibling;

            if($activeNavItem) {
                $activeNavItem.click();
            } else{
                $notePanelTitle.innerHTML = '';
                $notePanel.innerHTML = '';
                disableNoteCreateBtns(false);
            }
            
            $deletedNotebook.remove();
        }
    },
    note: {
        /**
         * 
         * @param {Object} noteData 
         */
        create(noteData) {
            // Clear 'emptyNotesTemplate' from 'notePanel' if there is no note exists
            if(!$notePanel.querySelector('[data-note]')) $notePanel.innerHTML = '';

            // Append card in notePanel
            const /** {HTMLElement} */ $card = Card(noteData);
            $notePanel.appendChild($card);
        },
        /**
         * @param {Array<Object>} noteList
         */
        read(noteList) {
            if(noteList.length) {
                $notePanel.innerHTML = '';
                
                noteList.forEach(noteData => {
                    const /** {HTMLElement} */ $card = Card(noteData);
                    $notePanel.appendChild($card);
                });
            } else{
                $notePanel.innerHTML = emptyNotesTemplate;
            }
        }
    }
}