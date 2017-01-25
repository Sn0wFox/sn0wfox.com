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
  let $logo = $('#snfx-logo');
  let $logo_o = $('#snfx-logo-orange');

  // Offset for Site Navigation
  $nav.affix({
    offset: {
      top: 100
    }
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

  $nav.on('activate.bs', () => {
    console.log("SCROLL SPIED");
  });

  console.log($('nav * img'));
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