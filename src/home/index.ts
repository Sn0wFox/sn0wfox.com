import { initNavBar,
  runAnimatedScroll } from '../common/common';

declare let $: any;

// Cache for jquery selectors
let $document = $(document);
let $discover = $('#snfx-discover');
let $intro = $('#snfx-title');

// On document ready
$document.ready(() => {
  // Init navbar
  initNavBar('#snfx-site-nav', 1250);

  // Init discover button
  $discover.on('click', (event: any) => {
      // Make sure this.hash has a value before overriding default behavior
      if (event.target.hash && event.target.hash !== '') {
        // Prevent default anchor click behavior
        event.preventDefault();
        runAnimatedScroll(event.target.hash, 1000);
      }
  });

  $intro.typed({
    strings: ["Welc^150ome"],
    typeSpeed: 80,
    startDelay: 1000,
    onStringTyped: () => {
      setTimeout(() => {
        // Do something to make things appear
      }, 1400);
      console.log('typed!');
    }
  });
});