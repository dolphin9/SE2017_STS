/**
 * Created by czy on 2017/4/27.
 */
var simple_info;//股票列表
var page_max;//最大页数
var page_num;//当前页码
var page_index = 1;//当前页码所在分页栏的位置
var attr, key, key1, key2;//搜索属性，attr表示搜索的目标，key表示搜索的内容（精确搜索），key1和key2表示搜索的范围（范围搜索）
var flag = [1, 1, 1, 1];//记录排序的规则
var usrname;

//设置线程同步
$.ajaxSetup({
    async: false
});

$(function () {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        if($(e.target).text() == '持有股票') {
            show();
        }
    })
});

function show() {
    usrname = getUrlParam('usrname');
    //获取所有列表
    get_list(usrname, 'all', '', '', '');
    //显示列表
    init(1);

    //设置搜索按钮监听
    $('#search').click(function () {
        //获取搜索目标
        attr = $('#attr').val();
        //精确搜索
        if(attr == 'stockname') {
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
        get_list(usrname, attr, key, key1, key2);
        init(1);
    });

    //设置搜索目标改变监听
    $('#attr').change(function () {
        //精确搜索只需要一个输入框
        if($(this).val() == 'stockname') {
            $('#search_input').empty();
            $('#search_input').append('<div class="col-md-11"> ' +
                '<input type="text" placeholder="" class="form-control" id = "input_text">' +
                '</div> ');
        }
        //范围搜索需要两个输入框
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

    //设置列属性点击监听，用于排序
    $('th.item').click(function () {
        sort($(this).attr('id'));
        init(page_num);
    });
}

//页面初始化
function init(page){
    var i;
    var pgs = $('#page');
    //计算最大页数
    page_max = Math.ceil(simple_info.length / 10);
    //若显示的页码大于最大页数，则显示最大页
    if(page <= page_max)
        page_num = page;
    else
        page_num = page_max;

    //动态生成分页列表
    pgs.empty();
    pgs.append('<li><a class="paging">&laquo;</a></li>');
    for (i = 1; i <= page_max; i++) {
        pgs.append('<li><a class="paging">' + i + '</a></li>');
        if(i == 10)
            break;
    }
    pgs.append('<li><a class="paging">&raquo;</a></li>');

    //显示当前页的列表
    show_list();

    //设置分页列表按钮监听
    pgs.find('li').click(function () {
        if($(this).text() == '«') {
            if (page_num > 1)
                page_num--;
        }
        else if($(this).text() == '»') {
            if (page_num < page_max)
                page_num++;
        }
        else if($(this).text() != '...') {
            page_num = $(this).text();
        }
        show_list();
    });
}

//显示结果列表
function show_list() {
    var i;
    //动态生成结果列表
    var tbs = $('#result_list');
    tbs.empty();
    for (i = (page_num - 1) * 10 + 1; i <= simple_info.length && i <= page_num * 10; i++) {
        tbs.append('<tr class="result_row">' +
            '<td class="simple_info">' + i + '</td>' +
            '<td class="simple_info">' + simple_info[i - 1].name + '</td>' +
            '<td class="simple_info">' + simple_info[i - 1].holdnum + '</td>' +
            '<td class="simple_info">' + simple_info[i - 1].price + '</td>' +
            '<td class="simple_info">' + simple_info[i - 1].forsale + '</td>' +
            '</tr>');
    }

    //切换页码时，分页列表会产生相应的变化
    var pgs = $('#page');
    if(page_max > 10) {
        if(page_num <= 5) {
            for (i = 1; i <= 8; i++) {
                pgs.find('li').eq(i).find('a').text(i);
            }
            pgs.find('li').eq(9).find('a').text('...');
            pgs.find('li').eq(10).find('a').text(page_max);
        }
        else if(page_num < page_max - 5) {
            pgs.find('li').eq(1).find('a').text(1);
            pgs.find('li').eq(2).find('a').text('...');
            for (i = -2; i <= 3; i++) {
                pgs.find('li').eq(i + 5).find('a').text(parseInt(page_num) + i);
            }
            pgs.find('li').eq(9).find('a').text('...');
            pgs.find('li').eq(10).find('a').text(page_max);
        }
        else {
            pgs.find('li').eq(1).find('a').text(1);
            pgs.find('li').eq(2).find('a').text('...');
            for (i = 3; i <= 10; i++) {
                pgs.find('li').eq(i).find('a').text(parseInt(page_max) - (10 - i));
            }
        }
    }
    if(page_num <= 5)
        page_index = page_num;
    else if(page_num < page_max - 5)
        page_index = 5;
    else
        page_index =  10 - (page_max - page_num);
    pgs.find('li').eq(page_index).addClass('active').siblings().removeClass().end();
}

//根据条件获取列表
function get_list(usrname, attr, key, key1, key2) {
    $.get('php/stock/stockhold.php', {usrname:usrname, attr:attr, key:key, key1:key1, key2:key2}, function (data) {
        simple_info = jQuery.parseJSON(data);
    });
}

//列表排序
function sort(attr) {
    //升序降序切换
    if(attr == 'stockname') {
        flag[1] = flag[2] = flag[3] = 0;
        flag[0] = !flag[0];
    }
    else if(attr == 'holdnum') {
        flag[0] = flag[2] = flag[3] = 0;
        flag[1] = !flag[1];
    }
    else if(attr == 'price') {
        flag[0] = flag[1] = flag[3] = 0;
        flag[2] = !flag[2];
    }
    else if(attr == 'forsale') {
        flag[0] = flag[1] = flag[2] = 0;
        flag[3] = !flag[3];
    }
    //自定义排序方法
    simple_info.sort(function (x, y) {
        if(attr == 'stockname') {
            if(flag[0] == 0)
                return x.name.localeCompare(y.name);
            else
                return y.name.localeCompare(x.name);

        }
        else if(attr == 'holdnum') {
            if(x.holdnum - y.holdnum == 0)
                return x.name.localeCompare(y.name);
            if(flag[1] == 0)
                return x.holdnum - y.holdnum;
            else
                return y.holdnum - x.holdnum;

        }
        else if(attr == 'price') {
            if(x.price - y.price == 0)
                return x.name.localeCompare(y.name);
            if(flag[2] == 0)
                return x.price - y.price;
            else
                return y.price - x.price;

        }
        else if(attr == 'forsale') {
            if(x.forsale - y.forsale == 0)
                return x.name.localeCompare(y.name);
            if(flag[3] == 0)
                return x.forsale - y.forsale;
            else
                return y.forsale - x.forsale;
        }
    })
}

function getUrlParam(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null)
        return decodeURI(r[2]);
    return null; //返回参数值
}