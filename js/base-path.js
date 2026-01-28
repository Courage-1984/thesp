/**
 * Base Path Detection
 * Automatically detects and sets the base path for assets
 * Works for both GitHub Pages (with repo name) and Apache servers
 */

(function() {
    'use strict';
    
    // Get the base path from the current location
    function getBasePath() {
        const path = window.location.pathname;
        
        // If we're on GitHub Pages with a repo name (e.g., /repo-name/)
        // or in a subdirectory on Apache (e.g., /subdirectory/)
        const pathParts = path.split('/').filter(part => part && part !== 'index.html');
        
        // If path has more than just the root, we're in a subdirectory
        if (pathParts.length > 0 && pathParts[0] !== '') {
            // Check if it's a GitHub Pages repo (common patterns)
            const isGitHubPages = pathParts.length === 1 && 
                                 (pathParts[0].includes('.github.io') === false);
            
            if (isGitHubPages || pathParts.length > 0) {
                return '/' + pathParts[0] + '/';
            }
        }
        
        // Default to root
        return '/';
    }
    
    // Update meta tags with full URLs for Open Graph and Twitter (needed for social sharing)
    function setBasePath() {
        const basePath = getBasePath();
        const fullBaseUrl = window.location.origin + basePath.replace(/\/$/, '');
        
        // Update Open Graph image with full URL
        const ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage && ogImage.content && !ogImage.content.startsWith('http')) {
            ogImage.content = fullBaseUrl + '/' + ogImage.content.replace(/^\//, '');
        }
        
        // Update Twitter image with full URL
        const twitterImage = document.querySelector('meta[name="twitter:image"]');
        if (twitterImage && twitterImage.content && !twitterImage.content.startsWith('http')) {
            twitterImage.content = fullBaseUrl + '/' + twitterImage.content.replace(/^\//, '');
        }
        
        // Update canonical URL
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical && canonical.href && !canonical.href.startsWith('http')) {
            canonical.href = fullBaseUrl || window.location.origin + '/';
        }
        
        // Update structured data image URLs
        const structuredDataScripts = document.querySelectorAll('script[type="application/ld+json"]');
        structuredDataScripts.forEach(script => {
            try {
                const data = JSON.parse(script.textContent);
                if (data.image && !data.image.startsWith('http')) {
                    data.image = fullBaseUrl + '/' + data.image.replace(/^\//, '');
                    script.textContent = JSON.stringify(data, null, 4);
                }
                if (data.logo && !data.logo.startsWith('http')) {
                    data.logo = fullBaseUrl + '/' + data.logo.replace(/^\//, '');
                    script.textContent = JSON.stringify(data, null, 4);
                }
            } catch (e) {
                // Skip if JSON parsing fails
            }
        });
    }
    
    // Run immediately if DOM is ready, otherwise wait
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setBasePath);
    } else {
        setBasePath();
    }
})();
