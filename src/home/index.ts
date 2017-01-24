import { initNavBar } from '../common/common';

// Cache for jquery selectors
let $document = $(document);

// On document ready
$document.ready(() => {
  initNavBar('#siteNav', 1250);
});