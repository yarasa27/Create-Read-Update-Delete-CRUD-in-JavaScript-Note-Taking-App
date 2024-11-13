/**
 * @copyright qaqarin27
 */

'use strict';

const toggleTheme = function () {
    const /** {string} */ currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const /** {string} */ newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

/**
 * Initialize the theme
 */

const /** {string | null} */ storedTheme = localStorage.getItem('theme');
const /** {Boolean} */ systemThemeIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const /** {string} */ InitialTheme = storedTheme ?? (systemThemeIsDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', InitialTheme);

/**
 * Attach toggleTheme to theme button click event
 */

window.addEventListener('DOMContentLoaded', function() {
    const /** {HMTLElement} */ $themeBtn = document.querySelector('[data-theme-btn]');
    if ($themeBtn) $themeBtn.addEventListener('click', toggleTheme);
});