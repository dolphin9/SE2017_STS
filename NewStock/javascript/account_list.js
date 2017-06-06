var page_max;
var attr, key, key1, key2;
var info;
var chosenUser;
var page_num = 0;
var sortby = 0;
$.ajaxSetup({
    async:false
});
$(function(){
    attr = getUrlParam('attr');
    //关键词
    key  = getUrlParam('key');
    key1 = getUrlParam('key1');
    key2 = getUrlParam('key2');
    //排序依据
    sortby = parseInt(getUrlParam('sortby'));
    //当前页面
    page_num = getUrlParam('page');

    if(attr == null){
        //初始页面
        window.location.href= 'account_list.html?attr=all&key= &key1= &key2= &page=1&sortby=0';
    }

    //获取客户列表
    getClients(attr, key, key1, key2, page_num, sortby);
    init(page_num);
    $('#search').click(function () {
        attr = $('#attr').val();

        if (attr == 'regdate') {
            key1 = $('#input_text1').val();
            key2 = $('#input_text2').val();
            if(key1 == '' && key2 == '')
                attr = 'all';
        }else{
            key1 = '';
            key2 = '';
            key = $('#input_text').val();
            if(key == '')
                attr = 'all';
        }
        window.location.href='account_list.html?attr='+attr+'&key='+key+'&key1='+key1+'&key2='+key2+'&page=1'+'&sortby=0';
    });



    $('#attr').change(function () {
        if($(this).val() == 'regdate') {
            $('#search_input').empty();
            $('#search_input').append(
                '<div class="col-md-5"> ' +
                '<input type="text" placeholder="格式:xxxx-xx-xx" class="form-control" id = "input_text1"> ' +
                '</div> ' +
                '<div class="col-md-1"> ' +
                '<h4>-</h4> ' +
                '</div> ' +
                '<div class="col-md-5"> ' +
                '<input type="text" placeholder="格式:xxxx-xx-xx" class="form-control" id = "input_text2"> ' +
                '</div>');
        }
        else{
            $('#search_input').empty();
            $('#search_input').append('<div class="col-md-11"> ' +
                '<input type="text" placeholder="" class="form-control" id = "input_text">' +
                '</div> ');
        }
    });

    //设置删除确认按钮点击事件
    $("#delete_button").on('click',function(){
        delete_item(chosenUser);
        $('#pwd').val('');
    });

    //设置列属性点击监听
    $('th.item').click(function(){
        if(sortby == $(this).index())
            sortby = -$(this).index();
        else
            sortby = $(this).index();
        window.location.href = 'account_list.html?attr='+attr+'&key='+key +'&key1='+key1 + '&key2='+key2+'&page='+page_num+'&sortby='+sortby;
    });
})
function getClients(attr, key, key1, key2, page, sortby){
    $.get('php/account/accountsearch.php', {attr:attr, key:key, key1:key1, key2:key2, page:page, sortby:sortby}, function(data){
            info = jQuery.parseJSON(data);
        })
}
function delete_item(index){
    $.post('php/account/accountdelete.php', {usrname:info[1][index].usrname, pwd:$("#pwd").val()},function(data){
            var result_json = jQuery.parseJSON(data);
            if (result_json.result == true){
                if(info[1].length == 1)
                    page_num = page_max - 1;
                window.location.href = 'account_list.html?attr=' + attr + '&key=' + key + '&key1=' + key1 + '&key2=' + key2 + '&page=' + page_num + '&sortby=' + sortby;
            }else{
                alert(result_json.info);
            }
        })
}
//从url中获取信息
function getUrlParam(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象

    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null)
        return decodeURI(r[2]);
    return null; //返回参数值
}


function init(page){
    page_max = info[0];

    if(page <= page_max){
        page_num = page;
    }else{
        page_num = page_max;
    }
    //显示搜索条件
    show_query(attr, key, key1, key2);
    //显示分页列表
    show_paging(page_num, page_max);
    //显示当前页的列表
    show_list(page_num);

}

