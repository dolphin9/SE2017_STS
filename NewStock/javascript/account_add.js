/**
 * Created by czy on 2017/5/3.
 */
$.ajaxSetup({
    async:false
});

var error = [1, 1, 1, 1, 1, 1];//记录输入内容是否符合要求
var pwd_regular = [/^[0-9]*$/, /^[a-z]*$/i, /^[A-Z]*$/i, /^[\x21-~]*$/];

$(function(){
    $("#submit").click(function(){
        usrname_check();
        email_check();
        phone_check();
        id_check();
        pwd_check();
        pwdconfirm_check();
        if(!error[0] & !error[1] & !error[2] & !error[3] & !error[4] & !error[5]) {
            var usrname  = $("#usrname").val();
            var pwd = $("#pwd").val();
            var name = $("#name").val();
            var email = $("#email").val();
            var phone = $("#phone").val();
            var idnum = $("#idnum").val();
            var career = $("#career").val();
            var fmaddr = $("#fmaddr").val();
            var edu = $("#edu").val();
            var workaddr = $("#workaddr").val();
            var subidnum = $("#subidnum").val();
            var type = $("#type").val();
            $.post('php/account/accountinsert.php', {
                    usrname: usrname,
                    pwd: pwd,
                    name: name,
                    email: email,
                    phone: phone,
                    idnum: idnum,
                    career: career,
                    fmaddr: fmaddr,
                    edu: edu,
                    subidnum: subidnum,
                    workaddr: workaddr,
                    type: type
                }, function (data) {
                    var result_json = jQuery.parseJSON(data);
                    if (result_json.result == false) {
                        alert(result_json.info);
                    }
                    else {
                        alert('注册成功');
                    }
                });
        }
        else {
            alert('信息格式有误');
        }
    })

    $("#usrname").blur(usrname_check);
    $("#email").blur(email_check);
    $("#phone").blur(phone_check);
    $("#idnum").blur(id_check);
    $("#pwd").blur(pwd_check);
    $("#inputpwdConfirm").blur(pwdconfirm_check);
});

function usrname_check(){
    var usrname = $('#usrname');
    usrname.next().remove();
    error[0] = 0;
    $.post('php/account/accountcheck.php', {attr:'usrname', key:usrname.val()}, function(data){
        var result_json = jQuery.parseJSON(data);
        if(result_json.result == false){
            usrname.after('<p class="error">' + result_json.info + '</p>');
            error[0] = 1;
        }
    });
}

function email_check(){
    var email = $('#email');
    email.next().remove();
    error[1] = 0;
    $.post('php/account/accountcheck.php', {attr:'email', key:email.val()}, function(data){
        var result_json = jQuery.parseJSON(data);
        if (result_json.result == false){
            email.after('<p class="error">' + result_json.info + '</p>');
            error[1] = 1;
        }
    });
}

function phone_check(){
    var phone = $('#phone');
    phone.next().remove();
    error[2] = 0;
    $.post('php/account/accountcheck.php', {attr: 'phone', key: phone.val()}, function (data) {
        var result_json = jQuery.parseJSON(data);
        if (result_json.result == false) {
            phone.after('<p class="error">' + result_json.info + '</p>');
            error[2] = 1;
        }
    });
}

function id_check(){
    var id = $('#idnum');
    id.next().remove();
    error[3] = 0;
    $.post('php/account/accountcheck.php', {attr:'idnum', key:id.val()}, function(data){
        var result_json = jQuery.parseJSON(data);
        if (result_json.result == false) {
            id.after('<p class="error">' + result_json.info + '</p>');
            error[3] = 1;
        }
    });
}

function pwd_check(){
    var pwd = $('#pwd');
    pwd.next().remove();
    error[4] = 0;
    if(pwd.val().length > 16 || pwd.val().length < 6){
        error[4] = 1;
        pwd.after('<p class="error">密码长度必须在6位-16位之间（包括6位和16位）</p>');
    }
    else if(pwd_regular[0].test(pwd.val()) || pwd_regular[1].test(pwd.val()) || pwd_regular[2].test(pwd.val())){
        error[4] = 1;
        pwd.after('<p class="error">密码必须为数字和字母的组合</p>');
    }
    else if(!pwd_regular[3].test(pwd.val())){
        error[4] = 1;
        pwd.after('<p class="error">密码存在非法字符</p>');
    }
}

function pwdconfirm_check(){
    var pwdconfirm = $('#inputpwdConfirm');
    $(this).next().remove();
    error[5] = 0;
    if ($("#pwd").val() != pwdconfirm.val()){
        pwdconfirm.after('<p class="error">两次输入密码不一致</p>');
        error[5] = 1;
    }
}