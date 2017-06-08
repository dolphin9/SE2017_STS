/**
 * Created by czy on 2017/5/2.
 */

//设置线程同步
$.ajaxSetup({
    async: false
});

var error = [1, 1, 1];

$(function () {
    $('#add').click(function () {
        if(!error[0] && !error[1] && !error[2]) {
            $.post('php/stock/announcement.php', {stockid:$('#stockid').val(), title: $('#title').val(), text: $('#text').val(), type: $('#type').val()}, function (data) {
                var result_json = jQuery.parseJSON(data);
                if (result_json.result == false) {
                    alert(result_json.info);
                }
                else {
                    alert('发布成功');
                    $('input.form-control').val('');
                }
            });
        }
        else
            alert("内容格式有误");
    });

    $('#stockid').blur(function () {
        $(this).next().remove();
        error[0] = 0;
        $.post('php/stock/stockcheck.php', {attr:'STOCKID', key: $('#stockid').val()}, function (data) {
            var result_json = jQuery.parseJSON(data);
            if (result_json.result == false) {
                $('#stockid').after('<p class="error">' + result_json.info + '</p>');
                error[0] = 1;
            }
        });
    });

    $('#title').blur(function () {
        $(this).next().remove();
        error[1] = 0;
        if($(this).val().length == 0){
            $(this).after('<p class="error">标题不能为空</p>');
            error[1] = 1;
        }
    });

    $('#text').blur(function () {
        $(this).next().remove();
        error[2] = 0;
        if($(this).val().length == 0){
            $(this).after('<p class="error">内容不能为空</p>');
            error[2] = 1;
        }
    });
})