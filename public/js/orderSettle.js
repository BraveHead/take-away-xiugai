/**
 * Created by 三页 on 2017/3/9.
 */
(function () {

    /*返回上一页*/
    function orderSettleBack() {
        $('.order-settle-back').on('click',function (e) {
            window.history.back();
        })
    }

    /*选择地址*/
    function choiceAddress() {
        $(".xuan-zhong").eq(0).css("display","inline-block");
        $(".add-address-item-container").on("click",function () {
            let nowIndex = $(".add-address-item-container").index(this);
            $(".xuan-zhong").css("display",'none').eq(nowIndex).css("display","inline-block");
        })
    }

    let payTypeArr = ['pay-type-clicked sprite sprite-noClickedType','pay-type-clicked sprite sprite-clickedType'];
    let btnToggleArr = ['button-yuE sprite sprite-btn_toggle_n','button-yuE sprite sprite-btn_toggle_s'];

    /*选择不同的支付方式*/
    function choicePayType() {
        $('.pay-type-clicked').on('click',function (e) {
            let nowIndex = $('.pay-type-clicked').index(this);
            let picSrc = $('.pay-type-clicked').eq(nowIndex).attr("class");
            if(picSrc == payTypeArr[0]){
                $('.pay-type-clicked').attr("class",payTypeArr[0]).eq(nowIndex).attr("class",payTypeArr[1]);
            }else{
                $('.pay-type-clicked').attr("class",payTypeArr[0]).eq(nowIndex).attr("class",payTypeArr[0]);
            }
        })
    }

    /*选择优惠开关*/
    function clickedToggle() {
        $('.button-yuE').on('click',function (e) {
            if($(this).attr("class") == btnToggleArr[0]){
                $(this).attr("class",btnToggleArr[1]);
            }else{
                $(this).attr("class",btnToggleArr[0]);
            }
        })
    }

    /*点击添加优惠券*/

    function addCoupon() {
        /*点击添加优惠券*/
        $('.add-new-address').on('click',function (e) {
            $(".add-coupon-alert").css({
                'display':'block',
                'height':$(document).height() +'px'
            });

            $('.add-coupon-number').css({
                'top':($(document).height() - $('.add-coupon-number').height())/2 + 'px',
                'display':'block'
            });
        });
        /*确认和取消优惠券的添加*/
        $(".cancel-coupon").on("click",function (e) {
            $('.add-coupon-alert').css("display",'none');
            $('.add-coupon-number').css('display','none');
        });
        $('.sure-coupon').on('click',function (e) {
            $('.add-coupon-alert').css("display",'none');
            $('.add-coupon-number').css('display','none');
        });
        
        /*删除过期优惠券*/
        $('.delete-coupon>i').on('click',function (e) {
            let index = $('.delete-coupon>i').index(this);
            $('.overdue-coupon').eq(index).css('display','none');
        })

    }

    /*填写备注*/

    function FillRemarks() {
        $('.default-choice>span').on('click',function (e) {
            let nowIndex = $('.default-choice>span').index(this);
            let text =  $('.fill-remarks-text').text();
            $('.fill-remarks-text').text(text+" "+$('.default-choice>span').eq(nowIndex).text());
        });
       $('.close-fill-remarks').on('click',function (e) {
           window.history.back();
       })
    }

    function init() {
        orderSettleBack();//返回上一页
        choiceAddress();//选择地址
        choicePayType();//选择不同的支付方式
        clickedToggle();//选择优惠是否
        addCoupon(); //点击添加优惠券
        FillRemarks();//给商家填写备注
    }

    init();
})();