import { initNavBar,
  runAnimatedScroll } from '../common/common';

// Cache for jquery selectors
let $document = $(document);
let $discover = $('#discover');

// On document ready
$document.ready(() => {
  // Init navbar
  initNavBar('#siteNav', 1250);

  // Init discover button
  $discover.on('click', (event: any) => {
      // Make sure this.hash has a value before overriding default behavior
      if (event.target.hash && event.target.hash !== '') {
        // Prevent default anchor click behavior
        event.preventDefault();
        runAnimatedScroll(event.target.hash, 1000);
      }
  });
});