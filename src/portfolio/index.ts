let $doc = $(document);

// On document ready
$doc.ready(() => {
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
});
