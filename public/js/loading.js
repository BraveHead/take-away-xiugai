/**
 * Created by 三页 on 2017/3/9.
 */
(function () {

    /*返回上一页*/
    function backToPrev() {
        $('.backLoading').on('click',function () {
            window.history.back();
        })
    }

    /*忘记密码界面的选项切换*/
    function tabChange() {
        $('.contactTab>span').on('click',function () {
            let index = $('.contactTab>span').index(this);
            $('.contactTab>span').eq(index).addClass('collectTabShow').siblings().removeClass('collectTabShow');
            $('.forgetTab').eq(index).addClass("show").siblings(".forgetTab").removeClass('show');
        });
    }
    let pattern,
        email = false,
        phone = false,
        password = false,
        emailPan = true,
        phoneCode = false;

    /*验证邮箱*/
    function checkEmail(str){
        pattern = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
        return email = pattern.test(str);
    }
    /*验证手机*/
    function checkPhoneNumber(number) {
        pattern = /0?(13|14|15|18)[0-9]{9}/;
        return phone = pattern.test(number);
    }
    /*验证密码8-16位数字与字母组合的密码*/
    function checkPassword(str) {
        pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
        return password = pattern.test(str);
    }
    /*验证6位手机验证码*/
    function checkPhoneCode(number) {
        pattern = /\d{6}/;
        return phoneCode = pattern.test(number);
    }

    /*登录按钮的可登录状态的切换*/
    function switchLoadingToRed(name) {
        $(name).css({
            "color":"#ffffff",
            "background-color":"#e5233f"
        })
    }
    function switchLoadingToWhite(name) {
        $(name).css({
            "color":"#aaaaaa",
            "background-color":"rgb(249,249,249)"
        })
    }
    /*获取手机验证码的按钮的切换*/
    function switchPhoneCodeToRed(name) {
        $(name).css({
            "color":"#ffffff",
            "background-color":"#e5233f"
        })
    }
    function switchPhoneCodeToWhite(name) {
        $(name).css({
            "color":"#aaaaaa",
            "background-color":"rgb(231,231,231)"
        })
    }
    //登录页面验证
    function checkLoading() {
        $(".ema-pho").on("input propertychange",function (e) {
            checkEmail($(this).val());
            checkPhoneNumber(parseInt($(this).val()));
        });
        $(".password").on("input propertychange",function (e) {
            let emailAndPhoneText = $(".ema-pho").val(),
                passwordText = $(".password").val();
            checkPassword($(this).val());
            if(emailAndPhoneText && passwordText){
                switchLoadingToRed("#loading-check");
            }else{
                switchLoadingToWhite("#loading-check");
            }
        });
        $("#loading-check").on("click",function (e) {
            if(email || phone){
                if(password){
                    alert("登录成功！");
                    return true;
                }else{
                    alert("输入的账号或者密码错误，请重输！");
                    return false;
                }
            }else{
                alert("输入的账号或者密码错误，请重输！");
                return false;
            }
        })
    }

    //修改密码页面的验证
    function changePasswordCheck() {
        $(".fg-email").on("input propertychange",function (e) {
            let fgEmail = $(".fg-email").val();
            checkEmail($(this).val());
            if(fgEmail){
                switchLoadingToRed(".getEmailPassword");
            }else{
                switchLoadingToWhite(".getEmailPassword");
            }
        });

        $(".getEmailPassword").on("click",function (e) {
            if(email){
                alert("邮箱密码发送成功,请查收！");
                return true;
            }else{
                alert("输入的账号或者密码错误，请重输！");
                return false;
            }
        });

        $(".fg-phone").on("input propertychange",function () {
            checkPhoneNumber($(this).val());
            if($(this).val()){
                switchPhoneCodeToRed(".getVerificationCode");
            }else{
                switchPhoneCodeToWhite(".getVerificationCode");
            }
        });

        $(".getVerificationCode").on("click",function (e) {
            let codeTimes = 10;
            let id;
            setInterval(id);
            console.log(">>>");
            if(phone){
                let self = this;
                id = setInterval(function (e) {
                    switchPhoneCodeToWhite(self);
                    $(self).text("重新获取"+ codeTimes +"");
                        codeTimes--;
                        if(codeTimes <= 0){
                            clearInterval(id);
                            switchPhoneCodeToRed(self);
                            $(self).text("获取验证码");
                        }
                }, 1000)
            }else{
                alert("输入的手机号无效，请重输！");
            }
        });

        //手机验证码验证
        $(".fg-phone-code").on("input propertychange",function (e) {
            checkPhoneCode($(this).val());
            console.log(phoneCode);
        });

        $(".fg-password").on("input propertychange",function (e) {
            checkPassword($(this).val());
            if($(this).val()){
                switchLoadingToRed(".getPhonePassword");
            }else{
                switchPhoneCodeToWhite(".getPhonePassword");
            }
        });

        $('.getPhonePassword').on("click",function (e) {
            if(phone && phoneCode && password){
                alert("重置密码成功！");
                return true;
            }else{
                alert("重置密码失败，请核对信息！");
                return false;
            }
        })
    }

    /*入口函数*/
    function init() {
        backToPrev();//返回上一页
        tabChange();//密码界面选项卡
        checkLoading();//登录界面的验证
        changePasswordCheck();//修改密码界面的验证
        /*zhuCeCheck();//注册验证*/
    }

    init(); //执行函数
})();