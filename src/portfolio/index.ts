import { initNavBar,
  runAnimatedScroll } from '../common/common';

// Cache for jquery selectors
let $document = $(document);
let $chkbtn = $('#snfx-btn-chekit');

// On document ready
$document.ready(() => {
  // Init navbar
  initNavBar('#siteNav', 1250);

  // Init check it out button
  $chkbtn.on('click', (event: any) => {
    // Make sure this.hash has a value before overriding default behavior
    if (event.target.hash && event.target.hash !== '') {
      // Prevent default anchor click behavior
      event.preventDefault();
      runAnimatedScroll(event.target.hash, 1000);
    }
  });

  // Init modal LRC pictures
  $("#snfx-lrc-pictures").find("a").on("click", (event: any) => {
    console.log(event.currentTarget.attributes['href'].value);
    $("#imagepreview").attr('src', event.currentTarget.attributes['href'].value);
    $('#imagemodal').modal('show');
  });
});