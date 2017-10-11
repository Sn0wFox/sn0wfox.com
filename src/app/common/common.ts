import * as Sps from 'scrollpos-styler';
import * as $   from 'jquery';
import 'bootstrap';

/**
 * Initialize the navbar:
 * - Offset site for navigation
 * - Apply scroll spy
 * - Add smooth scrolling to content on all links inside the navbar
 * @param navHash The navbar's ID.
 * @param scrollTime The total amount of time during which scroll to each element.
 * @param navOffset The navbar's offset.
 */
export function initNavBar(navHash: string, scrollTime: number = 1000, navOffset: number = 100) {

  // Jquery cache
  let $nav = $(navHash);
  let $body = $('body');

  // Offset for Site Navigation
  Sps.init({
    scrollOffsetY: 100,
    spsClass: 'sps',
    classAbove: 'no-affix',
    classBelow: 'affix'
  });

  // Add scrollspy to body
  $body.scrollspy({target: navHash, offset: 100});

  // Add smooth scrolling on all links inside the navbar
  $nav.find('a').on('click', (event: any) => {
    // Make sure this.hash has a value before overriding default behavior
    if (event.target.hash && event.target.hash !== '') {
      // Prevent default anchor click behavior
      event.preventDefault();
      runAnimatedScroll(event.target.hash, scrollTime);
    }
  });
}

/**
 * Scrolls to the given hash during the given time.
 * @param hash The id to which scroll
 * @param time The total amount of time during which scroll
 */
export function runAnimatedScroll(hash: string, time: number): void {
  // Using jQuery's animate() method to add smooth page scroll
  // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
  $('html, body').animate({
    scrollTop: $(hash).offset().top
  }, time, () => {
    // Add hash (#) to URL when done scrolling (default click behavior)
    window.location.hash = hash;
  });
}

/**
 * Decrypts mailto and makes the associated link clickable.
 */
export function decryptMailto(): void {
  // Email obfuscator script 2.1 by Tim Williams, University of Arizona
  // Random encryption key feature by Andrew Moulden, Site Engineering Ltd
  // This code is freeware provided these four comment lines remain intact
  // A wizard to generate this code is at http://www.jottings.com/obfuscator/
  let coded = "O9g1t.I1ORdxh-4vwx@Rthx-Ewvt.MO";
  let key = "KfZr87XaAsR4D9Iy3FejLYQvBdbtlV65MJONqkxChimWupwz01GTSHoUcgnE2P";
  let shift= coded.length;
  let link="";
  for(let i = 0; i < coded.length; i++) {
    if(key.indexOf(coded.charAt(i)) === -1) {
      let ltr = coded.charAt(i);
      link += (ltr)
    }
    else {
      let ltr = (key.indexOf(coded.charAt(i)) - shift + key.length) % key.length;
      link += (key.charAt(ltr));
    }
  }
  $('#snfx-mailto').find('a').attr('href', 'mailto:' + link);
}