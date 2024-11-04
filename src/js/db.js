/**
 * @copyright codewithsadee 2023
 */

'use strict';

/**
 * Import module
 */
import { generateID, findNotebook } from "./utils.js";

// DB Object 
let /** {Object} */ notekeeperDB = {};

const initDB = function () {
    const /** {JSON | undefined} */ db = localStorage.getItem('notekeeperDB');

    if (db) {
        notekeeperDB = JSON.parse(db);
    } else{
        notekeeperDB.notebooks = [];
        localStorage.setItem('notekeeperDB', JSON.stringify(notekeeperDB));
    }
};
initDB();

/**
 * Reads and loads the local Storage data in to the global variable `notekeeperDB`.
 */

const readDB = function () {
    notekeeperDB = JSON.parse(localStorage.getItem('notekeeperDB'));
}

/**
 * Writes the current state of the global variable `notekeeperDB` to local storage
 */
const writeDB = function () {
    localStorage.setItem('notekeeperDB', JSON.stringify(notekeeperDB));
}

/**
 * @namespace
 * @property {Object} get
 * @property {Object} post
 * @property {Object} update
 * @property {Object} delete
 */

export const db = {
    post: {
        /**
         * @function
         * @param {string} name
         * @returns {Object} 
         */
        notebook(name) {
            readDB();

            const /** {Object} */ notebookData = {
                id: generateID(),
                name,
                notes: []
            }
            notekeeperDB.notebooks.push(notebookData);
            
            writeDB();

            return notebookData;
        }
    },
    get: {
        /**
         * @function
         * @returns {Array<Object>}
         */
        notebook() {
            readDB();

            return notekeeperDB.notebooks;
        }
    },
    update: {
        /**
         * @function
         * @param {string} notebookId 
         * @param {string} name
         * @returns {Object} 
         */
        notebook(notebookId, name) {
            readDB();

            const  /** {Object} */ notebook = findNotebook(notekeeperDB, notebookId);
            notebook.name = name;

            writeDB();

            return notebook;
        }
    }
}