//autoload.js
;! function(e) {
    var autoload = e.autoload || {};
    e.autoload = autoload;
    e.autoload = new function() {
        this.options = {
            id: 'autoload',
        }
        var o = this.options;
        this.include = function(_opt) {
            o = _opt;
            var id = document.getElementById('autoload');
            if(typeof id!=='undefined'){
                var cssid = id.getAttribute('css');
                var jsid = id.getAttribute('js');
            }
            cssid = autoload.split(cssid);
            jsid = autoload.split(jsid);
            var c = 0;    //记录js的起始位置
            for(var i = 0; i < o.path.length; i++) {
                var file = o.path[i];

                if (file.match(/.*.js$/)){
                    var ind = i+1-c;    //记录js的起始位置
                    if(jsid.toString().indexOf(ind)>-1){ //判断id中的js链接是否存在
                        document.write('<script type="text/javascript" src="' + file + '"></script>');
                    }
                }else if (file.match(/.*.css$/)){
                    c++;
                    if(cssid.toString().indexOf(i+1)>-1){
                        var Link = document.createElement('link');
                        Link.href = o.path[i];
                        Link.rel = 'stylesheet';
                        Link.media ='screen,projection'
                        document.getElementsByTagName('head')[0].appendChild(Link);
                    }
                }
            }
        }
    }
    autoload.split = function(str){
        var strs= new Array(); //定义一数组
        strs=str.split(","); //字符分割
        return strs;
    }
}(window)

//调用
autoload.include({
    id: 'autoload'    //引入的该js的id
    //引入的路径
    ,path: [
        'css/materialize.css'
        ,'css/materialize.min.css'
        ,'js/jquery-3.2.1.js'
        ,'js/init.js'
        ,'js/materialize.js'
        ,'js/materialize.min.js'
        ,'js/vue.js'
    ]
});
