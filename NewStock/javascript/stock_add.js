/**
 * Created by czy on 2017/4/27.
 */
//设置线程同步
$.ajaxSetup({
    async: false
});

var error = [1, 1, 1, 1, 1];//记录输入内容是否符合要求
var int = /^[0-9]*[1-9][0-9]*$/;//正则表达式，用于判断是否为正整数
var float = /^\d+(\.\d+)?$/;//正则表达式，用于判断是否为正实数

$(function () {
    $('#add').click(function () {
        $(this).removeAttr('href', '#myModal');
        if(!error[0] & !error[1] & !error[2] & !error[3] & !error[4]){
            $(this).attr('href', '#myModal');
        }
        else{
            alert('格式不符合要求');
        }
    });
    $('#ensure_button').click(function () {
        //获取输入框内容
        var stockid = $('#stockid').val();
        var name = $('#name').val();
        var circulation = $('#circulation').val();
        var apid = $('#apid').val();
        var inipri = $('#inipri').val();
        var pwd = $('#pwd').val();

        //判断是否内容都符合要求
        if(!error[0] & !error[1] & !error[2] & !error[3] & !error[4]) {
            //发送信息给服务端
            $.post('php/stock/stockinsert.php', {
                stockid: stockid,
                name:name,
                circulation: circulation,
                apid: apid,
                inipri: inipri,
                pwd: pwd
            }, function (data) {
                var result_json = jQuery.parseJSON(data);
                if(result_json.result == false){
                    alert(result_json.info);
                }
                else{
                    alert('添加成功');
                    $('input.form-control').val('');
                }
            });
        }
        $('#pwd').val('');
    });

    //设置输入框失焦监听，判断输入内容是否符合规范，以下同理
    $('#stockid').blur(stockid_check);
    $('#name').blur(name_check);
    $('#circulation').blur(circulation_check);
    $('#apid').blur(apid_check);
    $('#inipri').blur(inipri_check);
});

function stockid_check() {
    var stockid = $('#stockid');
    stockid.next().remove();
    error[0] = 0;
    if(stockid.val().length != 6){
        stockid.after('<p class="error">必须为6位数字或字母的组合</p>');
        error[0] = 1;
    }
    else {
        $.post('php/stock/stockcheck.php', {attr: 'stockid', key: $('#stockid').val()}, function (data) {
            var result_json = jQuery.parseJSON(data);
            if(result_json.result == false){
                stockid.after('<p class="error">' + result_json.info + '</p>');
                error[0] = 1;
            }
        });
    }
}
function name_check() {
    var name = $('#name');
    name.next().remove();
    error[1] = 0;
    if(name.val().length == 0){
        name.after('<p class="error">股票名称不能为空</p>');
        error[1] = 1;
    }
    else if(getlength(name.val()) > 45) {
        name.after('<p class="error">股票名称过长</p>');
        error[1] = 1;
    }
    else {
        $.post('php/stock/stockcheck.php', {attr: 'name', key: $('#name').val()}, function (data) {
            var result_json = jQuery.parseJSON(data);
            if(result_json.result == false){
                name.after('<p class="error">' + result_json.info + '</p>');
                error[1] = 1;
            }
        });
    }
}

function circulation_check() {
    var circulation = $('#circulation');
    circulation.next().remove();
    error[2] = 0;
    if(!int.test(circulation.val())){
        circulation.after('<p class="error">必须为正整数</p>');
        error[2] = 1;
    }
}

function apid_check() {
    var apid = $('#apid');
    apid.next().remove();
    error[3] = 0;
    if(apid.val().length > 20){
        apid.after('<p class="error">必须为不超过20位数字或字母的组合</p>');
        error[3] = 1;
    }
    else {
        $.post('php/stock/stockcheck.php', {attr: 'apid', key: $('#apid').val()}, function (data) {
            var result_json = jQuery.parseJSON(data);
            if(result_json.result == false){
                apid.after('<p class="error">' + result_json.info + '</p>');
                error[3] = 1;
            }
        });
    }
}

function inipri_check() {
    var inipri = $('#inipri');
    inipri.next().remove();
    error[4] = 0;
    if(!float.test(inipri.val())){
        inipri.after('<p class="error">必须为正实数</p>');
        error[4] = 1;
    }
}

//获得字符串实际长度，中文3，英文1
function getlength(str) {
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128)
            realLength += 1;
        else
            realLength += 3;
    }
    return realLength;
};
