"use strict";!function($,app){function tabs(selectorOrDom){var $tabs=$(selectorOrDom);$tabs.on("click","li",function(e){var $li=$(e.currentTarget);var index=$li.index();$li.addClass("active").siblings(".active").removeClass("active");var $page=$li.parent().parent().parent().next().children().eq(index);$page.addClass("active").siblings(".active").removeClass("active")})}app.tabs=tabs}(jQuery,app);
