// Twitter Following Only Extension for Firefox
// Automatically switches to "Following" tab and hides "For You" tab on home page

(function() {
  'use strict';

  // Function to click on the "Following" tab (the tab switcher ON the home page)
  function clickFollowingTab() {
    // Look for the Following tab in the timeline tab switcher
    const selectors = [
      'div[role="tablist"] a[role="tab"]:not([aria-selected="true"])',
      'nav[aria-label*="Timeline"] a:not([aria-selected="true"])',
      'div[role="tablist"] a[href$="/"]'  // Sometimes Following is at the root
    ];

    for (const selector of selectors) {
      const tabs = document.querySelectorAll(selector);
      tabs.forEach(tab => {
        const text = tab.textContent?.toLowerCase() || '';
        const ariaLabel = tab.getAttribute('aria-label')?.toLowerCase() || '';

        // Click if it's the Following tab and not already selected
        if ((text.includes('following') || ariaLabel.includes('following')) &&
            tab.getAttribute('aria-selected') !== 'true') {
          tab.click();
          console.log('Twitter Following Only: Clicked Following tab');
        }
      });
    }
  }

  // Function to hide the "For You" tab from the timeline switcher
  function hideForYouTab() {
    // Look for the For You tab in the timeline tab switcher (NOT the sidebar home link)
    const tablistSelectors = [
      'div[role="tablist"] a[role="tab"]',
      'nav[aria-label*="Timeline"] a'
    ];

    for (const selector of tablistSelectors) {
      const tabs = document.querySelectorAll(selector);
      tabs.forEach(tab => {
        const text = tab.textContent?.toLowerCase() || '';
        const ariaLabel = tab.getAttribute('aria-label')?.toLowerCase() || '';

        // Only hide if it's specifically the "For You" tab in the timeline switcher
        if (text.includes('for you') || ariaLabel.includes('for you')) {
          tab.style.display = 'none';
          // Also hide parent if it's a wrapper
          if (tab.parentElement && tab.parentElement.children.length === 1) {
            tab.parentElement.style.display = 'none';
          }
          console.log('Twitter Following Only: Hid For You tab');
        }
      });
    }
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    hideForYouTab();
    clickFollowingTab();

    // Use MutationObserver to handle dynamic content loading
    const observer = new MutationObserver((mutations) => {
      hideForYouTab();

      // Only try to click if we detect navigation changes
      const hasSignificantChange = mutations.some(mutation =>
        mutation.addedNodes.length > 0 ||
        mutation.type === 'childList'
      );

      if (hasSignificantChange) {
        clickFollowingTab();
      }
    });

    // Observe the entire document for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Listen for URL changes to re-apply when navigating around Twitter
    let lastUrl = location.href;
    new MutationObserver(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        setTimeout(() => {
          hideForYouTab();
          clickFollowingTab();
        }, 100);
      }
    }).observe(document, { subtree: true, childList: true });
  }

  // Periodic check as backup (every 2 seconds)
  setInterval(() => {
    hideForYouTab();
    clickFollowingTab();
  }, 2000);

})();
