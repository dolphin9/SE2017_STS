/**
 * Created by czy on 2017/4/27.
 */
//设置线程同步
$.ajaxSetup({
    async: false
});

var info;//具体信息
var error = [0, 0, 0];//记录修改后的信息是否符合要求
var int = /^[0-9]*[1-9][0-9]*$/;//正则表达式，用于判断是否为正整数
var stockid;

$(function () {
    //获取具体信息
    get_info();

    $('#save').click(function () {
        $(this).removeAttr('href', '#myModal');
        if(!error[0] & !error[1] & !error[2]){
            $(this).attr('href', '#myModal');
        }
        else{
            alert('格式不符合要求');
        }
    });
    //设置保存，修改按钮监听
    $('#save_button').click(save);
    $('#edit').click(edit);

    //设置输入框失焦监听，判断输入是否符合格式
    $('#name').blur(name_check);
    $('#circulation').blur(circulation_check);
    $('#apid').blur(apid_check);
});

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
        $.post('php/stock/stockcheck.php', {attr: 'NAME', key: $('#name').val()}, function (data) {
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

//根据url传递的信息获取其他具体信息
function get_info() {
    //从url中获取stockid
    stockid = getUrlParam('stockid');
    //获取具体信息
    $.get('php/stock/stocksearch.php', {attr:'stockid', key:stockid, key1:'', key2:'', page:1, sortby:0}, function (data) {
        info = jQuery.parseJSON(data);
    });
    //显示具体信息
    $('#stockid').val(info[1][0].stockid);
    $('#name').val(info[1][0].name);
    $('#circulation').val(info[1][0].circulation);
    $('#apid').val(info[1][0].apid);
    $('#date').val(info[1][0].date);
    $('#inipri').val(info[1][0].inipri);
    $('#strpri').val(info[1][0].strpri);
    $('#buypri').val(info[1][0].buypri);
    $('#sellpri').val(info[1][0].sellpri);
    $('#curmaxpri').val(info[1][0].curmaxpri);
    $('#curminpri').val(info[1][0].curminpri);
    $('#openingpri').val(info[1][0].openingpri);
    $('#closingpri').val(info[1][0].closingpri);
    $('#totalstoke').val(info[1][0].totalstoke);
    $('#curstoke').val(info[1][0].curstoke);
    $('#inscnt').val(info[1][0].inscnt);
}

//将修改好的数据传送给服务器
function post_info() {
    $.post('php/stock/stockupdate.php', {stockid:$('#stockid').val(), name:$('#name').val(), circulation:$('#circulation').val(), apid:$('#apid').val(), pwd:$('#pwd').val()}, function (data) {
        var result_json = jQuery.parseJSON(data);
        if (result_json.result == false) {
            alert(result_json.info);
            $('#name').val(info[1][0].name);
            $('#circulation').val(info[1][0].circulation);
            $('#apid').val(info[1][0].apid);
        }
        else {
            info[1][0].name = $('#name').val();
            info[1][0].circulation = $('#circulation').val();
            info[1][0].apid = $('#apid').val();
            alert('修改成功');
        }
    });
}

//保存按钮监听
function save() {
    //如果信息格式均正确，则发送信息，并切换为不可编辑状态
    if(!error[0] & !error[1] & !error[2]) {
        var ins = $('input.form-control');
        ins.eq(1).attr("disabled","disabled");
        ins.eq(2).attr("disabled","disabled");
        ins.eq(3).attr("disabled","disabled");
        post_info();
        $('#edit').removeAttr("disabled");
        $('#save').attr("disabled","disabled");
    }
    $('#pwd').val('');
}

//修改按钮监听
function edit() {
    var ins = $('input.form-control');
    ins.eq(1).removeAttr("disabled");
    ins.eq(2).removeAttr("disabled");
    ins.eq(3).removeAttr("disabled");
    $('#edit').attr("disabled","disabled");
    $('#save').removeAttr("disabled");
}

//从url中获取信息
function getUrlParam(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null)
        return decodeURI(r[2]);
    return null; //返回参数值
}