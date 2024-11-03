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

export {
    addEventOnElements,
    getGreetingMsg
}