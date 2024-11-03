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

export {
    addEventOnElements
}