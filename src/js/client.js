/**
 * @copyright codewithsadee 2023
 */

'use strict';

/**
 * Import module
 */
import { NavItem } from "./components/NavItem.js";
import { activeNotebook } from "./utils.js";

const /** {HTMLElement} */ $sidebarList = document.querySelector('[data-sidebar-list]');
const /** {HTMLElement} */ $notePanelTitle = document.querySelector('[data-note-panel-title]');

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
        },

        /**
         * @param {Array<Object>} notebookList
         */
        read(notebookList) {
            notebookList.forEach((notebookData, index) => {
                const /** {HTMLElement} */ $navItem = NavItem(notebookData.id, notebookData.name);
                if(index === 0) {
                    activeNotebook.call($navItem);
                    $notePanelTitle.textContent = notebookData.name;
                }
                
                $sidebarList.appendChild($navItem);
            });
        }
    }
}