$(document).ready( function() {
  $('.detailLink').click(function() {
    var detailLink = $(this).data('detail');
    var pane = $('.detailPane[data-detail="'+detailLink+'"]');
    $('.detailPane').not(pane).fadeOut("fast", function() {
      pane.fadeIn("slow", "linear");
    });
  });
});
