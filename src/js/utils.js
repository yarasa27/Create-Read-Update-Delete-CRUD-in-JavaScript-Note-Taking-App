/**
 * @copyright codewithsadee 2023
 */

'use strict';

/**
 * 
 * @param {Array<HTMLElement>} $elements 
 * @param {string} eventType 
 * @param {Function} callback 
 */


const addEventOnElements = function($elements, eventType, callback) {
    $elements.forEach($element => $element.addEventListener(eventType, callback));
}

/**
 * 
 * @param {number} currentHour
 * @returns {string} 
 */

const getGreetingMsg = function(currentHour) {
    const /** {string} */ greeting = 
    currentHour < 5 ? 'Night' :
    currentHour < 12 ? 'Morning' :
    currentHour < 15 ? 'Noon' :
    currentHour < 17 ? 'Afternoon' :
    currentHour < 20 ? 'Evening' :
    'Night';

    return `Good ${greeting}`;
}

let /** {HTMLElement \ undefined} */ $lastActiveNavItem;

const activeNotebook = function () {
    $lastActiveNavItem?.classList.remove('active');
    this.classList.add('active'); // this: navItem
    $lastActiveNavItem = this; // this: navItem
}

/**
 * 
 * @param {HTMLElement} $element 
 */

const makeElemEditable = function ($element) {
    $element.setAttribute('contenteditable', true);
    $element.focus();
}

/**
 * @returns {string}
 */

const generateID = function () {
    return new Date().getTime().toString();
}

/**
 * 
 * @param {*} db 
 * @param {*} notebookId
 * @returns {Object | undefined} 
 */
const findNotebook = function(db, notebookId) {
    return db.notebooks.find(notebook => notebook.id === notebookId);
}

/**
 * 
 * @param {Object} db 
 * @param {string} notebookId
 * @returns {number} 
 */
const findNotebookIndex = function(db, notebookId) {
    return db.notebooks.findIndex(item => item.id === notebookId);
}

/**
 * 
 * @param {number} milliseconds
 * @returns {string} 
 */
const getRelativeTime = function(milliseconds) {
    const /** {Number} */ currentTime = new Date().getTime();
    const /** {Number} */ minute = Math.floor((currentTime - milliseconds) / 1000 / 60);
    const /** {Number} */ hour = Math.floor(minute / 60);
    const /** {Number} */ day = Math.floor(hour / 24);

    return minute < 1 ? 'Just now' : minute < 60 ? `${minute} min ago` : hour < 24 ? `${hour} hour ago` : `${day} day ago`; 
}

export {
    addEventOnElements,
    getGreetingMsg,
    activeNotebook,
    makeElemEditable,
    generateID,
    findNotebook,
    findNotebookIndex,
    getRelativeTime
}