define(['jquery','av'],function($,AV){
    function yyy() {
        /*点击取消input按钮*/
        $('.icon2').on('click', function (e) {
            $('input#search').val('')
            $('label').removeClass('noactive')
            $('#searchKey').empty()
            $('#wrapper').removeClass('noactive')
            $('#searchLog').removeClass('noactive')
            $('#searchResult').addClass('noactive')
            $('#searchNoresult').addClass('noactive')
            $('#searchNoresult').empty()

        })
        /*点击热搜*/
        $('#hot-search').on('click', 'li', function (e) {
            reset()
            let value = $(e.currentTarget).text()
            $('input#search').val(value)
            let timer = null
            if (timer) {
                window.clearTimeout(timer)
            }
            timer = setTimeout(function () {
                timer = null
                search()
                $('#searchResult').removeClass('noactive')
                $('#searchLog').addClass('noactive')
                $('#wrapper').addClass('noactive')
                $('#searchKey').empty()
                let $li = $(e.currentTarget)
                let value = $li.text()
                console.log(value)
                let li = `<li>搜索"${value}"<li/>`
                $('#searchKey').append(li)
            }, 400)
        })
        /*点击取消搜索记录*/
        $('#searchLog').on('click', '#icon4', function (e) {
            let $icon4 = $(e.currentTarget)
            let $div = $icon4.parent()
            $div.remove()
        })
        /*查找函数*/
        function search() {
            reset()
            let value = $('input#search').val().trim()
            let $searchResult = $('ul#searchResult')
            let $searchLog = $('ul#searchLog')
            let $searchNoresult=$('ul#searchNoresult')
            if (value === '') {
                $('#searchNoresult').addClass('noactive')
                $('#searchNoresult').empty()
                $('label').removeClass('noactive')
                return
            }
            var query = new AV.Query('Song');
            query.contains('name', value);
            query.find().then(function (results) {
                $searchResult.empty()
                if (results.length === 0) {
                    $('#searchNoresult').removeClass('noactive')
                    $searchNoresult.empty()
                    let div=`<div>结果不存在</div>`
                    $searchNoresult.append(div)
                } else {
                    $('ul#searchNoresult').empty()
                    for (let i = 0; i < results.length; i++) {
                        let song = results[i].attributes
                        let div = `
                                <div>
                                    <svg class="icon">
                                        <use xlink:href="#icon-search"></use>
                                    </svg>
                                    <a href="./song.html?id=${results[i].id}"><li data-id="${results[i].id}">${song.name} - ${song.singer}</li></a>
                                </div>
                             `
                        $searchResult.append(div)
                    }
                }
            })
            query.find().then(function (results) {
                if (results.length === 0) {
                    return
                } else {
                    for (let i = 0; i < results.length; i++) {
                        let song = results[i].attributes
                        let div = `
                                <div id="div">
                                    <svg class="icon icon3">
                                        <use xlink:href="#icon-shizhong"></use>
                                    </svg>
                                    <a href="./song.html?id=${results[i].id}"><li data-id="${results[i].id}">${song.name} - ${song.singer}</li></a>
                                    <svg id="icon4" class="icon icon4">
                                        <use xlink:href="#icon-quxiao1"></use>
                                    </svg>
                                </div>

                             `
                        $searchLog.prepend(div)
                    }
                }
            })
        }
        /*重置函数（点击时清理input内容，消除取消键）*/
        function reset() {
            $('label').addClass('noactive')
            $('.icon2').addClass('active')
        }
    }
    return yyy
})

