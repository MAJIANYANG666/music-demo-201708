'use strict';

//加载完成显示最新歌曲
!function ($, AV) {
    loadSongs();
    function loadSongs() {
        getSongs().then(fillSongs, function (error) {
            alert('获取歌曲失败');
        });
    }
    function template(song, results) {
        return '<li>\n            <a href="./song.html?id=' + results.id + '">\n              <div class="wrapper">\n                <h3>' + song.name + '</h3>\n                <svg class="icon " >\n                  <use xlink:href="#icon-SQ"></use>\n                </svg>\n                <p>' + song.singer + '</p>\n              </div>\n              <svg class="icon " >\n                <use xlink:href="#icon-bofangjian60px"></use>\n              </svg>\n            </a>\n          </li>';
    }
    function getSongs() {
        var query = new AV.Query('Song');
        return query.find();
    }
    function fillSongs(results) {
        $('#songs-loading').remove();
        for (var i = 0; i < results.length; i++) {
            var song = results[i].attributes;
            var li = template(song, results[i]);
            $('ul#song').append(li);
        }
    }
}(jQuery, AV);