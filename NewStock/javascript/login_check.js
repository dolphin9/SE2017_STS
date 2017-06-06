/**
 * Created by czy on 2017/4/29.
 */
$.ajaxSetup({
    async: false
});

var check = 0;

$(function(){
    check_user();
})

//用户身份认证
function check_user() {
    $.post('php/cookie.php', {func: 'check', user: $.cookie('user_name')}, function (data) {
        if(data == 0){
            $('#user').text($.cookie('user_name'));
            check = 1;
        }
    });
    if(check != 1)
        window.location.href = 'login.html';
}