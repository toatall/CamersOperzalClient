$(document).ready(function(){


$("#bt_main_search").click(function (){
  var t = $("#tb_main_search").val();
  if (t.length > 0){
    location.href = "/rn70/search/?text=(" + t + ")";
  }
}); 

$("#tb_main_search").keydown(function(e){
	if(e.which == 13){
		$("#bt_main_search").click();
	}
});

$('.today .link_close').click(function(e){ 
  $(this).parent().hide(); 
  $('.today').removeClass('blue_back');
  e.stopPropagation();
});

$('.link_close').click(function(e){ 
	$(this).parent().hide(); 
	$("p:has(.today-link)").removeClass("active");
  e.stopPropagation();
});

$('.show_pages').click(function(){ 
	$(this).next().show(); 
	$(this).hide();
});

$('.map_icon').click(function() {
  $('.map_div').toggle();
  $(document).click(function(e){
        if($(e.target).closest(".map_div").length==0 && $(e.target).closest(".map_icon").length==0) {
          $('.map_div').hide();
        }
      });
  });




///// --------------- calendar popup ------------------

$('.today_event > li').click(function(){
  $(this).find('div').css('top',$('.today').offset().top + 60);
  $(this).find('div').css('left',$('.today').offset().left + 6);
  $(this).find('div').css('min-height',$('.today').height() - 76);
  $('.today').addClass('blue_back');
  $(this).find('div').show();
});

///// --------------- placeholder ------------------

 $("input[placeholder], textarea[placeholder]").each(function() {
            var tp = $(this).attr("placeholder");
             if($(this).val() == "" || $(this).val() == tp) {
             	$(this).val(tp);
             	$(this).addClass('placeholder');
             }
        }).focusin(function() {
            var val = $(this).attr('placeholder');
            if($(this).val() == val) {
                $(this).val('');
            $(this).removeClass('placeholder');
            }
        }).focusout(function() {
            var val = $(this).attr('placeholder');
            if($(this).val() == "" || $(this).val() == val) {
                $(this).val(val); 
                $(this).addClass('placeholder');
            }
        });

///// submiit form

 $("form").submit(function() {
            $(this).find("input[placeholder], textarea[placeholder]").each(function() {
                var val = $(this).attr('placeholder');
                if($(this).val() == val) {
                    $(this).val('');
                }
            })
        });



/*------------------------ Tooltip  -----------------------------*/

  			$(".int_link").ezpz_tooltip({
  				contentPosition: 'belowStatic',
          stayOnContent: true,
  				offset: 0,
          action: 'mouseover'
				});
				
			$("#subscribe-target-1").ezpz_tooltip({
  				contentPosition: 'belowStaticLeft',
  				stayOnContent: true,
  				offset: 0,
          action: 'click'
				});
				
			$("#subscribe-target-2").ezpz_tooltip({
  				contentPosition: 'belowStaticLeft',
  				offset: 0,
          action: 'click'
				});

			$(".drop_link, .drop_control").ezpz_tooltip({
  				contentPosition: 'belowStaticLeft',
  				stayOnContent: true,
  				offset: 0,
          action: 'click'
				});

			$(".bb_arrow").ezpz_tooltip({
  				contentPosition: 'belowStaticLeft',
  				stayOnContent: true,
          parentPosition: true,
  				offset: 1,
          action: 'click'
				});

			$(".dropdown_menu_link").ezpz_tooltip({
  				contentPosition: 'belowStaticLeft',
  				stayOnContent: true,
  				offset: 11,
          action: 'click'
				});

      $(".serv_link").ezpz_tooltip({
          contentPosition: 'belowStatic',
          stayOnContent: true,
          offset: -20,
          action: 'mouseover'
        });


/*------------------------ Font resize  -----------------------------*/
		
		textResize.init();



});




$(window).resize(function() {

		if ($(window).width() <= 480) { textResize.fontResize(textResize.fontdefault); };
		textResize.setWidthToFont();

});
