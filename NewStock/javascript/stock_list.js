/**
 * Created by czy on 2017/4/27.
 */
var simple_info;//股票列表
var chosen_index;//点击的股票的位置，用于删除
var page_max;//最大页数
var page_num;//当前页码
var attr, key, key1, key2;//搜索属性，attr表示搜索的目标，key表示搜索的内容（精确搜索），key1和key2表示搜索的范围（范围搜索）
var sortby = 0;

//设置线程同步
$.ajaxSetup({
    async: false
});

$(function () {
    attr = getUrlParam('attr');
    key = getUrlParam('key');
    key1 = getUrlParam('key1');
    key2 = getUrlParam('key2');
    sortby = parseInt(getUrlParam('sortby'));
    page_num = getUrlParam('page');

    if(attr == null)
        window.location.href = 'stock_list.html?attr=all&key= &key1= &key2= &page=1&sortby=0';
    //获取所有列表
    get_list(attr, key, key1, key2, page_num, sortby);
    //显示列表
    init(page_num);

    //设置搜索按钮监听
    $('#search').click(function () {
        //获取搜索目标
        attr = $('#attr').val();
        //精确搜索
        if(attr == 'stockid' || attr == 'name' || attr == 'apid') {
            key = $('#input_text').val();
            if(key == '')
                attr = 'all';
        }
        //范围搜索
        else {
            key1 = $('#input_text1').val();
            key2 = $('#input_text2').val();
            if(key1 == '' && key2 == '')
                attr = 'all';
        }
        //获得搜索结果并显示
        window.location.href = 'stock_list.html?attr=' + attr + '&key=' + key + '&key1=' + key1 + '&key2=' + key2 + '&page=1&sortby=0';
    });

    //设置搜索目标改变监听
    $('#attr').change(function () {
        //精确搜索只需要一个输入框
        if($(this).val() == 'stockid' || $(this).val() == 'name' || $(this).val() == 'apid') {
            $('#search_input').empty();
            $('#search_input').append('<div class="col-md-11"> ' +
                '<input type="text" placeholder="" class="form-control" id = "input_text">' +
                '</div> ');
        }
        //范围搜索需要两个输入框
        //搜索时间范围需要按照指定格式
        else if($(this).val() == 'date') {
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
        else {
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
        }
    });

    //设置删除确认按钮监听
    $('#delete_button').click(function () {
        delete_item(chosen_index);
        $('#pwd').val('');
    });

    //设置列属性点击监听，用于排序
    $('th.item').click(function () {
        if(sortby == $(this).index())
            sortby = -$(this).index();
        else
            sortby = $(this).index();
        window.location.href = 'stock_list.html?attr=' + attr + '&key=' + key + '&key1=' + key1 + '&key2=' + key2 + '&page=' + page_num + '&sortby=' + sortby;
    });
});

//页面初始化
function init(page){
    //计算最大页数
    page_max = simple_info[0];
    //若显示的页码大于最大页数，则显示最大页
    if(page <= page_max)
        page_num = page;
    else
        page_num = page_max;
    //显示搜索条件
    show_query(attr, key, key1, key2);
    //显示分页列表
    show_paging(page_num, page_max);
    //显示当前页的列表
    show_list(page_num);
}

//显示搜索条件
function show_query(attr, key, key1, key2) {
    if(attr == 'stockid' || attr == 'name' || attr == 'apid') {
        $('#attr').val(attr);
        $('#search_input').empty();
        $('#search_input').append('<div class="col-md-11"> ' +
            '<input type="text" placeholder="" class="form-control" id = "input_text">' +
            '</div> ');
        $('#input_text').val(key);
    }
    else if(attr == 'date' || attr == 'circulation' || attr == 'inipri'
        || attr == 'strpri' || attr == 'buypri' || attr == 'sellpri'
        || attr == 'curmaxpri' || attr == 'curminpri' || attr == 'openingpri'
        || attr == 'closingpri' || attr == 'totalstoke' || attr == 'curstoke') {
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
    else {
        $('#attr').val('stockid');
        $('#input_text').val('');
    }
}

//显示结果列表
function show_list(page_num) {
    var i;
    //动态生成结果列表
    var tbs = $('#result_list');
    tbs.empty();
    for (i = 1; i <= simple_info[1].length; i++) {
        tbs.append('<tr class="result_row">' +
            '<td class="simple_info">' + ((page_num - 1) * 10 + i) + '</td>' +
            '<td class="simple_info">' + simple_info[1][i - 1].stockid + '</td>' +
            '<td class="simple_info">' + simple_info[1][i - 1].name + '</td>' +
            '<td class="simple_info">' + simple_info[1][i - 1].circulation + '</td>' +
            '<td class="simple_info">' + simple_info[1][i - 1].apid + '</td>' +
            '<td class="simple_info">' + simple_info[1][i - 1].date + '</td>' +
            '<td class="simple_info">' + simple_info[1][i - 1].inipri + '</td>' +
            '<td><a href="#myModal" role="button" data-toggle="modal" class="delete"><i class="fa fa-trash-o"></i></a>' +
            '</td></tr>');
    }

    //设置列表项的点击事件
    $('tbody>tr>td.simple_info').click(function () {
        //通过url传递stockid信息
        window.location.href = "stock_detail.html?stockid=" + $(this).parent().find('td').eq(1).text();
    });

    //设置列表项的删除按钮监听
    $('a.delete').click(function () {
        chosen_index = $(this).index('a.delete');
    });

}

//显示分页列表
function show_paging(page_num, page_max) {
    var i;
    var pgs = $('#page');
    //动态生成分页列表
    //分页列表最多显示10页，大于10页则使用省略号
    pgs.empty();
    pgs.append('<li><a class="paging">&laquo;</a></li>');
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

    //设置分页列表按钮监听
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
            window.location.href = 'stock_list.html?attr=' + attr + '&key=' + key + '&key1=' + key1 + '&key2=' + key2 + '&page=' + page_num + '&sortby=' + sortby;
        }
    });
}

//根据条件获取列表
function get_list(attr, key, key1, key2, page, sortby) {
    $.get('php/stock/stocksearch.php', {attr:attr, key:key, key1:key1, key2:key2, page:page, sortby:sortby}, function (data) {
        simple_info = jQuery.parseJSON(data);
    });
}

//根据条件删除股票
function delete_item(index) {
    $.post('php/stock/stockdelete.php', {stockid:simple_info[1][index].stockid, apid:simple_info[1][index].apid, pwd:$('#pwd').val()}, function (data) {
        var result_json = jQuery.parseJSON(data);
        if(result_json.result == true) {
            if(simple_info[1].length == 1)
                page_num = page_max - 1;
            window.location.href = 'stock_list.html?attr=' + attr + '&key=' + key + '&key1=' + key1 + '&key2=' + key2 + '&page=' + page_num + '&sortby=' + sortby;
        }
        else
            alert(result_json.info);
    });
}

//从url中获取信息
function getUrlParam(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null)
        return decodeURI(r[2]);
    return null; //返回参数值
}