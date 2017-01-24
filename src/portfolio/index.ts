import { initNavBar } from '../common/common';

// Cache for jquery selectors
let $document = $(document);

// On document ready
$document.ready(() => {
  initNavBar('#siteNav', 1250);

  $("#snfx-lrc-pictures").find("a").on("click", (event: any) => {
    console.log(event.currentTarget.attributes['href'].value);
    $("#imagepreview").attr('src', event.currentTarget.attributes['href'].value);
    $('#imagemodal').modal('show');
  });
});