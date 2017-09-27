/*输入input*/
define(['jquery','av'],function($,AV){
    let timer=null
    function xxx(){
        $('input#search').on('input',function() {
            reset()
            throttle(searchDisplayResult,400)
        })
    }
    return xxx
    function reset(){
        $('label').addClass('noactive')
        $('.icon2').addClass('active')
    }
    function throttle(callback,time){
        if(timer){window.clearTimeout(timer)}
        timer=setTimeout(function(){
            timer=null
            callback()
        },time)
    }
    function searchDisplayResult(){
        search()
        displayResult()
    }
    function template1(result){
        let song=result.attributes
        return `
            <div>
                <svg class="icon">
                    <use xlink:href="#icon-search"></use>
                </svg>
                <a href="./song.html?id=${result.id}"><li data-id="${result.id}">${song.name} - ${song.singer}</li></a>
            </div>
         `
    }
    function template2(result){
        let song=result.attributes
        return `<div id="div">
                <svg class="icon icon3">
                    <use xlink:href="#icon-shizhong"></use>
                </svg>
                <a href="./song.html?id=${result.id}"><li data-id="${result.id}">${song.name} - ${song.singer}</li></a>
                <svg id="icon4" class="icon icon4">
                    <use xlink:href="#icon-quxiao1"></use>
                </svg>
            </div>`
    }
    function searchSongs(value){
        var query1 = new AV.Query('Song');
        query1.contains('name', value);
        var query2 = new AV.Query('Song');
        query2.contains('singer', value);
        var query=AV.Query.or(query1,query2)
        return query.find()
    }
    function generateSearchResult1(results){
        $('ul#searchResult').empty()

        $('#searchResult').removeClass('noactive')
        if(results.length===0){
            $('ul#searchNoresult').empty()
            let div=`<div>结果不存在</div>`
            $('ul#searchNoresult').append(div)
        }else{
            $('ul#searchNoresult').empty()
            for(let i=0;i<results.length;i++){
                let div=template1(results[i])
                $('ul#searchResult').append(div)
            }
        }
    }
    function generateSearchResult2(results){
        if(results.length===0){
            return
        }else{
            for(let i=0;i<results.length;i++){
                let div=template2(results[i])
                $('ul#searchLog').prepend(div)
            }
        }
    }
    function search(){
        let value=$('input#search').val().trim()
        if(value===''){

            $('#searchNoresult').empty()
            $('label').removeClass('noactive')
            return}
        searchSongs(value).then(generateSearchResult1)
        searchSongs(value).then(generateSearchResult2)
    }
    function displayResult(){
        $('#searchLog').addClass('noactive')
        $('#wrapper').addClass('noactive')
        $('#searchKey').empty()
        let value=$('input#search').val()
        let li=`<li>搜索"${value}"<li/>`
        $('#searchKey').append(li)
    }
})


