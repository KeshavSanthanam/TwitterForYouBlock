# Twitter Following Only - Firefox Extension

A Firefox extension that blocks the Twitter/X "For You" page and keeps you on the "Following" timeline.

## Features

- Auto-hides the "For You" tab when you visit X/Twitter
- Automatically clicks on the "Following" tab
- Removes the "For You" tab from the UI entirely
- Automatically redirects from home page to Following
- Persists your preference across sessions
- Works on both twitter.com and x.com

## Installation

### Temporary Installation (for testing)

1. Open Firefox and navigate to `about:debugging`
2. Click "This Firefox" in the left sidebar
3. Click "Load Temporary Add-on..."
4. Navigate to this folder and select the `manifest.json` file
5. The extension will be loaded and active until you restart Firefox

### Permanent Installation (unsigned)

1. Open Firefox and navigate to `about:config`
2. Search for `xpinstall.signatures.required` and set it to `false`
3. Package the extension as a .zip file (rename to .xpi)
4. Drag and drop the .xpi file into Firefox
5. Click "Add" when prompted

### Publishing to Firefox Add-ons (recommended for permanent use)

To use this permanently without developer mode:
1. Create an account at [Firefox Add-ons Developer Hub](https://addons.mozilla.org/developers/)
2. Package all files (manifest.json, content.js, styles.css) into a .zip file
3. Submit for review at addons.mozilla.org
4. Once approved, install from the Firefox Add-ons store

## Files

- [manifest.json](manifest.json) - Extension configuration for Firefox
- [content.js](content.js) - Script that handles tab switching and hiding
- [styles.css](styles.css) - CSS to hide the "For You" tab
- [README.md](README.md) - This file

## How It Works

1. The extension runs on both twitter.com and x.com
2. When you visit the site, it immediately checks if you're on the home page (For You)
3. If so, it redirects you to /following
4. It continuously monitors the page for the "For You" tab and hides it
5. It automatically clicks the "Following" tab if it detects you're not on it
6. Uses MutationObserver to handle Twitter's dynamic content loading

## Uninstalling

1. Go to `about:addons` in Firefox
2. Find "Twitter Following Only" in the extensions list
3. Click the three dots menu and select "Remove"

## Privacy

This extension:
- Only runs on twitter.com and x.com
- Does not collect any data
- Does not make any external network requests
- Only manipulates the DOM to hide UI elements and click tabs
- All processing happens locally in your browser

## License

Free to use and modify as needed. 