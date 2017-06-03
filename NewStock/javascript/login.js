/**
 * Created by czy on 2017/4/29.
 */
$(function () {
    $.post('php/cookie.php', {func: 'check', user: $.cookie('user_name')}, function (data) {
        if(data == 0){
            window.location.href = 'stock_list.html';
        }
    });
    $('#login').click(function () {
        $.post('php/cookie.php', {func: 'login', user: $('#user').val(), passwd: $('#password').val()}, function (data) {
            $('#user').next().remove();
            $('#password').next().remove();
            if(data == 0) {
                window.location.href = 'stock_list.html';
                $.cookie('user_name', $('#user').val());
            }
            else if (data == 1){
                $('#user').after('<p class="error">用户不存在</p>');
            }
            else if (data == 2){
                $('#password').after('<p class="error">密码错误</p>');
            }
        })
    });
})