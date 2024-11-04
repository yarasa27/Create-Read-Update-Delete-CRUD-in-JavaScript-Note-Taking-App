/**
 * @copyright codewithsadee 2023
 */

'use strict';

/**
 * Module import
 */

import { addEventOnElements, getGreetingMsg, activeNotebook } from "./utils.js";
import { Tooltip } from "./components/Tooltip.js";

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
}

$addNotebookBtn.addEventListener('click', showNotebookField);