//存储信息
/* var SongObject = AV.Object.extend('Song'); //生成一个新的数据库
 var songObject = new SongObject();//在数据库生成新的记录
 songObject.set({
 name:'中国话(2017《开学第一课》“字以溯源”插曲)',
 singer:'任嘉伦 - 中国话',
 url:'//m10.music.126.net/20170907145841/36ef6502031cd3fc810d73424bb84b2f/ymusic/fa2c/2e47/e90d/43485ae00085dd727213c87cf0c36ee5.mp3'
 })
 var songObject2 = new SongObject();
 songObject2.set({
 'name':'雨のち感情論',
 singer:'和楽器バンド ',
 url:'//m10.music.126.net/20170907152156/a04186765d117feab3322cd971ffadf0/ymusic/1701/9bcc/c311/01ce34cc0df89b2ad3ead0fd82ef29e8.mp3'
 })
 var songObject3 = new SongObject();
 songObject3.set({
 'name':'一剪梅 舟过吴江（《诗词歌赋》作品集）',
 singer:'简弘亦 ',
 url:'//m10.music.126.net/20170907153240/f7cdb7e0d1c989d60a3167b4b9c333c3/ymusic/1701/9bcc/c311/01ce34cc0df89b2ad3ead0fd82ef29e8.mp3'
 })
 //      var songObject4 = new SongObject();
 //      songObject4.set({
 'name':'어차피 잊`을 거면서',
 singer:'俊昊 / CHEEZE',
 url:'//m10.music.126.net/20170907153428/92ec240b4ecebb22f11e4f2367a04660/ymusic/55c3/b2ae/d7cf/0412ae99a735df3ef7a4d1503135e18a.mp3'
 })
 var songObject5 = new SongObject();
 songObject5.set({
 'name':'Blood on the Dance Floor X Dangerous (The White Panda Mash-Up)',
 singer:'Michael Jackson / The White Panda ',
 url:'//m10.music.126.net/20170907153445/f0b16c590ccef7285346b26d62d47c55/ymusic/f6ed/3370/cb50/a317aef16c4ba9b4973296e586a08ef5.mp3'
 })
 var songObject6 = new SongObject();
 songObject6.set({
 'name':'주르륵',
 singer:'My-Q / TAEK',
 url:'//m10.music.126.net/20170907153518/20f1a3493e36c5ddaab40ab8ef7697d2/ymusic/016a/e85d/61bf/51f49cbce64f712a39341f57aea1b28c.mp3'
 })
 var songObject7 = new SongObject();
 songObject7.set({
 'name':'见坏就收',
 singer:'张信哲',
 url:'//m10.music.126.net/20170907153545/37c021d236f9244f5ee82891dfd6ef14/ymusic/a964/a4a7/d7e8/d7f646e048df9b5a5a41d9f5a70e6fda.mp3'
 })
 let songs=[songObject,songObject2,songObject3,songObject4,songObject5,songObject6,songObject7]
 AV.Object.saveAll(songs)
 */
/*var SongObject = AV.Object.extend('Song'); //生成一个新的数据库
 var songObject = new SongObject();//在数据库生成新的记录*/
/*songObject.set('name','1')*/
/*var songObject2 = new SongObject();*/
/* songObject2.set('name','2')
 let songs=[songObject,songObject2]
 AV.Object.saveAll(songs)*/
/*songObject.save({
 name: '暧昧',//数据里面的内容
 singer:'薛之谦',
 url:'http://ovh9tpl25.bkt.clouddn.com/%E6%9A%A7%E6%98%A7.mp3'
 }).then(function(object) {
 alert('保存成功');
 })*/
/*songObject.save({
 name: '演员',//数据里面的内容
 singer:'薛之谦',
 url:'http://ovh9tpl25.bkt.clouddn.com/%E6%BC%94%E5%91%98.mp3'
 }).then(function(object) {
 alert('保存成功');
 })*/
/*songObject.save({
 name: '你还要我怎样',//数据里面的内容
 singer:'薛之谦',
 url:'http://ovh9tpl25.bkt.clouddn.com/%E4%BD%A0%E8%BF%98%E8%A6%81%E6%88%91%E6%80%8E%E6%A0%B7.mp3'
 }).then(function(object) {
 alert('保存成功');
 })*/

