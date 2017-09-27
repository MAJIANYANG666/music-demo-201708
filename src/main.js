/**
 * Created by Administrator on 2017/9/24.
 */

requirejs.config({
    paths: {
        jquery: '../vendors/jquery.min', // 路径2
        av:'../vendors/av-min'
    }
});

require(['./tabs','./load-songs','./search','./av-init','./home'],function(tabs,loadSongs,search,AVInit,yyy){
    AVInit()
    tabs('.tabs')
    loadSongs()
    search()
    yyy()
})