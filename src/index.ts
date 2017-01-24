// Cache for jquery selectors
let $nav = $('#siteNav');
let $body = $('body');
let $discover = $('#discover');
let $explore = $('#explore');
let $wrapper = $('#wrapper');
let $document = $(document);

// On document ready
$document.ready(() => {
  // Offset for Site Navigation
  $nav.affix({
    offset: {
      top: 100
    }
  });

  // Add scrollspy to <body>
  $body.scrollspy({target: '.navbar', offset: 100});

  // Add smooth scrolling on all links inside the navbar
  $nav.find('a').on('click', (event: any) => {
    // Make sure this.hash has a value before overriding default behavior
    if (event.target.hash && event.target.hash !== '') {
      // Prevent default anchor click behavior
      event.preventDefault();
      runAnimatedScroll(event.target.hash, 1250);
    }

  });

  // Add smooth scrolling to the discover button
  $discover.on('click', (event: any) => {
    // Make sure this.hash has a value before overriding default behavior
    if (event.target.hash && event.target.hash !== '') {
      // Prevent default anchor click behavior
      event.preventDefault();
      runAnimatedScroll(event.target.hash, 1000);
    }
  });

  $explore.on('click', (event: any) => {
    loadPortfolio();
  });
});

/**
 * Scrolls to the given hash during the given time.
 * @param hash The id to which scroll
 * @param time The total amount of time during which scroll
 */
function runAnimatedScroll(hash: string, time: number): void {
  // Using jQuery's animate() method to add smooth page scroll
  // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
  $('html, body').animate({
    scrollTop: $(hash).offset().top
  }, 1000, () => {
    // Add hash (#) to URL when done scrolling (default click behavior)
    window.location.hash = hash;
  });
}

/**
 * Loads the html code for the portfolio
 * in the div #wrapper.
 */
function loadPortfolio(): void {
  $wrapper.load("portfolio/portfolio.html", (resp: string, status: string) => {
    console.log("LOADED: " + status);
  });
}