// Cache jquery selectors
let $nav = $('#siteNav');
let $body = $('body');

// Offset for Site Navigation
$nav.affix({
  offset: {
    top: 100
  }
});

// Add scrollspy to <body>
$body.scrollspy({target: ".navbar", offset: 100});

// Add smooth scrolling on all links inside the navbar
$nav.find("a").on('click', (event: any) => {
  // Make sure this.hash has a value before overriding default behavior
  if (event.target.hash && event.target.hash !== "") {
    // Prevent default anchor click behavior
    event.preventDefault();

    // Store hash
    let hash = event.target.hash;

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 1000, () => {
      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
    });

  } // End if

});