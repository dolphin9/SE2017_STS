$.ajaxSetup({
    async:false
});

var info;
var state;
var error = [0, 0, 0, 0];//记录输入内容是否符合要求
var pwd_regular = [/^[0-9]*$/, /^[a-z]*$/i, /^[A-Z]*$/i, /^[\x21-~]*$/];
var action = 0;

$(function(){
    get_info();
    $("#edit").click(edit);
    $("#submit").click(function () {
        action = 1;
    });
    $("#delete").click(function () {
        action = 2;
    });
    $("#activate").click(function () {
        action = 3;
    });
    $("#frozen").click(function () {
        action = 4;
    });

    $("#email").blur(email_check);
    $("#phone").blur(phone_check);
    $("#pwd").blur(pwd_check);
    $("#inputpwdConfirm").blur(pwdconfirm_check);
    
    $('#button_confirm').click(function () {
        if(action == 1){
            submit_edit();
        }else if(action == 2){
            delete_info();
        }else if(action == 3){
            activate_user();
        }else if(action == 4){
            frozen_user();
        }
        $('#pwd_confirm').val('');
    });
});

function email_check(){
    var email = $('#email');
    email.next().remove();
    error[0] = 0;
    $.post('php/account/accountcheck.php', {attr:'EMAIL', key:email.val()}, function(data){
        var result_json = jQuery.parseJSON(data);
        if (result_json.result == false){
            email.after('<p class="error">' + result_json.info + '</p>');
            error[0] = 1;
        }
    });
}

function phone_check(){
    var phone = $('#phone');
    phone.next().remove();
    error[1] = 0;
    $.post('php/account/accountcheck.php', {attr: 'PHONE', key: phone.val()}, function (data) {
        var result_json = jQuery.parseJSON(data);
        if (result_json.result == false) {
            phone.after('<p class="error">' + result_json.info + '</p>');
            error[1] = 1;
        }
    });
}

function pwd_check(){
    var pwd = $('#pwd');
    pwd.next().remove();
    error[2] = 0;
    if(pwd.val().length != 0) {
        if (pwd.val().length > 16 || pwd.val().length < 6) {
            error[2] = 1;
            pwd.after('<p class="error">密码长度必须在6位-16位之间（包括6位和16位）</p>');
        }
        else if (pwd_regular[0].test(pwd.val()) || pwd_regular[1].test(pwd.val()) || pwd_regular[2].test(pwd.val())) {
            error[2] = 1;
            pwd.after('<p class="error">密码必须存在数字和字母的组合</p>');
        }
        else if (!pwd_regular[3].test(pwd.val())) {
            error[2] = 1;
            pwd.after('<p class="error">密码存在非法字符</p>');
        }
    }
}

function pwdconfirm_check(){
    var pwdconfirm = $('#inputpwdConfirm');
    $(this).next().remove();
    error[3] = 0;
    if ($("#pwd").val() != pwdconfirm.val()){
        pwdconfirm.after('<p class="error">两次输入密码不一致</p>');
        error[3] = 1;
    }
}

function edit(){
    var ins = $('input.form-control');
    ins.eq(1).removeAttr("disabled");
    ins.eq(2).removeAttr("disabled");

    ins.eq(5).removeAttr("disabled");
    ins.eq(6).removeAttr("disabled");
    ins.eq(7).removeAttr("disabled");
    ins.eq(8).removeAttr("disabled");
    ins.eq(9).removeAttr("disabled");
    ins.eq(10).removeAttr("disabled");
    var add = $('textarea.form-control');
    add.eq(0).removeAttr("disabled");
    $("#edit").attr("disabled","disabled");
    $("#submit").removeAttr("disabled");
}

function submit_edit(){
    if(!error[0] & !error[1] & !error[2] & !error[3] & !error[4] & !error[5]) {
        post_info();
        var ins = $('input.form-control');
        ins.eq(1).attr("disabled", "disabled");
        ins.eq(2).attr("disabled", "disabled");

        ins.eq(5).attr("disabled", "disabled");
        ins.eq(6).attr("disabled", "disabled");
        ins.eq(7).attr("disabled", "disabled");
        ins.eq(8).attr("disabled", "disabled");
        ins.eq(9).attr("disabled", "disabled");
        ins.eq(10).attr("disabled", "disabled");

        var add = $('textarea.form-control');
        add.eq(0).attr("disabled", "disabled");
        $("#edit").removeAttr("disabled");
        $("#submit").attr("disabled", "disabled");
        $('#pwd').val('');
        $('#check_pwd').val('');
    }
    else {
        alert('格式有误');
    }
}