function show_query(attr,key,key1,key2){
    if(attr == 'regdate') {
        $('#attr').val(attr);
        $('#search_input').empty();
        $('#search_input').append(
            '<div class="col-md-5"> ' +
            '<input type="text" placeholder="" class="form-control" id = "input_text1"> ' +
            '</div> ' +
            '<div class="col-md-1"> ' +
            '<h4>-</h4> ' +
            '</div> ' +
            '<div class="col-md-5"> ' +
            '<input type="text" placeholder="" class="form-control" id = "input_text2"> ' +
            '</div>');
        $('#input_text1').val(key1);
        $('#input_text2').val(key2);

    }
    else if(attr == 'usrname' | attr == 'name' | attr == 'idnum') {
        $('#attr').val(attr);
        $('#search_input').empty();
        $('#search_input').append('<div class="col-md-11"> ' +
            '<input type="text" placeholder="" class="form-control" id = "input_text">' +
            '</div> ');
        $('#input_text').val(key);
    }
    else{
        $('#attr').val('usrname');
        $('#input_text').val('');
    }
}

function show_list(page_num){
    var i;
    var tbs = $("#t_body");
    tbs.empty();
    for (i = 1; i <= info[1].length; i++){
        tbs.append('<tr class = "result_row">' +
            '<td class = "simple_info">' + ((page_num - 1) * 10 + i) + '</td>' +
            '<td class = "simple_info">' + info[1][i-1].usrname + '</td>' +
            '<td class = "simple_info">' + info[1][i-1].name + '</td>' +
            '<td class = "simple_info">' + info[1][i-1].phone + '</td>' +
            '<td class = "simple_info">' + info[1][i-1].regdate + '</td>' +
            '<td>'+
            '<a href="#myModal" role="button" data-toggle="modal" class = "delete">'+
            '<i class="fa fa-trash-o"></i></a>'+
            '</td>')
    }

    $('tbody>tr>td.simple_info').click(function(){
        window.location.href = "account_detail.html?usrname=" + $(this).parent().find('td').eq(1).text();
    })
    //设置删除按钮点击事件
    $('a.delete').click(function(){
        chosenUser = $(this).index('a.delete');
    })

}

function show_paging(page_num,page_max){
    var i;
    var pgs = $("#pages");
    pgs.empty();
    pgs.append('<li><a href="#">&laquo;</a></li>');
    if(page_max <= 10) {
        for (i = 1; i <= page_max; i++) {
            if(i == page_num){
                pgs.append('<li class="active"><a class="paging">' + i + '</a></li>');
                continue;
            }
            pgs.append('<li><a class="paging">' + i + '</a></li>');
        }
    }
    else {
        if(page_num <= 5) {
            for (i = 1; i <= 8; i++) {
                if(i == page_num){
                    pgs.append('<li class="active"><a class="paging">' + i + '</a></li>');
                    continue;
                }
                pgs.append('<li><a class="paging">' + i + '</a></li>');
            }
            pgs.append('<li><a class="paging">...</a></li>');
            pgs.append('<li><a class="paging">' + page_max + '</a></li>');
        }
        else if(page_num < page_max - 5) {
            pgs.append('<li><a class="paging">1</a></li>');
            pgs.append('<li><a class="paging">...</a></li>');
            for (i = -2; i <= 3; i++) {
                if(i == 0){
                    pgs.append('<li class="active"><a class="paging">' + (parseInt(page_num) + i) + '</a></li>');
                    continue;
                }
                pgs.append('<li><a class="paging">' + (parseInt(page_num) + i) + '</a></li>');
            }
            pgs.append('<li><a class="paging">...</a></li>');
            pgs.append('<li><a class="paging">' + page_max + '</a></li>');
        }
        else {
            pgs.append('<li><a class="paging">1</a></li>');
            pgs.append('<li><a class="paging">...</a></li>');
            for (i = 3; i <= 10; i++) {
                if(parseInt(page_max) - (10 - i) == page_num){
                    pgs.append('<li class="active"><a class="paging">' + (parseInt(page_max) - (10 - i)) + '</a></li>');
                    continue;
                }
                pgs.append('<li><a class="paging">' + (parseInt(page_max) - (10 - i)) + '</a></li>');
            }
        }
    }
    pgs.append('<li><a class="paging">&raquo;</a></li>');
    //设置页面按钮点击事件
    pgs.find('li').click(function () {
        var page_temp = page_num;
        if($(this).text() == '«') {
            if (page_temp > 1) {
                page_temp--;
            }
        }
        else if($(this).text() == '»') {
            if (page_temp < page_max)
                page_temp++;
        }
        else if($(this).text() != '...') {
            page_temp = $(this).text();
        }
        if(page_temp != page_num) {
            page_num = page_temp;
            window.location.href = 'account_list.html?attr=' + attr + '&key=' + key + '&key1=' + key1 + '&key2=' + key2 + '&page=' + page_num + '&sortby=' + sortby;
        }
    });
}