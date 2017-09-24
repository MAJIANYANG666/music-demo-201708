//初始化AV对象
define(['av'],function(AV){
    return function(){
        var APP_ID = 'C97vnqMpJpDB05tNiObyKutc-gzGzoHsz';
        var APP_KEY = 'REdfXRGxVNRvvUUg62V1aqjN';

        AV.init({
            appId: APP_ID,
            appKey: APP_KEY
        });
    }
})
