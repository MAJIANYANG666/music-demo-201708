/*tabs*/
define(['jquery'],function($){
    function tabs(selectorOrDom){
        let $tabs=$(selectorOrDom)
        $tabs.on('click','li',function(e){
            var $li=$(e.currentTarget)
            var index=$li.index()
            $li.addClass('active').siblings('.active').removeClass('active')
            var $page=$li.parent().parent().parent().next().children().eq(index)
            $page.addClass('active').siblings('.active').removeClass('active')
        })
    }
    return tabs
})




