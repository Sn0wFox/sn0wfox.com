import { initNavBar,
  runAnimatedScroll,
  decryptMailto } from '../common/common';

import * as $     from 'jquery';
import * as Typed from 'typed.js'

// TODO: polyfill

// Cache for jquery selectors
let $document = $(document);
let $discover = $('#snfx-discover');
let $introContent = $('#snfx-intro-content');

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

  let intro = new Typed('#snfx-title', {
    strings: ["Welc^150ome"],
    typeSpeed: 80,
    startDelay: 1000,
    onStringTyped: () => {
      setTimeout(() => {
        // Do something to make things appear
        $introContent
          .addClass("run-intro")
          .removeClass("before-intro");
      }, 700);
    }
  });
  intro.start();

  // Activates mailto link
  decryptMailto();
});