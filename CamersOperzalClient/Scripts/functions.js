(function ($) {
    $.fn.NewsList = function () {
        $(this).each(function (index, element) {
            var o = $(element);

			o.find('#carousel_ul li:first').before(o.find('#carousel_ul li:last')); 
              
			o.find('#right_scroll').click(function(){
				var item_width = o.find('#carousel_ul li').outerWidth() + 10;
				var left_indent = parseInt(o.find('#carousel_ul').css('left')) - item_width;
				o.find('#carousel_ul:not(:animated)').animate({'left' : left_indent},500,function(){    
					o.find('#carousel_ul li:last').after(o.find('#carousel_ul li:first')); 
					o.find('#carousel_ul').css({'left' : '-210px'});
				}); 
			});
			
			o.find('#left_scroll').click(function(){
				var item_width = o.find('#carousel_ul li').outerWidth() + 10;
				var left_indent = parseInt(o.find('#carousel_ul').css('left')) + item_width;
				o.find('#carousel_ul:not(:animated)').animate({'left' : left_indent},500,function(){               
				o.find('#carousel_ul li:first').before(o.find('#carousel_ul li:last'));
				o.find('#carousel_ul').css({'left' : '-210px'});
				});
			});
		
        });
        return this;
    };
})(jQuery);


///////////////////// MApBlock
(function ($) {
    $.fn.MapBlock= function () {
	
		var data = [{coords:[845,685,1020,742],title:"",url:""},
					{coords:[845,598,1020,653],title:"",url:""},
					{coords:[845,509,1020,565],title:"",url:""},
					{coords:[845,421,1020,476],title:"",url:""},
					{coords:[797,249,1020,294],title:"",url:""},
					{coords:[797,100,1021,182],title:"",url:""},
					{coords:[543,716,765,741],title:"",url:""},
					{coords:[543,662,765,707],title:"",url:""},
					{coords:[543,628,765,654],title:"",url:""},
					{coords:[543,592,765,619],title:"",url:""},
					{coords:[543,537,765,584],title:"",url:""},
					{coords:[543,502,765,528],title:"",url:""},
					{coords:[543,466,765,492],title:"",url:""},
					{coords:[543,432,765,458],title:"",url:""},
					{coords:[543,397,765,423],title:"",url:""},
					{coords:[543,343,765,369],title:"",url:""},
					{coords:[543,309,765,335],title:"",url:""},
					{coords:[543,274,765,300],title:"",url:""},
					{coords:[543,239,765,265],title:"",url:""},
					{coords:[543,205,765,230],title:"",url:""},
					{coords:[543,170,765,196],title:"",url:""},
					{coords:[543,134,765,160],title:"",url:""},
					{coords:[543,100,766,127],title:"",url:""},
					{coords:[288,662,511,741],title:"",url:""},
					{coords:[288,539,511,625],title:"",url:""},
					{coords:[288,397,512,497],title:"",url:""},
					{coords:[288,100,513,145],title:"",url:""},
					{coords:[33,633,258,741],title:"",url:""},
					{coords:[33,546,258,621],title:"",url:""},
					{coords:[71,462,255,534],title:"",url:""},
					{coords:[71,377,256,449],title:"",url:""},
					{coords:[33,272,257,364],title:"",url:""},
					{coords:[33,209,258,258],title:"",url:""},
					{coords:[33,100,259,192],title:"",url:""},
					{coords:[138,15,890,57],title:"",url:""}];
	
        $(this).each(function (index, element) {
			var o = $(element);
			o.css("cursor","pointer");
			
			var f = function(){
			
				var bx = 1037;
				var by = 759;
				
				var x = $(window).width()-20;
				var y = $(window).height()-20;
				
				var ratio = x/bx<y/by?x/bx:y/by;
				if(ratio > 1) ratio = 1;
				var rnd = (new Date()).getTime();
				var h = '<div onclick="$(\'#maparea-img-'+rnd+'\').remove(); $(\'#maparea-back-'+rnd+'\').remove();")" id="maparea-back-'+rnd+'" style="z-index:99998;background:#000;opacity:0.5;position:fixed;top:0px;left:0px;width:100%;height:100%;"></div>';
				
				h+='<img id="maparea-img-'+rnd+'" style="z-index:99999;position:fixed;top:'+((y - Math.round(by*ratio))/2+10)+'px;left:'+((x - Math.round(bx*ratio))/2+10)+'px;max-width:'+(Math.round(bx*ratio))+'px;max-height:'+(Math.round(by*ratio))+'px;" src="images/tablica.jpg" alt="" usemap="#structure_20072012_1_Map_'+rnd+'">';
				h+='<map name="structure_20072012_1_Map_'+rnd+'">';
				

				for(var i=0;i<data.length;i++){
				var c=[];
					for(var j=0;j<data[i].coords.length;j++){
						c[j] = Math.round(data[i].coords[j]*ratio);
					}
					h+='<area shape="rect" alt="'+data[i].title+'" coords="'+c.join(",")+'" href="'+data[i].url+'">'
				}
				h+='</map>';
				
				
				$("body").append(h);
			};

			o.bind("click",f);
        });
        return this;
    };
})(jQuery);

var CheckTreeNodes = function(id){
	if($("#"+id+"-result").length>0){
		var val = $("#"+id+"-result").val();
		if(val.length>0){
			var list = val.split(",");
			var t = $("#"+id).data("dynatree");
			if(!t){
				t = $("#" + id).data("uiDynatree");
			}
			for(var i=0;i<list.length;i++){
				t.tree.selectKey(list[i]).select(true);
			}
		}
	}
};

///////////////////////////////////// jQuery.NiceFileInput.js //////////////////////////////

(function($) {
	$.fn.nicefileinput = function(options) {
		var settings = { 
			label : 'Обзор...', // Default button text
                        fullPath: false
		};
		if(options) { $.extend(settings, options); };
		
		return this.each(function() {
			var self = this;
			
			if ($(self).attr('data-styled') === undefined) {
			
				var r = Math.round(Math.random()*10000);
				var d = new Date();
				var guid = d.getTime()+r.toString();
				
				var filename = $('<input type="text" readonly="readonly">')
					.css({
						'display': 'block',
						'float': 'left',
						'margin': 0,
						'padding': '0 5px'
					})
					.addClass('NFI-filename NFI'+guid);
				var wrapper = $("<div>")
					.css({
						'overflow': 'hidden',
						'position': 'relative',
						'display': 'block',
						'float': 'right',
						'white-space': 'nowrap',
						'text-align': 'center'
					})
					.addClass('NFI-button NFI'+guid)
					.html(settings.label);
				
				
				$(self).after(filename);
				$(self).wrap(wrapper);
				
				$('.NFI'+guid).wrapAll('<div class="NFI-wrapper" id="NFI-wrapper-'+guid+'" />');
				$('.NFI-wrapper').css({
					'overflow': 'auto',
					'display': 'inline-block'
				});
				$("#NFI-wrapper-"+guid).addClass($(self).attr("class"));
				
				$(self)
					.css({
						'opacity': 0,
						'position': 'absolute',
						'border': 'none',
						'margin': 0,
						'padding': 0,
						'top': 0,
						'right': 0,
						'cursor': 'pointer',
						'height': '60px'
					})
					.addClass('NFI-current');
				$(self).on("change", function() {
                                	var fullPath = $(self).val();
                                	if (settings.fullPath) {
                                		filename.val(fullPath); 
                                	} else {
                                		var pathArray = fullPath.split(/[/\\]/);
                                		filename.val(pathArray[pathArray.length - 1]);
                                	}
                                });
				$(self).attr('data-styled', true);
			}
		});
    
	};
})(jQuery);



