/**
 * Partial Includes System
 * Loads and injects HTML partials into the page
 */

(function() {
    'use strict';

    /**
     * Load and inject a partial into a target element
     * @param {string} partialPath - Path to the partial HTML file
     * @param {string} targetSelector - CSS selector for the target element
     * @param {string} position - 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
     */
    function includePartial(partialPath, targetSelector, position = 'beforeend') {
        return fetch(partialPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${partialPath}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                const target = document.querySelector(targetSelector);
                if (!target) {
                    console.error(`Target element not found: ${targetSelector}`);
                    return;
                }
                
                // Insert HTML based on position
                switch(position) {
                    case 'beforebegin':
                        target.insertAdjacentHTML('beforebegin', html);
                        break;
                    case 'afterbegin':
                        target.insertAdjacentHTML('afterbegin', html);
                        break;
                    case 'beforeend':
                        target.insertAdjacentHTML('beforeend', html);
                        break;
                    case 'afterend':
                        target.insertAdjacentHTML('afterend', html);
                        break;
                    default:
                        target.innerHTML = html;
                }
            })
            .catch(error => {
                console.error(`Error loading partial ${partialPath}:`, error);
            });
    }

    /**
     * Load head partial and inject into <head>
     */
    function loadHead() {
        return fetch('partials/head.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load head partial: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                const head = document.head;
                // Parse and insert each element
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const elements = doc.head.children;
                
                // Insert each element into the actual head
                Array.from(elements).forEach(element => {
                    // Skip if element already exists (to prevent duplicates)
                    let existing = null;
                    if (element.tagName === 'META') {
                        const name = element.getAttribute('name');
                        const property = element.getAttribute('property');
                        if (name) {
                            existing = head.querySelector(`meta[name="${name}"]`);
                        } else if (property) {
                            existing = head.querySelector(`meta[property="${property}"]`);
                        }
                    } else if (element.tagName === 'LINK') {
                        const rel = element.getAttribute('rel');
                        const href = element.getAttribute('href');
                        if (rel && href) {
                            existing = head.querySelector(`link[rel="${rel}"][href="${href}"]`);
                        }
                    } else if (element.tagName === 'TITLE') {
                        existing = head.querySelector('title');
                    } else if (element.tagName === 'SCRIPT') {
                        const type = element.getAttribute('type');
                        if (type) {
                            existing = head.querySelector(`script[type="${type}"]`);
                        }
                    }
                    
                    if (!existing) {
                        head.appendChild(element.cloneNode(true));
                    }
                });
            })
            .catch(error => {
                console.error('Error loading head partial:', error);
            });
    }

    // Load all partials when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // Load navbar into placeholder
        includePartial('partials/navbar.html', '#navbar-partial-placeholder', 'beforeend').then(() => {
            const placeholder = document.getElementById('navbar-partial-placeholder');
            if (placeholder) {
                placeholder.remove();
            }
        });
        
        // Load footer into placeholder
        includePartial('partials/footer.html', '#footer-partial-placeholder', 'beforeend').then(() => {
            const placeholder = document.getElementById('footer-partial-placeholder');
            if (placeholder) {
                placeholder.remove();
            }
        });
    }

    // Export for manual use if needed
    window.includePartial = includePartial;
})();
