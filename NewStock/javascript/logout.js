/**
 * Created by czy on 2017/4/29.
 */
$(function () {
    $('#logout').click(function () {
        $.post('php/cookie.php', {func: 'logout', user: $.cookie('user_name')}, function (data) {
            $.cookie('user_name', null);
            window.location.href = 'login.html';
        })
    });
})