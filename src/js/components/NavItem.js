/**
 * @copyright codewithsadee 2023
 */

'use strict';

/**
 * Import
 */
import { Tooltip } from "./Tooltip.js";

/**
 * 
 * @param {string} id 
 * @param {string} name
 * @returns {HTMLElement} 
 */
export const NavItem = function (id, name) {
    const /** {HTMLElement} */ $navItem = document.createElement('div');
    $navItem.classList.add('nav-item');
    $navItem.setAttribute('data-notebook', id);

    $navItem.innerHTML = `
        <span class="text text-label-large" data-notebook-field>${name}</span>
        <button class="icon-btn small" aria-label="Edit notebook" data-tooltip="Edit notebook" data-edit-btn>
            <span class="material-symbols-rounded" aria-hidden="true">edit</span>
            <div class="state-layer"></div>
        </button>
        <button class="icon-btn small" aria-label="Delete notebook" data-tooltip="Delete notebook" data-delete-btn>
            <span class="material-symbols-rounded" aria-hidden="true">delete</span>
            <div class="state-layer"></div>
        </button>
        <div class="state-layer"></div>
    `;

    // Show tooltip on edit and delete button
    const /** {Array<HTMLElement>} */ $tooltipElems = $navItem.querySelectorAll('[data-tooltip]');
    $tooltipElems.forEach($elem => Tooltip($elem));

    return $navItem;
}