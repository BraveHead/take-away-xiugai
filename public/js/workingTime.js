/**
 * Created by 三页 on 2017/3/6.
 */
(function () {

    var  storage = window.sessionStorage;

    if(storage.getItem('timeNum') == 1){
        $('.time-typeswitch-Item>a').eq(1).addClass("showSwitchRed").css('border-bottom-color','rgb(229,35,63)');
        $('.time-typeswitch-Item>a').eq(0).removeClass("showSwitchRed").css('border-bottom-color','rgb(253,253,253)');
        $('.time-switch-context').eq(1).css('display','block');
        $('.time-switch-context').eq(0).css('display','none');
    }
    if(storage.getItem('timeNum') == 0){
        $('.time-switch-context').eq(1).css('display','none');
        $('.time-switch-context').eq(0).css('display','block');
        $('.time-typeswitch-Item>a').eq(0).addClass("showSwitchRed").css('border-bottom-color','rgb(229,35,63)');
        $('.time-typeswitch-Item>a').eq(1).removeClass("showSwitchRed").css('border-bottom-color','rgb(253,253,253)');
    }


    $('.time-typeswitch-Item>a').on('click',function () {
        var index = $('.time-typeswitch-Item a').index(this);
        $('.time-typeswitch-Item>a').removeClass('showSwitchRed').css('border-bottom-color','rgb(253,253,253)');
        $('.time-typeswitch-Item>a').eq(index).addClass('showSwitchRed').css('border-bottom-color','rgb(229,35,63)');
        $('.time-switch-context').eq(index).css('display','block').siblings('.time-switch-context').css('display','none');
    });

    $('.time-content-title').on('click',function () {
        window.history.back();
    })
})();