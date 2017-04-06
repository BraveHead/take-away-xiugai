/**
 * Created by 三页 on 2017/3/6.
 */
(function () {

    var  storage = window.sessionStorage;

    if(storage.getItem('timeNum') == 1){
        $('.TimeTypeSwitchItem>a').eq(1).addClass("showSwitchRed").css('border-bottom-color','rgb(229,35,63)');
        $('.TimeTypeSwitchItem>a').eq(0).removeClass("showSwitchRed").css('border-bottom-color','rgb(253,253,253)');
        $('.TimeSwitchContext').eq(1).css('display','block');
        $('.TimeSwitchContext').eq(0).css('display','none');
    }
    if(storage.getItem('timeNum') == 0){
        $('.TimeSwitchContext').eq(1).css('display','none');
        $('.TimeSwitchContext').eq(0).css('display','block');
        $('.TimeTypeSwitchItem>a').eq(0).addClass("showSwitchRed").css('border-bottom-color','rgb(229,35,63)');
        $('.TimeTypeSwitchItem>a').eq(1).removeClass("showSwitchRed").css('border-bottom-color','rgb(253,253,253)');
    }


    $('.TimeTypeSwitchItem>a').on('click',function () {
        var index = $('.TimeTypeSwitchItem a').index(this);
        $('.TimeTypeSwitchItem>a').removeClass('showSwitchRed').css('border-bottom-color','rgb(253,253,253)');
        $('.TimeTypeSwitchItem>a').eq(index).addClass('showSwitchRed').css('border-bottom-color','rgb(229,35,63)');
        $('.TimeSwitchContext').eq(index).css('display','block').siblings('.TimeSwitchContext').css('display','none');
    });

    $('.TimeContentTitle').on('click',function () {
        window.history.back();
    })
})();