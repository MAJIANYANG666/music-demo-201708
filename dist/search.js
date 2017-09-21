'use strict';

/*输入input*/
!function ($, window, AV) {
    var timer = null;
    $('input#search').on('input', function () {
        reset();
        throttle(searchDisplayResult, 400);
    });
    function reset() {
        $('label').addClass('noactive');
        $('.icon2').addClass('active');
    }
    function throttle(callback, time) {
        if (timer) {
            window.clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = null;
            callback();
        }, time);
    }
    function searchDisplayResult() {
        search();
        displayResult();
    }
    function template1(result) {
        var song = result.attributes;
        return '\n            <div>\n                <svg class="icon">\n                    <use xlink:href="#icon-search"></use>\n                </svg>\n                <a href="./song.html?id=' + result.id + '"><li data-id="' + result.id + '">' + song.name + ' - ' + song.singer + '</li></a>\n            </div>\n         ';
    }
    function template2(result) {
        var song = result.attributes;
        return '\n            <div id="div">\n                <svg class="icon icon3">\n                    <use xlink:href="#icon-shizhong"></use>\n                </svg>\n                <a href="./song.html?id=' + results[i].id + '"><li data-id="' + results[i].id + '">' + song.name + ' - ' + song.singer + '</li></a>\n                <svg id="icon4" class="icon icon4">\n                    <use xlink:href="#icon-quxiao1"></use>\n                </svg>\n            </div>\n         ';
    }
    function searchSongs(value) {
        var query1 = new AV.Query('Song');
        query1.contains('name', value);
        var query2 = new AV.Query('Song');
        query2.contains('singer', value);
        var query = AV.Query.or(query1, query2);
        return query.find();
    }
    function generateSearchResult1(results) {
        $('ul#searchResult').empty();
        if (results.length === 0) {
            $('ul#searchResult').html('结果不存在');
        } else {
            for (var _i = 0; _i < results.length; _i++) {
                var div = template1(results[_i]);
                $('ul#searchResult').append(div);
            }
        }
    }
    function generateSearchResult2(results) {
        if (results.length === 0) {
            $('ul#searchResult').html('结果不存在');
        } else {
            for (var _i2 = 0; _i2 < results.length; _i2++) {
                var div = template2(results[_i2]);
                $('ul#searchLog').prepend(div);
            }
        }
    }
    function search() {
        var value = $('input#search').val().trim();
        if (value === '') {
            $('label').removeClass('noactive');
            return;
        }
        searchSongs(value).then(generateSearchResult1);
        searchSongs(value).then(generateSearchResult2);
    }
    function displayResult() {
        $('#searchLog').addClass('noactive');
        $('#wrapper').addClass('noactive');
        $('#searchKey').empty();
        var value = $('input#search').val();
        var li = '<li>\u641C\u7D22"' + value + '"<li/>';
        $('#searchKey').append(li);
    }
}(jQuery, window, AV);