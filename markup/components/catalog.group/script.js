!function(a){"use strict";a(function(){a("#toContactForm").click(function(){a(window).scrollTo("#contactForm",500)}),a(".b-address-link").click(function(b){a.scrollTo(".b-estate__map",500),b.preventDefault()}),document.getElementById("estateProgress")&&a(window).scroll(function(){!a(".b-estate-progressbar__percent").hasClass("i-animated")&&a(document).scrollTop()+a(window).height()-a(".b-estate-progressbar").offset().top>100&&a(".b-estate-progressbar__percent").addClass("i-animated").css({width:parseInt(a(".b-estate-progressbar__percent").text(),10)+"%"})}),a(".b-top-menu a").click(function(b){return a.scrollTo(a(""+a(this).attr("href")),500),b.preventDefault(),!1}),a(".b-estate__props").addClass("i-animate")})}(jQuery);