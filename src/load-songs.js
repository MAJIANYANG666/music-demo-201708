//加载完成显示最新歌曲
define(['jquery','av'],function($,AV){
    function loadSongs() {
        getSongs().then(fillSongs, function (error) {
            alert('获取歌曲失败')
        })
    }
    function template1(song,results){
        return `<li>
            <a href="./song.html?id=${results.id}">
              <div class="wrapper">
                <h3>${song.name}</h3>
                <svg class="icon " >
                  <use xlink:href="#icon-SQ"></use>
                </svg>
                <span>${song.singer}</span>
              </div>
              <svg class="icon " >
                <use xlink:href="#icon-bofangjian60px"></use>
              </svg>
            </a>
          </li>`
    }
    function template2(i,song,results){
        if(i<9){
            return `<li>
            <a href="./song.html?id=${results.id}">
            <p >0${i+1}</p>
              <div class="wrapper">
                <h3>${song.name}</h3>
                <svg class="icon " >
                  <use xlink:href="#icon-SQ"></use>
                </svg>
                <span>${song.singer}</span>
              </div>
              <svg class="icon " >
                <use xlink:href="#icon-bofangjian60px"></use>
              </svg>
            </a>
          </li>`
        }else{
            return `<li>
            <a href="./song.html?id=${results.id}">
            <p >${i+1}</p>
              <div class="wrapper">
                <h3>${song.name}</h3>
                <svg class="icon " >
                  <use xlink:href="#icon-SQ"></use>
                </svg>
                <span>${song.singer}</span>
              </div>
              <svg class="icon " >
                <use xlink:href="#icon-bofangjian60px"></use>
              </svg>
            </a>
          </li>`}
    }
    function getSongs(){
        var query = new AV.Query('Song');
        return query.find()
    }
    function fillSongs(results){
        $('#songs-loading').remove()
        for(let i=0;i<results.length;i++) {
            let song = results[i].attributes
            let li = template1(song,results[i])
            $('ul#song').append(li)
        }
        $('#hot-songs-loading').remove()
        for(let i=0;i<results.length;i++) {
            let song = results[i].attributes
            let li = template2(i,song,results[i])
            $('ul#hot-song').append(li)
        }
    }
    return loadSongs
})


