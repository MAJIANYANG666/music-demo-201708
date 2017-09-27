/**
 * Created by Administrator on 2017/9/27.
 */

//初始化AV对象
var APP_ID = 'C97vnqMpJpDB05tNiObyKutc-gzGzoHsz';
var APP_KEY = 'REdfXRGxVNRvvUUg62V1aqjN';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
/*获取查询字符串id*/
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var id  = getParameterByName('id');
var query = new AV.Query('Song');
/*通过id得到歌曲资源,添加播放，暂停和暂停歌词*/
query.get(id).then(function (song) {
    let {url,lyric,image,name,singer}=song.attributes
    initPlayer.call(undefined,url)
    initText.call(undefined,lyric,name,image,singer)

})
function initText(lyric,name,image,singer) {
    let li=`<li><span>${name}</span> - ${singer}`
    $('#title').append(li)
    $('#disk-image').attr("src",image)
    $('#page').append(`<style>
                                    #page::before{
                                                    background:transparent url(${image}) no-repeat center center;
                                                    background-size:cover;
                                                  }
                                </style>`);
    parseLyric.call(undefined,lyric)
}
function initPlayer(url){
    let audio=document.createElement('audio')
    audio.src=url
    //点击播放按钮
    $('#play').on('click',function(){
        audio.play()
        $('#circle').addClass('playing')
        $('.pointer').addClass('playing')
    })
    //点击暂停按钮
    $('#pause').on('click',function(){
        audio.pause()
        $('#circle').removeClass('playing')
        $('.pointer').removeClass('playing')
    })
    audio.addEventListener('ended',function(){
        $('#circle').removeClass('playing')
        $('.pointer').removeClass('playing')
    })
    setInterval(function(){
        let time=audio.currentTime
        let $lines=$('.lines>li')
        let $whichLine
        for(let i=0;i<$lines.length;i++){
//                    $lines[i+1]!==undefined
            if($lines.eq(i+1).length!==0 && $lines.eq(i).attr('data-time')<=time && $lines.eq(i+1).attr('data-time')>time){
                $whichLine=$lines.eq(i)
            }
        }
        if($whichLine){
            $whichLine.addClass('active').prev().removeClass('active');
            let top=$whichLine.offset().top
            let linesTop=$('.lines').offset().top
            let height=$('.lyrics').height()/3
            let delta=top-linesTop-height
            $('.lines').css('transform',`translateY(-${delta}px)`)
        }
    },300)
}
function parseLyric(lyric){
    let array=[]
    let parts=lyric.split('\n')
    parts.map(function(string,index) {
        let xxx = string.split(']')
        xxx[0] = xxx[0].substring(1)
        let regex = /(\d+):([\d.]+)/
        let matches = xxx[0].match(regex)
        let minute = +matches[1]
        let seconds = +matches[2]
        array.push({time: minute * 60 + seconds, lyric: xxx[1]})
    })
    array.map(function(object){
        if(!object){return}
        let li=`<li id="li" data-time="${object.time}">${object.lyric}</li>`
        $('.lines').append(li)
    })

}
