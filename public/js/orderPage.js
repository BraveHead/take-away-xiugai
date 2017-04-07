/**
 * Created by 三页 on 2017/2/26.
 */
(function () {
    /*加载初始状态*/
    $('.show_shopping_car_container').css('height',document.body.offsetHeight +"px") ;
    let arrStat = ['images/icon/no_collection.png','images/icon/collection.png'],
        arrStatCopy = ['images/icon/collection_dark.png',"images/icon/red_stat.png"],
        shareArr = ['order_share sprite sprite-share',"order_share sprite sprite-share_dark"],
        backArr = ['order_back sprite sprite-back','order_back sprite sprite-back_gray'];
    var storage = window.sessionStorage;
    var scrolling = true;
    var ulItemArr = [];
    let allFoodItemCount;
    var dataJson = {"foodData":[
        {"foodItem":"春卷","peace":"$22","sku":"0","count":0},
        {"foodItem":"麻瓜","peace":"$25","sku":"1","count":0},
        {"foodItem":"黄瓜","peace":"$24","sku":"0","count":0},
        {"foodItem":"小菜","peace":"$22","sku":"1","count":0},
        {"foodItem":"肉类","peace":"$11","sku":"0","count":0},
        {"foodItem":"视屏","peace":"$34","sku":"1","count":0},
        {"foodItem":"好吃的","peace":"$24","sku":"1","count":0},
        {"foodItem":"不好吃的","peace":"$14","sku":"0","count":0},
        {"foodItem":"一点不好","peace":"$34","sku":"1","count":0},
        {"foodItem":"都好","peace":"$12","sku":"0","count":0},
        {"foodItem":"真的不好","peace":"$23","sku":"1","count":0}
    ]
    };
    /*选择配送服务*/
    function choiceServer() {
        $('.server-setting-container').css({
            'display':'block',
            'height':$(document).height() +"px",
            "z-index":100
        });
        $('.server-setting').css({
            "display":'block',
            "top":($(document).height() - $('.server-setting').height())/2+'px',
            "left":($(document).width() - $(".server-setting").width())/2 + "px",
            "z-index":100
        });
        let serverPicArr = ['sprite sprite-noClickedServer','sprite sprite-clickedServer'];
        $('.server-setting-type>div>i').on('click',function () {
            let index = $('.server-setting-type>div>i').index(this);
            $('.server-setting-type>div>i').attr('class',serverPicArr[0]);
            $('.server-setting-type>div>i').eq(index).attr('class',serverPicArr[1]);
            $('.server-sdetting-item').eq(index).addClass('show').siblings().removeClass('show');
        });
        /**
         * @className 节点的className
         * @nowIndex 点击后需要添加到的元素的下标
         */
        function showContent(className,nowIndex) {
            /*点击区域，显示选项*/
            $('.'+ className).on('click',function () {
                $('.region-list-container').css({
                    'display':'block',
                    'top':($(window).height() - $('.region-list-container').height())/2 + "px",
                    'left':($(document).width() - $(".region-list-container").width())/2 + "px"
                });
            });
        }
        let nowIndex;
        $('.region-div').on('click',function (e) {
            nowIndex = $('.region-div').index(this);
            showContent('region-div',nowIndex);
        });
        /*选择选项后关闭区域选项框*/
        $('.region-list-container li').on('click',function (e) {
            let index = $('.region-list-container li').index(this);
            $('.region-list-container').css('display','none');
            $('.region-div').eq(nowIndex).html($('.region-list-container li').eq(index).html() + '<i class="sprite sprite-serverSettingDown"></i>');
        });
        /*确认保存信息*/
        $('.sure-server').on('click',function (e) {
            $('.server-setting-container').css({
                "display":'none',
                "z-index":50
            });
            $('.server-setting').css('display','none');
        });
        $('.cancel-server, .server-setting-titel>img').on('click',function (e) {
            $('.server-setting-container').css('display','none');
            $('.server-setting').css('display','none');
        })
    }
    /*点击返回上一页*/
    $('.order_back').on('click',function (e) {
        window.history.back();
    });

    /*商家nav点击效果*/
    function switchTab() {
        $('.module_list').click(function(){
            var listIndex = $(this).index();
            $('.module_list_default').removeClass('showBottomRed');
            $('.module_list_default').eq(listIndex).addClass("showBottomRed");
        });
    }
    /**
     * @param className  节点clasName
     * @param index  下标
     */
    function ulScrollItem(className, index) {
        $(className).removeClass("showFoodListWhited")
            .eq(index).addClass("showFoodListWhited");
    }
    function scrollFun() {
        if(scrolling){
            let a = $(this).scrollTop();
            let length = $(".food_type_list_item").length;
            for(let i = 0; i < length; i++){
                if(ulItemArr[i]< a && a<=ulItemArr[i+1]-1){
                    ulScrollItem(".food_type_list_item",i);
                }
            }
        }

    }
   /* 监听页面容器的滚动，产生变化*/
    function listenScrollBox() {
        var newOne = document.querySelectorAll(".new");
        var newScrollTop;
        newOne[0].addEventListener('scroll',function (e) {

            newScrollTop = newOne[0].scrollTop;
            if(newScrollTop >= 20){
                $('.order_food_header').addClass('headerTransform');
                $('.order_back').attr('class',backArr[1]);
                if( $('.order_collection').attr('src') == arrStat[1]){
                    $('.order_collection').attr('src',arrStatCopy[1]);
                }else{
                    $('.order_collection').attr('src',arrStatCopy[0]);
                }
                $('.order_header_message_container').addClass('headerTransform showTransformHidden');
                $('.business-item-name').css({'display':'block','color':'#3c3c3c'});
                $('.order_share').attr("class",shareArr[1]);
            }else{
                $('.order_share').attr("class",shareArr[0]);
                $('.order_food_header').removeClass("headerTransform");
                if($('.order_collection').attr('src') == arrStatCopy[1]){
                    $('.order_collection').attr('src',arrStat[1]);
                }else{
                    $('.order_collection').attr('src',arrStat[0]);
                }
                $('.order_back').attr('class',backArr[0]);
                $('.order_header_message_container').removeClass('headerTransform showTransformHidden');
                $('.business-item-name').css({'display':'none','color':'#3c3c3c'});
            }

        });
        $(".food_list_item_ul").on("scroll",scrollFun);
    }
    /*获取各商品类型的点击切换效果并获取设置内容的高度*/
    function ClickTabViewContent() {
        window.onload = function () {
            var foodTypeName = document.getElementsByClassName('food_type_list_item');
            var foodName = document.querySelectorAll(".food_list_item");
            var foodContainerTop = 0;
            var next;
            var addNext = 0;
            var ulHeight = $(document).height()-$(".business_module_container").height()-$(".order_food_header").height()-$(".shopping_car_bottom").height();
            $(".food_type_list_container, .food_list_item_ul").css("height",ulHeight);
            if(foodTypeName){
                for(let i = 0; i <　foodTypeName.length;i++){
                    foodTypeName[i].setAttribute("contentHeight",foodContainerTop);
                    ulItemArr.push(foodContainerTop);
                    foodContainerTop += foodName[i].offsetHeight + 20;
                    foodTypeName[i].addEventListener("click",function (e) {
                        scrolling = false;
                        $(this).addClass("showFoodListWhited").siblings().removeClass("showFoodListWhited");
                        next = parseInt(this.getAttribute("contentHeight"));
                        var setScrollTop = setInterval(function () {
                            scrolling = false;
                            if(next > addNext){
                                addNext += 50;
                                if(addNext >= next){
                                    addNext = next;
                                    clearInterval(setScrollTop);
                                    scrolling = true;
                                }
                                $('.food_list_item_ul').scrollTop(addNext);
                            }else{
                                addNext -= 50;
                                if(addNext <= next){
                                    addNext = next;
                                    clearInterval(setScrollTop);
                                    scrolling = true;
                                }
                                $('.food_list_item_ul').scrollTop(addNext);
                            }
                        },50);
                    });
                }
            }
        }
    }
    /*购物车功能*/
    function ShoppingCar() {
        /*获取数据并存到sessionStroage*/
        allFoodItemCount = dataJson.foodData.length;
        // for(let i = 0; i < allFoodItemCount;i++){
        //     storage.setItem("foodItem"+i,JSON.stringify(dataJson.foodData[i]));
        // }
        /**
         * @reduceName 减少按钮的className
         * @countName   数量的className
         * @index 当前的节点的下标
         */
        /*判断当前的数量，少于0则隐藏*/
        function buttonShowOrHidden(reduceName,countName, index) {
            let foodItem = JSON.parse(storage.getItem("foodItem"+index));
            if(foodItem.count <= 0){
                foodItem.count = 0;
                storage.setItem('foodItem'+index,JSON.stringify(foodItem));
                $("." + reduceName).eq(index).css('visibility','hidden');
                $("." +countName).eq(index).css('visibility','hidden');
            }else{

                $("." +reduceName).eq(index).css('visibility','visible');
                $("." +countName).eq(index).css('visibility','visible');
            }
        }

        /**
         * @index 当前点击的元素下标
         */

        /*购物车列表的中商品的显示与隐藏*/
        function ShoppingListItemShowOrHidden(index) {
            let foodItemIndex = JSON.parse(storage.getItem('foodItem'+index));
            for(let i = 0; i< allFoodItemCount;i++){
                let foodItem = JSON.parse(storage.getItem("foodItem"+i));
                if(foodItem.count != 0){
                    $('.shopping_item').eq(i).css('display','block');
                    $('.reduceCar').eq(index).css('visibility','visible');
                    $('.numberCar').eq(index).css('visibility','visible').text(foodItemIndex.count);
                    if(foodItem.sku == "1"){
                        let str = foodItem.type + foodItem.addFood.split(" ");
                        $('.shoppingItem_name').eq(i).html("<span id='newShoppingItemSpan'>"+ foodItem.foodItem +"</span>"+
                            "<p id='addSkuFoodType'>"+ str +"</p>");
                    }
                }else{
                    $('.shopping_item').eq(i).css('display','none');
                }
            }

        }
        /*添加事件*/
        let isChoiceServer = false;
        $('.add_count').on('click', function (){
            if(!isChoiceServer){
                choiceServer();
                isChoiceServer = true;
            }
            let nowIndex = $(".add_count").index(this);
            let foodItem = JSON.parse(storage.getItem("foodItem"+nowIndex));
            let nowCount = foodItem.count;
            if(foodItem.sku == "0"){
                nowCount += 1;
                foodItem.count = nowCount;
                storage.setItem('foodItem'+nowIndex, JSON.stringify(foodItem));
                let foodItemNext = JSON.parse(storage.getItem('foodItem'+nowIndex));
                $('.now_count').eq(nowIndex).text(foodItemNext.count);
                buttonShowOrHidden("reduce","now_count",nowIndex);

                ShoppingListItemShowOrHidden(nowIndex);
                ShoppingBill();  //购物车总价与数量
            }else{
                $('.sku-food-html').css({
                    'display':'block',
                    'height':$(document).height()+"px",
                    'background-color':'rgb(241,241,241)'
                });
                $('.sku-food-name').text(foodItem.foodItem);
                $('.sku-food-peace').text(foodItem.peace);
                $('.sku-food-count').text(foodItem.count);

                /*sku商品数量的添加*/
                let skuFoodCount = foodItem.count;
                $('.sku-food-addcount').on('click',function () {
                    skuFoodCount += 1;
                    $('.sku-food-count').text(skuFoodCount);
                });

                /*sku商品数量的减少*/
                $('.sku-food-reduce').on('click',function () {
                    let skuFoodCount = parseInt($('.sku-food-count').text());
                    skuFoodCount -= 1;
                    if(skuFoodCount <= 0){
                        skuFoodCount = 0;
                    }
                    $('.sku-food-count').text(skuFoodCount);
                });
                /*sku商品的选择口味*/
                let flavorItemPic = $('.flavorItemPic');
                flavorItemPic.on("click",function (e) {
                    let nowIndex = flavorItemPic.index(this);
                    let picSrc = flavorItemPic.eq(nowIndex).attr('class');
                    if(picSrc == 'flavorItemPic sprite sprite-noClickedRound'){
                        flavorItemPic.attr('class',"flavorItemPic sprite sprite-noClickedRound").
                        eq(nowIndex).attr('class','flavorItemPic sprite sprite-clickedRound');
                    }
                });
                let addDish = $('.add-dish');
                addDish.on('click',function (e) {
                    let nowIndex = addDish.index(this);
                    let picSrc = addDish.eq(nowIndex).attr('class');
                    if(picSrc == 'add-dish sprite sprite-noClickedSquare'){
                        addDish.eq(nowIndex).attr('class','add-dish sprite sprite-clickedSquare');
                    }else{
                        addDish.eq(nowIndex).attr('class','add-dish sprite sprite-noClickedSquare');
                    }
                });
                /*点击取消，不保存sku选项*/
                $('.time-header-back-message').on('click',function () {
                    $('.sku-food-html').css('display','none');
                    ShoppingBill();  //购物车总价与数量
                });
                /*点击确认，并保存sku的选择*/
                $('.sure').one('click',function () {
                    let skuFoodCount = parseInt($('.sku-food-count').text());
                    foodItem.count = skuFoodCount;
                    foodItem['addFood'] = "";
                    $('.add-dish').off("click");
                    for(let i= 0; i < flavorItemPic.length;i++){
                        if(flavorItemPic.eq(i).attr('class') == "flavorItemPic sprite sprite-clickedRound"){
                            foodItem['type'] = flavorItemPic.eq(i).siblings().text();
                        }
                    }
                    for(let i= 0; i < $('.add-dish').length;i++){
                        if($('.add-dish').eq(i).attr('class') == "add-dish sprite sprite-clickedSquare"){
                            foodItem['addFood'] += " "+$('.add-dish').eq(i).siblings().text();
                        }
                    }
                    storage.setItem('foodItem'+ nowIndex, JSON.stringify(foodItem));
                    $('.sku-food-html').css('display','none');

                    let foodItemNext = JSON.parse(storage.getItem('foodItem'+nowIndex));
                    $('.now_count').eq(nowIndex).text(foodItemNext.count);
                    buttonShowOrHidden("reduce","now_count",nowIndex);

                    ShoppingListItemShowOrHidden(nowIndex);
                    ShoppingBill();  //购物车总价与数量
                })
            }

        });

        /*减少事件*/
        $('.reduce').on('click', function () {
            let nowIndex = $('.reduce').index(this);
            let foodItem = JSON.parse(storage.getItem("foodItem"+nowIndex));
            let nowCount = foodItem.count;
            nowCount -= 1;
            foodItem.count = nowCount;
            storage.setItem('foodItem'+nowIndex, JSON.stringify(foodItem));
            let foodItemNext = JSON.parse(storage.getItem('foodItem'+nowIndex));
            $('.now_count').eq(nowIndex).text(foodItemNext.count);
            buttonShowOrHidden("reduce",'now_count',nowIndex);
            ShoppingListItemShowOrHidden(nowIndex);
            ShoppingBill();  //购物车总价与数量
        });

        /*购物车添加事件*/
        $('.addCar').on('click',function() {
            let nowIndex = $(".addCar").index(this);
            let foodItem = JSON.parse(storage.getItem("foodItem"+nowIndex));
            let nowCount = foodItem.count;
            nowCount += 1;
            foodItem.count = nowCount;
            storage.setItem('foodItem'+nowIndex, JSON.stringify(foodItem));
            let foodItemNext = JSON.parse(storage.getItem('foodItem'+nowIndex));
            $('.now_count').eq(nowIndex).text(foodItemNext.count);
            buttonShowOrHidden("reduceCar","numberCar",nowIndex);
            ShoppingListItemShowOrHidden(nowIndex);
            ShoppingBill();  //购物车总价与数量
        });

        /*购物车减少事件*/
        $('.reduceCar').on('click',function() {
            let nowIndex = $(".reduceCar").index(this);
            let foodItem = JSON.parse(storage.getItem("foodItem"+nowIndex));
            let nowCount = foodItem.count;

            nowCount -= 1;
            foodItem.count = nowCount;
            storage.setItem('foodItem'+nowIndex, JSON.stringify(foodItem));
            let foodItemNext = JSON.parse(storage.getItem('foodItem'+nowIndex));
            $('.now_count').eq(nowIndex).text(foodItemNext.count);
            buttonShowOrHidden("reduceCar",'numberCar',nowIndex);
            buttonShowOrHidden("reduce",'now_count',nowIndex);
            ShoppingListItemShowOrHidden(nowIndex);
            ShoppingBill();  //购物车总价与数量
        });

        /*点击弹出购物车*/
        var showIndex = 0;
        let shoppingCarContent = $('#shopping_car_content');
        let showCarContainer = $('.show_shopping_car_container');
        $(".shopping_car_pic").on("click",function () {
            shoppingCarContent.css("left",($(document).width() - $("body").width())/2);
            showCarContainer.css({
                "height":$(document).height(),
                "left":($(document).width() - $("body").width())/2
            });
            if(parseInt($(".shopping_car_count").text()) != 0){
                showIndex++;
                if(showIndex >= 2){
                    showCarContainer.css('display','none');
                    shoppingCarContent.css('display','none');
                    showIndex = 0;
                }else{
                    showCarContainer.css({'display':'block','height':1000+'px'});
                    shoppingCarContent.slideDown(500);
                    showCarContainer.on("click",function (e) {
                        $(this).css("display",'none');
                        shoppingCarContent.css('display','none');
                    });
                }
                /*/!*清除点单的所有信息*!/*/
                $('.clear_shopping').on('click',function (e) {
                    storage.clear();
                    location.reload();
                });
            }

        });

        /*购物车账单*/
        function ShoppingBill() {
            let billPeace = 0;
            let shoppingCount = 0;
            for(let i = 0; i < allFoodItemCount; i++){
                let foodItem = JSON.parse(storage.getItem('foodItem'+ i));
                billPeace += foodItem.count * parseInt(foodItem.peace.substr(1));
                shoppingCount += foodItem.count;
            }
            if(shoppingCount > 0){
                $('.shopping_car_count').css({
                    'display':'block'
                }).text(shoppingCount);
            }else{
                $('.shopping_car_count').css('display','none').text(0);
            }

            let a = billPeace - 40;
            if(billPeace > 0){
                $('.shopping_car_pic').attr('class','shopping_car_pic sprite sprite-shoppingCar');
                $('.altogether').text("$"+ billPeace);
            }else{
                billPeace = 0;
                $('.shopping_car_pic').attr('class','shopping_car_pic sprite sprite-no_shopping');
                $('.altogether').text("购物篮是空的");
            }

            if(a >= 0){
                $('.lack').text('结算支付').css('background-color','rgb(225,39,63)');
            }else{
                $('.lack').text("还差$"+ (-a)).css('background-color','rgb(170,170,170)');
            }
        }

        /*点击结算*/
        $('.lack').on('click',function () {
            if($(this).text() == '结算支付'){
                $(this).attr('href','orderSettlement.html');
            }else{
                alert("配送额不够");
            }
        })
    }
    /*点击背景消失*/
    function clickBeiJing() {
        $(".server-setting-container").on("click",function (e) {
            $(this).css("display","none");
            $(".server-setting").css("display",'none');
            $(".region-list-container").css("display","none");
        })
    }
    //加载函数
    function init() {
        switchTab();//点击每个模块的时候可以呈现对应的内容
        listenScrollBox();//监听页面容器的滚动变化
        ClickTabViewContent();//点左边切换到右边的商品详情
        ShoppingCar();//添加购物车
        clickBeiJing();//点击背景弹框消失
    }
    init();//启动函数
})();