function activate_user(){
    $.post('php/account/accountactivate.php', {usrname: $("#usrname").val(), pwd:$('#pwd_confirm').val()}, function (data) {
        var result_json = jQuery.parseJSON(data);
        if (result_json.result == true) {
            state = "activated"
            $("#activate").attr("disabled", "disabled");
            $("#activate").attr("class", "btn btn-primary");
            $("#frozen").attr("class", "btn btn-danger");
            $("#frozen").removeAttr("disabled");
            alert('激活成功');
        } else {
            alert(result_json.info);
        }
    })
}

function frozen_user(){
    state = "frozen";
    $.post('php/account/accountfreeze.php', {usrname: $("#usrname").val(), state: state, pwd:$('#pwd_confirm').val()}, function (data) {
        var result_json = jQuery.parseJSON(data);
        if (result_json.result == true) {
            $("#frozen").attr("class", "btn btn-primary");
            $("#frozen").attr("disabled", "disabled");
            $("#activate").attr("class", "btn btn-danger");
            $("#activate").removeAttr("disabled");
            alert('冻结成功');
        } else {
            alert(result_json.info);
        }
    })
}

function delete_info(){
    var usrname = $("#usrname").val();
    $.post('php/account/accountdelete.php', {usrname: usrname, pwd:$('#pwd_confirm').val()}, function (data) {
        var result_json = jQuery.parseJSON(data);
        if (result_json.result == true) {
            alert('删除成功');
            window.location.href = "account_list.html";
        } else {
            alert(result_json.info);
        }
    })
}

function get_info(){
    var usrname = getUrlParam('usrname');
    $.get('php/account/accountsearch.php',{attr:'usrname', key:usrname, key1:'', key2:'', page:1 , sortby:0},function(data){
        info = jQuery.parseJSON(data);
    });
    $('#usrname').val(info[1][0].usrname);
    $('#name').val(info[1][0].name);
    $('#phone').val(info[1][0].phone);

    $('#email').val(info[1][0].email);
    $('#idnum').val(info[1][0].idnum);
    $('#career').val(info[1][0].career);
    $('#fmaddr').val(info[1][0].fmaddr);
    $('#workaddr').val(info[1][0].workaddr);
    $('#edu').val(info[1][0].edu);
    $('#regdate').val(info[1][0].regdate);
    state = info.state;
    if (state == "frozen"){
        $("#frozen").attr("disabled","disabled");
        $("#frozen").attr("class","btn btn-primary");
        $("#state").append('<h1>冻结中</h1>');
    }else{
        $("#activate").attr("disabled","disabled");
        $("#activate").attr("class","btn btn-primary");
        $('#state').append('<h1>已激活</h1>');
    }
}

function post_info() {
    var usrname = $("#usrname").val();
    var pwd = $("#pwd").val()
    var name = $("#name").val()
    var idnum = $("#idnum").val();
    var fmaddr = $("#fmaddr").val();
    var career = $("#career").val();
    var workaddr = $("#workaddr").val();
    var subidnum = $("#subidnum").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var edu = $("#edu").val();
    var type = $("#type").val();
    $.post('php/account/accountupdate.php', {
        usrname: usrname, newpwd: pwd, name: name, idnum: idnum,
        fmaddr: fmaddr, career: career, workaddr: workaddr, subidnum: subidnum,
        email: email, phone: phone, type: type, pwd:$('#pwd_confirm').val()
    }, function (data) {
        var result_json = jQuery.parseJSON(data);
        if (result_json.result == false) {
            alert(result_json.info);
            get_info();
        }
        else{
            alert('修改成功');
        }
    });
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null)
        return unescape(r[2]);
    return null; //返回参数值
}