(function ($) {
    $.fn.TaxesTable = function (selectId) {
		
		function getSave(){
			try {
				var t = window.localStorage.getItem('tabletaxes');
				if(t != null){
					t = t.split("|");
				}
				return t;
			} catch (e) {
				return null
			}
		};
		
		function setSave(list){
			var list2 = null;
			if(list){
				if(list.length>0){
					list2 = list.join("|");
				}
			}
			
			try {
				window.localStorage.setItem('tabletaxes',list2);
			} catch (e) {}
		};
		
		var saves = getSave();
	
        $(this).each(function (index, element) {
            var o = $(element);
			var sel = $("#"+selectId);

			var clickDel = function(){
				var l = $(this);
				//console.log(l.parent().parent().attr("class"));
				o.find("tr."+l.parent().parent().attr("class")).hide();
				$(".pinned tr."+l.parent().parent().attr("class")).hide();
				$(".taxes_table tr."+l.parent().parent().attr("class")).hide();
				replaceStr();
				return false;
			};
			
			window.taxesClickDel = clickDel;
			
			var clickAdd = function(){
				var l = $(this);
				o.find("tr."+l.attr("data-class")).show();
				$(".pinned tr."+l.attr("data-class")).show();
				$(".taxes_table tr."+l.attr("data-class")).show();
				replaceStr();
				return false;
				
			};
			
			var replaceStr = function(){
				sel.next().html("");
				var list = o.find("tr[class^='tab-']").not(":visible").find(".tax_way a");
				if(list.length>0){
					sel.next().hide();
					sel.show();
					var ht = "";
					for(var i=0;i<list.length;i++){
						var t = list[i];
						var tt = $(t);
						ht+="<a data-class='"+tt.parent().parent().attr("class")+"'>"+tt.parent().text().replace(tt.text(),'')+"</a>";
					}
					sel.next().html(ht);
					sel.next().find("a").click(clickAdd);
				} else {
					sel.next().hide(clickAdd);
					sel.hide();
				}
				var l2s = [];
				for(var i=0;i<list.length;i++){
					l2s[i] = $(list[i]).parent().parent().attr("class");
				}
				setSave(l2s);
			};
			if(saves){
				for(var i=0;i<saves.length;i++){
				 o.find("tr."+saves[i]).hide();
				}
			}
			o.find("td.tax_way a").click(clickDel);
			replaceStr();

        });
        return this;
    };
})(jQuery);



