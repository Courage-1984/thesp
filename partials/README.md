# Partials System

This directory contains reusable HTML partials that are loaded into pages using JavaScript.

## Files

- **head.html** - Contains all SEO meta tags, favicons, fonts, and stylesheet links
- **navbar.html** - Navigation bar component
- **footer.html** - Footer component with links and contact info

## How It Works

The `js/includes.js` file automatically loads these partials and injects them into the page:

1. **Head Partial** - Loaded into `<head>` tag (for SEO and meta tags)
2. **Navbar Partial** - Loaded at the beginning of `<body>`
3. **Footer Partial** - Loaded at the end of `<body>` (before closing tag)

## Usage

Simply include `js/includes.js` in your HTML file:

```html
<head>
    <script src="js/includes.js" defer></script>
</head>
<body>
    <div id="navbar-partial-placeholder"></div>
    <!-- Your page content -->
    <div id="footer-partial-placeholder"></div>
</body>
```

The placeholders will be automatically replaced with the partial content.

## Updating Partials

To update any partial, simply edit the corresponding `.html` file in this directory. Changes will be reflected across all pages that use the partials.

## Notes

- The head partial is loaded asynchronously but should load quickly
- For better SEO, consider inlining critical head content for production
- All partials are loaded via fetch API, so they require a web server (won't work with `file://` protocol)
