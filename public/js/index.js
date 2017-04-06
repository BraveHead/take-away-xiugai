/**
 * Created by 三页 on 2017/2/23.
 */
/*外卖首页列表*/
(function () {

    /*返回上一页*/
    $('.back').on('click',function (e) {
       window.history.back();
    });

    /*首页切换商家在线状态和商家列表对应显示*/
    $(".Selection_mode a").eq(0).addClass("selection_mode_now").css('color','rgb(255,255,255)');

    $(".Selection_mode a").on("click",function (e) {
        var index = $(this).index();
        $(this).eq($(this).index(this)).css('color','rgb(255,255,255)').siblings().css("color",'rgb(255,193,60)');

        $(this).eq($(this).index(this)).addClass("selection_mode_now").siblings().removeClass("selection_mode_now");

        $(".distribution_list").eq(index).addClass('show').siblings().removeClass("show");

    });
    /*首页切换各类型餐馆的列表*/
    $('.category').on('click',function (e) {
        // var index1 = $(this).index(this);
        var index = $(this).index();
        $(this).addClass("in")
            .siblings().removeClass('in');
        $(".show>.business_container").eq(index).addClass("show").siblings().removeClass("show");
    });

    /*点击排序方法*/
        /*点击下拉*/

    $('.sort').on("click",function (e) {

        $(".fixed_sort").slideDown("normal").addClass("show");
        $(this).addClass("sort_back");
        $(".index-beijing").css({
            "display":"block",
            "height":$(document).height() + "px",
            "left":($(document).width() - $("body").width())/2 + "px"
        }).slideDown("normal");
        $(".sort>img").attr('src',"Pictures/Pic/header_icon/sort_clicked.png");

    });

        /*点击切换选中*/
    $(".fixed_sort li").on("click",function (e) {
        $(this).addClass("fixed_sort_clicked").siblings().removeClass("fixed_sort_clicked");
        $(".fixed_sort p>i").slideUp("normal").css("display","none")
        $(".fixed_sort p").eq($(".fixed_sort li").index(this)).append("<i class='sort-pic sprite sprite-duigou'></i>");
        $(".fixed_sort").slideUp('normal',function () {
            $(".sort>i").attr('class',"sprite sprite-sort_gray");
        }).removeClass("show");
        $(".index-beijing").slideUp("normal").css("display","none")
    });
    $(".index-beijing").on("click",function () {
        $(this).slideUp("normal");
        $(".fixed_sort").slideUp("normal");

    });

    /*搜索地址*/
    $('.searchInputCheck').on('input propertychange',function (e) {
        if($(this).val() == 'no'){
            $('.ShowSearchAddress').html("<img src='./Pictures/Pic/header_icon/Vector-Smart-Object.png' class='daXiang'/>" +
                "<p>阿偶~你想找的不在这里哎</p>" +
                "<h5>啊~查无此地区！检查下你的输入再试吧！</h5>");
        }
    });
    /*热门搜索*/
    $('.hot_search_content_type>span').on('click',function (e) {
        let nowIndex = $('.hot_search_content_type>span').index(this);
        if(!hidden){
            $('.history_search_content_type').prepend('<span>'+ $('.hot_search_content_type>span').eq(nowIndex).text()
                +'<i style="display: block" class="sprite sprite-clear_item"></i></span>');
        }else{
            $('.history_search_content_type').prepend('<span>'+ $('.hot_search_content_type>span').eq(nowIndex).text()
                +'<i style="display: none" class="sprite sprite-clear_item"></i></span>');
        }


    });

    let hidden = true;
    $('.clear_both_pic').on('click',function (e) {
        if(hidden){
            $('.history_search_content_type i').css("display","block");
            hidden = false;
            $('.history_search_content_type>span>i').on('click',function (e) {
                let nowIndex = $('.history_search_content_type>span>i').index(this);
                $('.history_search_content_type>span').eq(nowIndex).hide();
            });
        }else{
            $('.history_search_content_type i').css("display","none");
            hidden = true;
        }
    });
})();