(function ($) {
    $.fn.MiniSpoiler = function (_max, _min) {
        $(this).each(function (index, element) {
            var o = $(element);

			
			o.find("."+_min).click(function(){
				o.find(".ms-content").hide();
				return false;
			});
			
			o.find("."+_max).click(function(){
				if(o.find(".ms-content").is(":visible")){
					o.find(".minimizator").removeClass("minimizator").addClass("maximizator");
					o.find(".ms-content").hide();
				} else {
					o.find(".maximizator").removeClass("maximizator").addClass("minimizator");
					o.find(".ms-content").show();
				}
				return false;
			});
			

        });
        return this;
    };
})(jQuery);
/* -------------------------- calendar mini -------------------------------*/
(function ($) {
    $.fn.SimpleCalendar = function (param) {
        $(this).each(function (index, element) {
            var o = $(element);
			
			var dates = [];
			var _dates = {};
			if(typeof param == 'object' && param.length>0){
				var dates = param;
			}
			
			for(var i=0;i<dates.length;i++){
				_dates[dates[i].date.getFullYear()+"-"+dates[i].date.getMonth()+"-"+dates[i].date.getDate()] = dates[i];
			}
			var jspp = null;
			var fu2 = function() {
					o.find(".event_div .content").html($(this).attr("data-txt")).show();
					o.find(".event_div").show();
					if(o.find('.scroll-pane100').data("jsp")) o.find('.scroll-pane100').data("jsp").destroy();
					o.find('.scroll-pane100').css("height","auto");
					o.find(".event_div").css("margin-top",o.find(".event_div").height()*(-1)/2 - 25);
					o.find('.scroll-pane100').css("height",o.find(".event_div").height());
					o.find('.scroll-pane100').jScrollPane();
				return false;
			};
			
			var fu = function(date) {
				var mo = {0:"января",1:"февраля",2:"марта",3:"апреля",4:"мая",5:"июня",6:"июля",7:"августа",8:"сентября",9:"октября",10:"ноября",11:"декабря"};
				
				//ищем дату
				var curDate = date; 
				var __curDate = new Date(date.getTime());
				var ___curDate = null;
				var stop = 50;
				var i;
				for(i = stop;i>0;i--){
					var strDate = curDate.getFullYear()+"-"+curDate.getMonth()+"-"+curDate.getDate();
					var __strDate = __curDate.getFullYear()+"-"+__curDate.getMonth()+"-"+__curDate.getDate();
					if(_dates[strDate]){
						break;
					}
					if(___curDate == null){
						if(_dates[__strDate]){
							___curDate = __curDate;
						} else {
							__curDate.setDate(__curDate.getDate()-1);
						}
					}
					curDate.setDate(curDate.getDate()+1);
				}
				if(i==0){
					if(___curDate !=null){
						curDate = ___curDate;
						strDate = curDate.getFullYear()+"-"+curDate.getMonth()+"-"+curDate.getDate();
					} else {
						return false;
					}
				}
				o.find(".today_index").attr("data-time",curDate.getTime());
				o.find(".today_date").html("<span>"+curDate.getDate()+"</span> " + mo[curDate.getMonth()]);
				var html = "";
				for(var i=0;i<_dates[strDate].data.length;i++){
					html += "<p><a href='' class='today-link-mini' data-txt='" + _dates[strDate].data[i].message.replace(/\'\"/,'') + "'>"+_dates[strDate].data[i].title+"</a></p>";
				}
				
				o.find(".today_event").html(html);
				
				o.find(".today-link-mini").click(fu2);
			}
			
			o.html('<div class="today today_index"><table width="100%"><tbody><tr><td class="prev_arrow"><a href=""></a></td><td class="today_date"></td><td class="today_event"><a href=""></a></td><td class="next_arrow"><a href=""></a></td></tr></tbody></table></div><div id="c-mini-msg" class="event_div today_index_mini" style="display: none; max-height:90%;height:auto;position:absolute;top:50%;margin-top:0px;"><a class="link_close"></a><div class="scroll-pane100"><div class="content "></div></div></div>');
			o.css("position","relative");
			
			fu(new Date());
			
			o.find(".next_arrow a").click(function(){
				var d = parseInt(o.find(".today_index").attr("data-time"));
				var dt = new Date(d);
				dt.setDate(dt.getDate()+1);
				fu(dt);
				return false;
			});
			
			o.find(".link_close").click(function(){
				$(this).parent().hide(); 
				$("p:has(.today-link)").removeClass("active");
			});
			
			o.find(".prev_arrow a").click(function(){
				var d = parseInt(o.find(".today_index").attr("data-time"));
				var dt = new Date(d);
				dt.setDate(dt.getDate()-1);
				var stop = 50;
				var i;
				for(i = stop;i>0;i--){
					var strDate = dt.getFullYear()+"-"+dt.getMonth()+"-"+dt.getDate();
					if(_dates[strDate]){
						break;
					}
					dt.setDate(dt.getDate()-1);
				}
				if(i==0){
					return false;
				}
				
				fu(dt);
				
				return false;
			});

        });
        return this;
    };
})(jQuery);

/*-------------------------------- Calendar ---------------------------*/

(function ($) {
    $.fn.NalogCalendar = function (param) {
        $(this).each(function (index, element) {
            var o = $(element);
			var dates = [];
			var _dates = {};
			if(typeof param == 'object' && param.length>0){
				var dates = param;
			}
			
			for(var i=0;i<dates.length;i++){
				_dates[dates[i].date.getFullYear()+"-"+dates[i].date.getMonth()+"-"+dates[i].date.getDate()] = dates[i];
			}
			
			var sm = [{num:0,title:"Январь"},{num:1,title:"Ферваль"},{num:2,title:"Март"},{num:3,title:"Апрель"},{num:4,title:"Май"},{num:5,title:"Июнь"},{num:6,title:"Июля"},{num:7,title:"Август"},{num:8,title:"Сентябрь"},{num:9,title:"Октябрь"},{num:10,title:"Ноябрь"},{num:11,title:"Декабрь"},{num:0,title:"Январь"},{num:1,title:"Ферваль"},{num:2,title:"Март"},{num:3,title:"Апрель"}];
			
			var dot = '<select name="c-mon" id="cmon">';
			var x = (new Date()).getMonth();
			var y = (new Date()).getFullYear();
			for(var i=x;i<(x+4);i++){
				dot +='<option value="'+sm[i].num+'">'+sm[i].title+'</option>'
			}
			dot +='</select><select name="c-year" id="cyear">';
			dot +='<option value="'+y+'">'+y+'</option>';
			if((x+4)>11){ dot +='<option value="'+(y+1)+'">'+(y+1)+'</option>'; }
			$("#my-sel").html(dot+"</select>");
			$("#cmon").select();
			$("#cyear").select();
			/*$("#cmon").bind("change.select",function(){
				
			});*/
			
			var fu2 = function() {
					$("p:has(.today-link)").removeClass("active");
					$(".event_div .content").html('<div style="height:221px;" class="scroller-pane"><div class="content_scroll">'+$(this).attr("data-txt")+"</div></div>").show();
					$(".event_div").show();
					$(".event_div .scroller-pane").jScrollPane();
					$(this).parent().addClass("active");
				return false;
			};
			
			var fu = function(target, cell, date, data) {
				var mo = {0:"января",1:"февраля",2:"марта",3:"апреля",4:"мая",5:"июня",6:"июля",7:"августа",8:"сентября",9:"октября",10:"ноября",11:"декабря"};
				
				//ищем дату
				var curDate = date;
				var __curDate = new Date(date.getTime());
				var ___curDate = null;
				var stop = 50;
				var i;
				for(i = stop;i>0;i--){
					var strDate = curDate.getFullYear()+"-"+curDate.getMonth()+"-"+curDate.getDate();
					var __strDate = __curDate.getFullYear()+"-"+__curDate.getMonth()+"-"+__curDate.getDate();
					if(_dates[strDate]){
						break;
					}
					if(___curDate == null){
						if(_dates[__strDate]){
							___curDate = __curDate;
						} else {
							__curDate.setDate(__curDate.getDate()-1);
						}
					}
					curDate.setDate(curDate.getDate()+1);
				}
				if(i==0){
					if(___curDate !=null){
						curDate = ___curDate;
						strDate = curDate.getFullYear()+"-"+curDate.getMonth()+"-"+curDate.getDate();
					} else {
						return false;
					}
				}
				
				
				$("td.today_date").html("<span>"+curDate.getDate()+"</span>"+mo[curDate.getMonth()]);
				var html = "";
				for(var i=0;i<_dates[strDate].data.length;i++){
					html += "<p><a href='' class='today-link' data-txt='" + _dates[strDate].data[i].message.replace(/\'\"/,'') + "'>"+_dates[strDate].data[i].title+"</a></p>";
				}
				$("td.today_event").html(html);
				
				$("a.today-link").click(fu2);
				
				//ПОИСК ближайшего дня
				var nextDate = new Date(curDate.getTime());
				nextDate.setDate(nextDate.getDate()+1);
				
				var stop = 50;
				var i;
				for(i = stop;i>0;i--){
					var strnDate = nextDate.getFullYear()+"-"+nextDate.getMonth()+"-"+nextDate.getDate();
					if(_dates[strnDate]){
						break;
					}
					nextDate.setDate(nextDate.getDate()+1);
				}
				if(i==0){
					$(".calendar_event").html("<strong>&nbsp;</strong><p><a href='' class='today-link today-c-link' data-txt=''></a>");
					return false;
				}
				var html2 ="<strong>"+nextDate.getDate() + " " + mo[nextDate.getMonth()] + "</strong>";
				for(var i=0;i<_dates[strnDate].data.length;i++){
					html2 += "<p><a href='' class='today-link today-c-link' data-txt='" + _dates[strnDate].data[i].message.replace(/\'\"/,'') + "'>"+_dates[strnDate].data[i].title+"</a></p>";
				}
				
				$(".calendar_event").html(html2);
				$("a.today-c-link").click(fu2);
				$("a.today-c-link").click(fu2);
				return false;
			};
			var ddd1 = new Date();
			
			o.find("#cmon option[value="+ddd1.getMonth()+"]").attr("selected", "selected");
			o.find("#cyear option[value="+ddd1.getFullYear()+"]").attr("selected", "selected");
			var tmpCal = o.find(".calendar_holder input").glDatePicker(
			{
				showAlways: true,
				specialDates: dates,
				selectableYears:[ddd1.getFullYear(),ddd1.getFullYear()+1,ddd1.getFullYear()+2],
				onClick: function(el, cell, date, data) {
					//el.val(date.toLocaleDateString());
					var t = 1;
					return false;
				},
				onClick: fu
			});
			
			var fusm = function(p,p2){
				//tmpCal.selectedDate = new Date(o.find("#cyear").val(),o.find("#cmon").val(),ddd1.getDate());
				if(p2 || p2 === 0 ){
				
					if((new Date()).getMonth()>parseInt(p.currentTarget.value)){
						$("#cyear").val((new Date()).getFullYear()+1).trigger("change");
						
						var t0= $($(".gldp-default div.title select").get(1));
						t0.find("option").removeAttr("selected");
						t0.val((new Date()).getFullYear()+1);
						t0.trigger("change");
						//console.log((new Date()).getFullYear()+1);
					} else{
						$("#cyear").val((new Date()).getFullYear()).trigger("change");
						var t0 = $($(".gldp-default div.title select").get(1));
						t0.find("option").removeAttr("selected");
						t0.val((new Date()).getFullYear());
						t0.trigger("change");
						//console.log((new Date()).getFullYear());
					}
				
					var t = $($(".gldp-default div.title select").get(0));
					t.find("option").removeAttr("selected");
					t.val($(this).find("option").get(p2).getAttribute("value"));
					t.trigger("change");
					
					
				}
				
				
			}
			
			var fusy = function(p,p2){
				//tmpCal.selectedDate = new Date(o.find("#cyear").val(),o.find("#cmon").val(),ddd1.getDate());
				if(p2 || p2 === 0 ){
				
					if((new Date()).getFullYear() == parseInt(p.currentTarget.value)){
						$("#cmon").find("option").removeAttr("selected");
						$("#cmon").val($("#cmon").find("option").first().attr("value"));
						$("#cmon").trigger("change");
						
						var t0=$($(".gldp-default div.title select").get(0));
						t0.find("option").removeAttr("selected");
						t0.val($("#cmon").find("option").first().attr("value"));
						t0.trigger("change");
						//console.log((new Date()).getFullYear()+1);
					} else{
						$("#cmon").find("option").removeAttr("selected");
						$("#cmon").val($("#cmon").find("option").last().attr("value"));
						$("#cmon").trigger("change");
						
						var t0=$($(".gldp-default div.title select").get(0));
						t0.find("option").removeAttr("selected");
						t0.val($("#cmon").find("option").last().attr("value"));
						t0.trigger("change");
						//console.log((new Date()).getFullYear());
					}
				
					var t = $($(".gldp-default div.title select").get(1));
					t.find("option").removeAttr("selected");
					t.val($(this).find("option").get(p2).getAttribute("value"));
					t.trigger("change");
					
					
				}
			}
			
			o.find("#cmon").bind("change.select",fusm);
			o.find("#cyear").bind("change.select",fusy);
			
			fu(null,null,new Date());
			
			//то был фулл
			o.after("<div id='mini-c-a-u'></div>");
			$("#mini-c-a-u").SimpleCalendar(dates);
			
			var res = function(){
				if($("html").width()>=945){
					o.show();
					o.prev().show();
					$(".gldp-default").show();
					$("#mini-c-a-u").hide();
				} else {
					o.hide();
					o.prev().hide();
					$(".gldp-default").hide();
					$("#mini-c-a-u").show();
				}
			}
			
			res();
			$(window).resize(res);
        });
        return this;
    };
})(jQuery);


/*-------------------------------- advSearch ---------------------------*/
(function ($) {
    $.fn.AdvPanel = function () {
        $(this).each(function (index, element) {
            var o = $(element);
			
			var ev = function(){
				var t = $(this);
				if(t.hasClass("show_more2")){
					t.next().show();
					t.removeClass("show_more2");
					t.addClass("hide_more2");
				} else {
					t.next().hide();
					t.addClass("show_more2");
					t.removeClass("hide_more2");
				}
				return false;
			}
			o.click(ev);
			if(o.hasClass("show_more2")){
				o.next().hide();
			} else {
				o.next().show();
			}
			o.next().find(".selectmenu-menu").css("width","148px");
        });
        return this;
    };
})(jQuery);


//--------- --------------- tags -------------------------------

(function ($) {
    $.fn.Tags = function (fixId) {
        $(this).each(function (index, element) {
            var o = $(element);
			
			var ev = function(){
				$(this).parent().remove();
				up();
				return false;
			}
			
			o.find(".news_tags a").click(ev);
			
			var up = function(){
				var tmp = [];
				var t0 = o.find(".tags-list");
				for(var i=0;i<t0.length;i++){
					tmp.push($(t0[i]).attr("data-txt"));
				}
				o.find(".tags_value").val(tmp.join(","));
			};
			
			var isex = function(txt){
				if(o.find(".news_tags > span[data-txt='"+txt+"']").length>0){
					return false;
				} else {
					return true;
				}
			};
			
			o.find("button").click(function(){
				var str = o.find(".tags_new_value").val();
				if(str.length>0 && isex(str)){
					if(o.find(".tags_new_value").attr("type")=="text"){
						$(this).parent().prev().append('<span class="tags-list" data-txt="'+str+'">'+str+'<a href=""></a></span>');
						o.find(".tags_new_value").val("");
					} else{
						$(this).parent().prev().append('<span class="tags-list" data-txt="'+str+'">'+o.find(".tags_new_value :selected").text()+'<a href=""></a></span>');
					}
					
					if(fixId || $("#"+fixId).length==1){
						$("#"+fixId).iCheck('check');
					}
					
					o.find(".news_tags a").last().click(ev);
					
					up();
				}
				return false;
			});
			
			up();
			
			if(fixId || $("#"+fixId).length==1){
				$("#"+fixId).bind('ifUnchecked',function(){
						o.find(".news_tags").html("");
						o.find(".tags_value").val("");
					});			
			}

        });
        return this;
    };
})(jQuery);


/*------------------------ Font resize  -----------------------------*/
		
var textResize = {

	fontmax: 16,
	fontmin: 9,
	fontdefault: 14,

	init: function (){

		var fontsize = $.cookie('font_size');
		if(fontsize) { textResize.fontResize(fontsize); }

		$('#decrease').click(function(){
			fontsize = $(document.body).css('font-size').slice(0,-2);
			fontsize--;
			textResize.fontResize(fontsize);
		});
					
		$('#increase').click(function(){
			fontsize = $(document.body).css('font-size').slice(0,-2);
			fontsize++;
			textResize.fontResize(fontsize);
		});

		$('#reset').click(function(){
			textResize.fontResize(textResize.fontdefault);
		});

	},

	fontResize: function(fontsize) {
		if(fontsize <= textResize.fontmax && fontsize >= textResize.fontmin) {
			$(document.body).css('font-size',fontsize + 'px');
			textResize.setWidthToFont();
			$.cookie("font_size", fontsize, { expires: 10 });
			$('.limit_size').each(function(){ $(this).removeClass('limit_size'); });
			if(fontsize == textResize.fontdefault){ $('#reset').addClass('limit_size'); }
			if(fontsize == textResize.fontmin){ $('#decrease').addClass('limit_size'); }
			if(fontsize == textResize.fontmax){ $('#increase').addClass('limit_size'); }
		}
	},

	setWidthToFont: function() {
		fontsize = $(document.body).css('font-size').slice(0,-2);
		if(fontsize <= textResize.fontmax && fontsize >= textResize.fontmin) {
			$('#wrapper').css('width','');
			div_width = $('#wrapper').css('width').slice(0,-2); 
			if(div_width >= 940 && fontsize > textResize.fontdefault) {
					div_width = 940 + 30*(fontsize - textResize.fontdefault); 
					$('#wrapper').css('width',div_width + 'px');
				}
		}
	}
};
				




/*------------------------ Tooltips  -----------------------------*/


// EZPZ Tooltip v1.0; Copyright (c) 2009 Mike Enriquez, http://theezpzway.com; Released under the MIT License
(function($){
	$.fn.ezpz_tooltip = function(options){
		var settings = $.extend({}, $.fn.ezpz_tooltip.defaults, options);

		return this.each(function(){
			var	content = $("#" + getContentId(this.id));

			if(settings.action == 'mouseover') {

				var targetMousedOver = $(this).mouseover(function(){
					settings.beforeShow(content, $(this));
				}).mousemove(function(e){
					contentInfo = getElementDimensionsAndPosition(content);

					if(settings.parentPosition) { 
						targetInfo = getElementDimensionsAndPosition($(this).parent());
					} else {
						targetInfo = getElementDimensionsAndPosition($(this));
					}

					contentInfo = $.fn.ezpz_tooltip.positions[settings.contentPosition](contentInfo, e.pageX, e.pageY, settings.offset, targetInfo);
					contentInfo = keepInWindow(contentInfo);
					
					content.css('top', contentInfo['top']-2);
					content.css('left', contentInfo['left']);
					
					settings.showContent(content);
				});
			
				if (settings.stayOnContent && this.id != "") {
					$("#" + this.id + ", #" + getContentId(this.id)).mouseover(function(){
						content.css('display', 'block');
					}).mouseout(function(){
						content.css('display', 'none');
						settings.afterHide();
					});
				}
				else {
					targetMousedOver.mouseout(function(){
						settings.hideContent(content);
						settings.afterHide();
					})
				}

			}

			if(settings.action == 'click') {

				var targetMousedOver = $(this).click(function(){
					settings.beforeShow(content, $(this));
				}).click(function(e){

					contentInfo = getElementDimensionsAndPosition(content);

					if(settings.parentPosition) { 
						targetInfo = getElementDimensionsAndPosition($(this).parent());
					} else {
						targetInfo = getElementDimensionsAndPosition($(this));
					}

					contentInfo = $.fn.ezpz_tooltip.positions[settings.contentPosition](contentInfo, e.pageX, e.pageY, settings.offset, targetInfo);
					contentInfo = keepInWindow(contentInfo);
									
					content.css('top', contentInfo['top']);
					content.css('left', contentInfo['left']);
					
					if(content.css('display') == 'none') {

						$('.active_link').each(function(){
							content1 = $("#" + getContentId(this.id));
							settings.hideContent(content1);
							$(this).removeClass("active_link");
						})

						settings.showContent(content);
						$(this).addClass("active_link");
						
					} else {
						settings.hideContent(content); 
						$(this).removeClass("active_link");
					}
					e.stopPropagation();
				});
				
				if (settings.stayOnContent && this.id != "") {
					$("#" + getContentId(this.id)).click(function(event){
						event.stopPropagation();
					});
				}
				
				$(document).click(function(){  
						
						$('.active_link').each(function(){
							content1 = $("#" + getContentId(this.id));
							settings.hideContent(content1);
							$(this).removeClass("active_link");
						})
				});  

			}
			
		});
		
		function getContentId(targetId){
			if (settings.contentId == "") {
				var name = targetId.split('-')[0];
				var id = targetId.split('-')[2];
				return name + '-content-' + id;
			}
			else {
				return settings.contentId;
			}
		};
		
		function getElementDimensionsAndPosition(element){
			var height = element.outerHeight(true);
			var width = element.outerWidth(true);
			var top = $(element).offset().top;
			var left = $(element).offset().left;
			var info = new Array();
			
			// Set dimensions
			info['height'] = height;
			info['width'] = width;
			
			// Set position
			info['top'] = top;
			info['left'] = left;
			
			return info;
		};
		
		function keepInWindow(contentInfo){
			var windowWidth = $(window).width();
			var windowTop = $(window).scrollTop();
			var output = new Array();
			
			output = contentInfo;
			
			if (contentInfo['top'] < windowTop) { // Top edge is too high
				output['top'] = windowTop;
			}
			if ((contentInfo['left'] + contentInfo['width']) > windowWidth) { // Right edge is past the window
				output['left'] = windowWidth - contentInfo['width'];
			}
			if (contentInfo['left'] < 0) { // Left edge is too far left
				output['left'] = 0;
			}
			
			return output;
		};
	};
	
	$.fn.ezpz_tooltip.positionContent = function(contentInfo, mouseX, mouseY, offset, targetInfo) {
		contentInfo['top'] = mouseY - offset - contentInfo['height'];
		contentInfo['left'] = mouseX + offset;
		
		return contentInfo;
	};
	
	$.fn.ezpz_tooltip.positions = {
		aboveRightFollow: function(contentInfo, mouseX, mouseY, offset, targetInfo) {
			contentInfo['top'] = mouseY - offset - contentInfo['height'];
			contentInfo['left'] = mouseX + offset;

			return contentInfo;
		}
	};
	
	$.fn.ezpz_tooltip.defaults = {
		contentPosition: 'aboveRightFollow',
		stayOnContent: false,
		offset: 10,
		contentId: "",
		beforeShow: function(content){},
		showContent: function(content){
			content.show();
		},
		hideContent: function(content){
			content.hide();
		},
		afterHide: function(){}
	};
	
})(jQuery);

// Plugin for different content positions. Keep what you need, remove what you don't need to reduce file size.

(function($){
	$.fn.ezpz_tooltip.positions.aboveFollow = function(contentInfo, mouseX, mouseY, offset, targetInfo) {
		contentInfo['top'] = mouseY - offset - contentInfo['height'];
		contentInfo['left'] = mouseX - (contentInfo['width'] / 2);
		
		return contentInfo;
	};
	
	$.fn.ezpz_tooltip.positions.rightFollow = function(contentInfo, mouseX, mouseY, offset, targetInfo) {
		contentInfo['top'] = mouseY - (contentInfo['height'] / 2);
		contentInfo['left'] = mouseX + offset;
		
		return contentInfo;
	};
	
	$.fn.ezpz_tooltip.positions.belowRightFollow = function(contentInfo, mouseX, mouseY, offset, targetInfo) {
		contentInfo['top'] = mouseY + offset;
		contentInfo['left'] = mouseX + offset;
		
		return contentInfo;
	};
	
	$.fn.ezpz_tooltip.positions.belowFollow = function(contentInfo, mouseX, mouseY, offset, targetInfo) {
		contentInfo['top'] = mouseY + offset;
		contentInfo['left'] = mouseX - (contentInfo['width'] / 2);
		
		return contentInfo;
	};
	
	$.fn.ezpz_tooltip.positions.aboveStatic = function(contentInfo, mouseX, mouseY, offset, targetInfo) {
		contentInfo['top'] = targetInfo['top'] - offset - contentInfo['height'];
		contentInfo['left'] = (targetInfo['left'] + (targetInfo['width'] / 2)) - (contentInfo['width'] / 2);
		
		return contentInfo;
	};
	
	$.fn.ezpz_tooltip.positions.rightStatic = function(contentInfo, mouseX, mouseY, offset, targetInfo) {
		contentInfo['top'] = (targetInfo['top'] + (targetInfo['height'] / 2)) - (contentInfo['height'] / 2);
		contentInfo['left'] = targetInfo['left'] + targetInfo['width'] + offset;
		
		return contentInfo;
	};
	
	$.fn.ezpz_tooltip.positions.belowStatic = function(contentInfo, mouseX, mouseY, offset, targetInfo) {
		contentInfo['top'] = targetInfo['top'] + targetInfo['height'] + offset;
		contentInfo['left'] = (targetInfo['left'] + (targetInfo['width'] / 2)) - (contentInfo['width'] / 2);
		
		return contentInfo;
	};
	
	$.fn.ezpz_tooltip.positions.belowStaticLeft = function(contentInfo, mouseX, mouseY, offset, targetInfo) {
		contentInfo['top'] = targetInfo['top'] + targetInfo['height'] + offset;
		contentInfo['left'] = targetInfo['left'];
		
		return contentInfo;
	};

	$.fn.ezpz_tooltip.positions.belowCenter = function(contentInfo, mouseX, mouseY, offset, targetInfo) {
		contentInfo['top'] = targetInfo['top'] + targetInfo['height'] + offset;
		contentInfo['left'] = ($(window).width() - contentInfo['width'])/2;
		
		return contentInfo;
	};

	$.fn.ezpz_tooltip.positions.centerCenter = function(contentInfo, mouseX, mouseY, offset, targetInfo) {
		contentInfo['top'] = targetInfo['top'] - contentInfo['height']/2 + offset;
		contentInfo['left'] = ($(window).width() - contentInfo['width'])/2;
		
		return contentInfo;
	};
	
})(jQuery);




/*------------------------ Main menu  -----------------------------*/


(function ($) {
    $.fn.MainMenu = function () {
        $(this).each(function (index, element) {
            var o = $(element);
			o.find(".submenu").hide();
			
			$("html").bind("click",function(){
				o.find(".clicked").removeClass("active");
				$("#nav_open").hide();
			});
			
			o.bind("click",function(event){
				event.stopPropagation();
			});
			
			var onclickf = function(e, el0){
				if(el0){
					var el = $(el0);
				} else {
					var el = $(this);
				}
				
				if(el.parent().hasClass("active")){
					el.parent().removeClass("active");
					$("#nav_open").hide();
					return false;
				}
				
				el.parent().parent().find(".clicked").removeClass("active");
				el.parent().addClass("active");
				
				if(el.parent().find(".submenu").length > 0){
					var txt = "";
					el.parent().find(".submenu").each(function(ind,obj){
						txt+='<div>'+ $(obj).html() +'</div>';
					});
				
					$("#nav_open").html(txt+'<span class="clear"></span>');
					$("#nav_open").show();
					return false;
				} else {
					$("#nav_open").hide();
					return true;
				}
				
				
			};
			
			o.after('<div id="nav_open" class="nav_open"></div>');
			
			o.find(".clicked > a").click(onclickf);
			
			var actEl = o.find(".active");
			
			onclickf(null, actEl.length == 1 ? actEl.get(0):null);

        });
        return this;
    };
})(jQuery);




/*------------------------ Tabs  -----------------------------*/

(function ($) {
    $.fn.NewTabs = function () {
        $(this).each(function (index, element) {
            var o = $(element);

			o.find(".tabs > td").click(function(){
				o.find(".tabs > td").removeClass("active");
				$(this).addClass("active");
				
				o.find(".tab-content-panel").hide();
				var ooo = $(o.find(".tab-content-panel").get(parseInt($(this).attr("pid")))); 
				ooo.show();
				var ooos = ooo.find(".scroll-pane");
				if(ooos.length>0){
					ooos.jScrollPane();
				}
				return false;
			});
			
			var list = o.find(".tabs > td");
			for(var i=0;i<list.length;i++){
				$(list[i]).attr("pid",i);
			}
			
			o.find(".tab-content-panel").hide();
			
			var li = o.find(".tabs > td.active");
			var lin = 0;
			if(li.length>0){
				lin = parseInt(li.first().attr("pid"));
			}
			
			o.find(".tabs > td").removeClass("active");
			o.find(".tabs > td[pid="+lin+"]").addClass("active");
			
			o.find(".tab-content-panel").hide();
			$(o.find(".tab-content-panel").get(lin)).show();
			
        });
        return this;
    };
})(jQuery);


(function ($) {
    $.fn.IdlersTabs = function () {
         $(this).each(function (index, element) {
            var o = $(element);

			o.find(".tabs2 > span > a").click(function(){
				o.find(".tabs2 > span").removeClass("active");
				$(this).parent().addClass("active");
				
				o.find(".tab-content-panel").hide();
				var ooo = $(o.find(".tab-content-panel").get(parseInt($(this).parent().attr("pid")))); 
				ooo.show();
				var ooos = ooo.find(".scroll-pane");
				if(ooos.length>0){
					ooos.jScrollPane();
				}
				return false;
			});
			
			var list = o.find(".tabs2 > span");
			for(var i=0;i<list.length;i++){
				$(list[i]).attr("pid",i);
			}
			
			o.find(".tab-content-panel").hide();
			
			var li = o.find(".tabs2 > span.active");
			var lin = 0;
			if(li.length>0){
				lin = parseInt(li.first().attr("pid"));
			}
			
			o.find(".tabs2 > span").removeClass("active");
			o.find(".tabs2 > span[pid="+lin+"]").addClass("active");
			
			o.find(".tab-content-panel").hide();
			$(o.find(".tab-content-panel").get(lin)).show();
			
        });
        return this;
    };
})(jQuery);



/*------------------------ Spoiler  -----------------------------*/


(function ($) {
    $.fn.Spoiler = function (options) {
		var params ={
			show:"&#1055;&#1086;&#1082;&#1072;&#1079;&#1072;&#1090;&#1100;&#32;&#1087;&#1086;&#1076;&#1088;&#1086;&#1073;&#1085;&#1086;&#1089;&#1090;&#1080;",
			hide:"&#1057;&#1082;&#1088;&#1099;&#1090;&#1100;&#32;&#1087;&#1086;&#1076;&#1088;&#1086;&#1073;&#1085;&#1086;&#1089;&#1090;&#1080;"
		}
		
		if(options){
			$.extend(params,options);
		}
	
        $(this).each(function (index, element) {
            var o = $(element);
			o.hide();
			
			var rnd = (new Date()).getMilliseconds();
			
			var todo = o.hasClass("open")?"hide":"show";
			
			var onclickf = function(){
				switchSpoiler(o.hasClass("open")?"show":"hide");
				return false;
			};
			
			var switchSpoiler = function(todo){
				if(todo == 'hide'){
					$("#spoiler_"+rnd).show();
					o.addClass("open");
					
					$(".spoiler_btn_"+rnd).first().addClass("hide_more");
					$(".spoiler_btn_"+rnd).first().removeClass("show_more");
				} else {
					$("#spoiler_"+rnd).hide();
					o.removeClass("open");
					$(".spoiler_btn_"+rnd).first().removeClass("hide_more");
					$(".spoiler_btn_"+rnd).first().addClass("show_more");
				}
				
				$(".spoiler_btn_"+rnd).html(params[todo]);
			};
			
			if(o.parent().hasClass("with_icon")){
				if(o.find(".dl_item").length>0){
					o.parent().after("<div id=\"spoiler_"+rnd+"\" class=\"download div_more_download\">" + o.html() + "<div class=\"clear\"><br></div><a href=\"\" class=\"hide_more bigger spoiler_btn_"+rnd+"\">"+params[todo]+"</a><div class=\"clear\"></div></div>");
				} else {
					o.parent().after("<div id=\"spoiler_"+rnd+"\" class=\"div_more\">" + o.html() + "<div class=\"clear\"><br></div><a href=\"\" class=\"hide_more  spoiler_btn_"+rnd+"\">"+params[todo]+"</a><div class=\"clear\"></div></div>");
				}
				
				o.after('<a href="" class="hide_more spoiler_btn_'+rnd+'">'+params[todo]+'</a>');
				
				
			} else {
				o.after("<div style='clear:both;'></div><div style=\"margin-top:10px;\" id=\"spoiler_"+rnd+"\" class=\"div_more\">" + o.html() + "<div class=\"clear\"><br></div><a href=\"\" class=\"hide_more  spoiler_btn_"+rnd+"\">"+params[todo]+"</a><div class=\"clear\"></div></div>");
				o.after('<a href="" class="hide_more spoiler_btn_'+rnd+'">'+params[todo]+'</a>');
			}
			$(".spoiler_btn_"+rnd).click(onclickf);
			switchSpoiler(todo);
        });
        return this;
    };
})(jQuery);




/*------------------------ Select  -----------------------------*/

$(function init(){
	if($('select').size()) var select=$('select').select();
});
//version 1.0.3
$.fn.select=function(o){
	var callMethod=$.fn.select.method,
		itemClick=jQuery.Event("itemClick"),
		selectReady=jQuery.Event("selectReady"),
		enabled=jQuery.Event("enabled"),
		disabled=jQuery.Event("disabled"),
		destroyed=jQuery.Event("destroyed");
	if(typeof o=="string" && o in $.fn.select.method){
		var select=$(this);
		callMethod[o](select);
		return select;
	}
	if(!("method" in $.fn.select)){
		$.fn.select.method={
			"destroy":function(select){
				if(select.data('customized')){
					select.off('change.select');
					$(document).off('click.select');
					select.each(function(){
						$(this).data('customSelect').off('click.select').remove();
					});
					select.removeData();
					select.trigger('destroyed');
				}else{
					throw new Error('объект не проинициализирован');
				}
			},
			"enable":function(select){
				if(select.data('disable')){
					select.attr('disabled',false);
					select.data('customSelect').first().on('click.select',select.data('openerHandler')).removeClass('disabled');
					select.trigger('enabled');
				}
			},
			"disable":function(select){
				if(!select.data('disable')){
					select.data('disable',true);
					select.attr('disabled',true);
					select.data('openerHandler',$._data(select.data('customSelect').first().get(0),"events").click[0].handler);
					select.data('customSelect').first().off('click').addClass('disabled');
					select.trigger('disabled');
				}
			}
		};
		callMethod=$.fn.select.method;
	}
	o=$.extend({
			"list":"ul",
			"item":"li",
			"itemHTML":"li",
			"openerClass":"dropdown",
			"icoClass":"dropdown_btn",
			"selectedClass":"dropdown_text",
			"activeItemClass":"active",
			"dropDownClass":"selectmenu-menu",
			"openerActiveClass":"state-active",
			"style":"dropdown", //popup,dropdown
			"transferClass":true,
			"dropdownHasBorder":true,
			"hasIcons":false,
			"resizable":false,
			"triggerEvents":true,
			"autocomplete":false
		},o);
		var select=[],
			body=$('body'),
			openerHTML=$('<a class="'+o.openerClass+'"><span class="'+o.icoClass+'"></span><span class="'+o.selectedClass+'"></span></a>'),
			dropdownHTML=$('<div class='+o.dropDownClass+'>'+
								'<div class="select-top">'+
									'<div class="select-l"></div>'+
									'<div class="select-r"></div>'+
								'</div>'+
								'<div class="select-c"><div class="dropdown_up dropdown-arrows"></div><div class="dropdown_down dropdown-arrows"></div>'+
									'<div class="c appendHere">'+
								'</div>'+
								'</div>'+
									'<div class="select-bottom">'+
									'<div class="select-l"></div>'+
									'<div class="select-r"></div>'+
								'</div>'+
							'</div>');
		$(this).each(function(i){
			if(!$(this).data('customized')){
				select.push(this);
			}
		});
		if(select.length){
			$(select).each(function(){
				var opener = openerHTML.clone(),
					nativeSelect = $(this),
					title=nativeSelect.find("option[title]").text(),
					selectId = nativeSelect.attr('id'),
					options=nativeSelect.find("option[title]").attr('disabled',true).end().find('option'),
					optionSize = options.size() - 1,
					dropdown = dropdownHTML.clone(),
					itemTree=o.itemHTML.split(' '),
					hasChild=itemTree.length>=2,
					list = "<" + o.list + ">";
				nativeSelect.find('option').each(function(i, data){
					if($(this).attr('title')){
						list += "<" + o.item + " data-val='"+data.value+"' data-lang='"+data.className+"' class='title "+data.className+"' style='display:none;'>" + data.childNodes[0].nodeValue + "</" + o.item + ">";
					}else{
						if(!hasChild){
							list += "<" + o.item + (data.selected?" class='active "+data.className+"' ":" class='"+data.className+"'") + " data-lang='"+data.className+"' data-val='"+data.value+"'><span>" + data.childNodes[0].nodeValue + "</span></" + o.item + ">";
						}else{
							var buffer='';
							for(var k=itemTree.length-1;k!=0;k--){
								if(!buffer){
									buffer+="<" + itemTree[k] + " >"+ data.childNodes[0].nodeValue +"</" + itemTree[k] + ">";
								}else if(k!=0 && itemTree.length>2){
									buffer="<" + itemTree[k] + ">"+buffer+"</" + itemTree[k] + ">";
								}
							}
							buffer="<" + itemTree[0] + ">"+buffer+"</" + itemTree[0] + ">";
							list+=buffer;
						}
					}
					if (i == optionSize) {
						list += "</" + o.list + ">";
					}
				});
				list = $(list);
				dropdown = dropdown.find('.appendHere').removeClass('appendHere').append(list).end();
				opener.insertAfter(nativeSelect);
				opener.find('.'+o.selectedClass).text(nativeSelect.find('option:selected').text());
				body.append(dropdown);
				(o.dropdownHasBorder) ? dropdown.width(opener.width()) : dropdown.width(opener.outerWidth());
				if(o.transferClass){
					opener.addClass(opener.attr('class') + " " + nativeSelect.attr('class'));
					dropdown.addClass(dropdown.attr('class') + " " + nativeSelect.attr('class'));
				}
				$(this).data('customSelect', opener.add(dropdown));
				$(this).data('customized', true);
				var listItems = list.find(">" + o.item),
					dropdownWidth = dropdown.outerWidth(),
					dropdownHeight = dropdown.outerHeight();
					selectedByHover='',
					selected='';
				if(!o.resizable){
					//opener.width(nativeSelect.width());
					(o.dropdownHasBorder) ? dropdownWidth=dropdown.width(opener.width()) : dropdownWidth=dropdown.width(opener.outerWidth());
				}else{
					$(window).on('resize.opener',function(){
						(o.dropdownHasBorder) ? dropdownWidth=dropdown.width(opener.width()) : dropdownWidth=dropdown.width(opener.outerWidth());
					}).trigger('resize.opener');
				}
				if(title){
					opener.find('.'+o.selectedClass).text(title);
					nativeSelect.trigger('change.select',[options.filter(':selected').index()]);
				}
				
				dropdown.bind("ddshow",function(){
					var dd = $(this);
					if(dd.width()<opener.width()){
						dd.width((o.dropdownHasBorder) ? opener.width()-2: opener.outerWidth()-2);
					}
				});
				
				var st_act = dropdown.find("li.active").attr("data-lang");
				if(st_act){
					opener.find("span.dropdown_text").addClass(st_act).prop("data-lang",st_act);
				}
				
				//autocomplete section
				if($(this).hasClass("writable")){
					o.autocomplete = true;
				}
				if(o.autocomplete){
					if(title) opener.find('.'+o.selectedClass).get(0).defaultValue=title;
					opener.find('.'+o.selectedClass).html('<input type="text" />');
					opener.find('.'+o.selectedClass).find('input').mouseup(function(e){
						var ooo5 = $(this);
						var offset = ooo5.offset();
						  var relativeX = (e.pageX - offset.left);
						  var relativeY = (e.pageY - offset.top);
						  if(relativeX<0 || relativeX>ooo5.width() || relativeY<0 || relativeY>ooo5.height()){
							return false;
						  }
						 
						 // alert("X: " + relativeX + "  Y: " + relativeY);
						
						$(this).val("");
						
					}).blur(function(e){
						var o55 = $(this);
						if($.trim(o55.val()).length==0){
							o55.val(nativeSelect.find(":selected").text());
						}
					}).keyup(function(e){
						var searchVal=$.trim($(this).val()),
							matched=[];
						
						dropdown.show();
						dropdown.trigger("ddshow");
						listItems.not('.title').each(function(){
							var text=$(this).text();
							//var textv=$(this).attr("data-val");
							if((new RegExp(searchVal,'ig')).test(text)){
								matched.push(this);
							}
							/*else if((new RegExp(searchVal,'ig')).test(textv)){
								matched.push(this);
							}*/
						});
						matched=$(matched);
						matched.show().first().addClass(o.activeItemClass).siblings().removeClass(o.activeItemClass);
						listItems.not(matched).hide();
						$(this).off('keydown').keydown(function(e){
							if(e.keyCode==13){
								matched.first().trigger('click');
								$(this).blur();
							}
						});
						if(!listItems.filter(':visible').size()){
							dropdown.hide();
						}
					}).val($(this).find(":selected").text());
				}
				nativeSelect.on("change.select", function(e, selectedIndex,dontHide){
					if (!selectedIndex && selectedIndex !== 0) selectedIndex = this.selectedIndex;
					listItems.removeClass(o.activeItemClass).eq(selectedIndex).addClass(o.activeItemClass);
					selected=options.removeAttr('selected').eq(selectedIndex);
					selected.get(0).selected=true;
					selectedByHover=selected;
					if(o.autocomplete) {
						opener.find('input').val(selected.text());
					}else{
						opener.find('.'+o.selectedClass).text(selected.text());
					}
					if(!dontHide){
						dropdown.hide();
						$(document).off('keydown.select');
					}
				});
				if(o.hasIcons){
					options.each(function(i){
						listItems.eq(i).prepend('<span class="'+this.className+'"></span>');
					});
					nativeSelect.on("change.select",function(e, selectedIndex,dontHide){
						opener.find('.'+o.selectedClass).prepend('<span class="'+selected.attr('class')+'"></span>');
					});
				}
				nativeSelect.hide();
				listItems.click(function(e){
					var ot = opener.find("span.dropdown_text");
					var otl = ot.prop("data-lang");
					if(otl){
						ot.removeClass(otl);
					}
					ot.addClass(e.currentTarget.className).prop("data-lang",e.currentTarget.className);
					nativeSelect.trigger("change.select", [$(this).index()]);
					dropdown.hide();
					opener.removeClass(o.openerActiveClass);
				});
				listItems.hover(function(){
					selectedByHover=$(this);
				},function(){
					selectedByHover="";
				});
				opener.click(function(e){
					if(dropdown.is(':hidden')){
					
						var ooo5 = $(this);
						var offset = ooo5.offset();
						var relativeX = (e.pageX - offset.left);
						var relativeY = (e.pageY - offset.top);
						
						var a = relativeX<0;
						var b = relativeX>ooo5.width();
						var c = relativeY<0;
						var d = relativeY>ooo5.height();
						if(a || b || c || d){
							return false;
						}
					
						opener.addClass(o.openerActiveClass);
						
						alignDropDown();
						$(document).off('keydown.select');
						$(document).on('keydown.select',function(e){
							if(e.keyCode==13 && selectedByHover){
								nativeSelect.trigger("change.select",[selectedByHover.index()]);
								e.preventDefault();
							}
							if(e.keyCode==38 && selected.prev().size() && !selected.prev().is(':disabled')){
								nativeSelect.trigger("change.select",[selected.prev().index(),true]);
								if(o.style=="popup"){
									alignDropDown();
								}
								e.preventDefault();
							}else if(e.keyCode==40 && selected.next().size() && !selected.next().is(':disabled')){
								nativeSelect.trigger("change.select",[selected.next().index(),true]);
								alignDropDown();
								e.preventDefault();
							}
						});
						
						var cul = dropdown.find("ul");
						var cli = cul.find("li");
						var ci = 0;
						for(var i=0;i<cli.length;i++){
							if($(cli[i]).hasClass("active"))
								break;
							ci=ci+1;
						}
						if(ci>3 && cli.length>7){
							ci = ci - 3;
						} else {
							ci = 0;
						}
						
						if(cli.length<=7){
							dropdown.find(".dropdown-arrows").hide();
							dropdown.find("ul").css("margin","0px");
						}
						
						
						dropdown.show();
						dropdown.trigger("ddshow");
						cul.scrollTop(28*ci);
					}else{
						opener.removeClass(o.openerActiveClass);
						dropdown.hide();
					}
				});
				
				var go_down = function(){
					var el = $(this).parent().find("ul");
					el.scrollTop(el.scrollTop()+196);
				};
				
				$(".dropdown_down").click(go_down);
				
				var go_up = function(){
					var el = $(this).parent().find("ul");
					var z = el.scrollTop()-196;
					if(z<0) z = 0;
					el.scrollTop(z);
				};
				
				$(".dropdown_up").click(go_up);
				var dtsc = new Date(2012,10,10);
				dropdown.find(".select-c > .c").mousewheel(function (event, delta) {
					//console.log(delta);
					if(delta == -1){
						var el = dropdown.find("ul");
						el.scrollTop(el.scrollTop()+49);
					} else {
						var el = dropdown.find("ul");
						el.scrollTop(el.scrollTop()-49);
					}
					return false;
				});
				
				
				$(window).on('resize.select', function(){
					if (dropdown.is(':visible')){
						alignDropDown();
					}
				});
				$(document).on('mousedown.select', function(e){
					if (!$(e.target).closest(dropdown).size() && !$(e.target).closest(opener).size()) {
						dropdown.hide();
						opener.removeClass(o.openerActiveClass);
						$(document).off('keydown.select');
					}
				});
				//event section
				if(o.triggerEvents){
					listItems.click(function(e){
						nativeSelect.trigger(itemClick, [$(this).text()]);
					});
					nativeSelect.trigger(selectReady,[dropdown]);
				}
				function alignDropDown(){
					if(o.style=="dropdown"){
						var top = opener.offset().top + opener.outerHeight(),
							left = opener.offset().left;
						/*
if(top + dropdownHeight > $(window).height() && top - dropdownHeight - opener.outerHeight() > 0){
							dropdown.css({
								'top': top - dropdownHeight - opener.outerHeight(),
								'left': left
							});
						}else{
*/
							dropdown.css({
								'top': top,
								'left': left
							});
						/*
}
*/
					}else{
						var top = opener.offset().top-listItems.filter("."+o.activeItemClass).position().top,
							left = opener.offset().left;
						dropdown.css({
							'top': top,
							'left': left
						});
					}
				}
				if(nativeSelect.is(':disabled')) nativeSelect.select('disable');
			});
		}else{
			throw Error('селект/ы уже проинициализирован/ы');
		}
}


