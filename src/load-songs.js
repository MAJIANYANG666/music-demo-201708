//加载完成显示最新歌曲
define(['jquery','av'],function($,AV){

    function loadSongs() {
        getSongs().then(fillSongs, function (error) {
            alert('获取歌曲失败')
        })
    }
    function template(song,results){
        return `<li>
            <a href="./song.html?id=${results.id}">
              <div class="wrapper">
                <h3>${song.name}</h3>
                <svg class="icon " >
                  <use xlink:href="#icon-SQ"></use>
                </svg>
                <p>${song.singer}</p>
              </div>
              <svg class="icon " >
                <use xlink:href="#icon-bofangjian60px"></use>
              </svg>
            </a>
          </li>`
    }
    function getSongs(){
        var query = new AV.Query('Song');
        return query.find()
    }
    function fillSongs(results){
        $('#songs-loading').remove()
        for(let i=0;i<results.length;i++) {
            let song = results[i].attributes
            let li = template(song,results[i])
            $('ul#song').append(li)
        }
    }
    return loadSongs
})


