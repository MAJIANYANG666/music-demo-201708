/**
 * Created by Administrator on 2017/9/24.
 */
require(['./tabs','./load-songs','./search','./av-init','./home'],function(tabs,loadSongs,search,AVInit,yyy){
    AVInit()
    tabs('.tabs')
    loadSongs()
    search()
    yyy()
})