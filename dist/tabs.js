"use strict";!function(e,a){a.tabs=function(a){e(a).on("click","li",function(a){var i=e(a.currentTarget),t=i.index();i.addClass("active").siblings(".active").removeClass("active"),i.parent().parent().parent().next().children().eq(t).addClass("active").siblings(".active").removeClass("active")})}}(jQuery,app);