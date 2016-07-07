/**
 * Created by Lenovo on 2015/12/8.
 */
require.config({

    baseUrl: 'js/libs',
    urlArgs: "arg=" +  (new Date()).getTime(),
    paths: {
        'zepto'  : 'zepto.min',
        'underscore': 'underscore-min',
        'router' : 'director.min',
        'fastclick': 'fastclick.min',
        'iscroll': 'iscroll',
        'iscrollConfig': 'iscrollConfig',
        'showBox' : 'showBox',
        'showBoxConfig' : 'showBoxConfig',
        'dbind' : 'dbind',
        'text'   : 'text',
         'one'   :  '/js/module_1/1',
         'two'   :  '/js/module_2/2',
         'three' :  '/js/module_3/3',
         'four'  : '/js/module_4/4'

    },
    shim :{
        'zepto' : {
            dep:[],
            exports: 'Zepto'
        },
        'router': {
            deps: [],
            exports : "Router"
        },
        'showBox' : {
            deps: ['zepto'],
            exports: "ShowBox"
        }

     }

});

require( ['zepto', 'underscore', 'iscrollConfig', 'fastclick', 'router', 'showBox', 'showBoxConfig', 'dbind', 'one', 'two', 'three', 'four'],

    function($, _, iscrollConfig, fastclick, Router, ShowBox, showBoxConfig, DBind, One, Two, Three, four){
        //alert('aaaaaaaa');
    //fastclick.attach(document.body);                               //调用快点对象

    var contentWrap = $('#contentWrap');      //路由模版
    var right = function () {
            //console.log('right');
            One.render(contentWrap);

        },
        down = function() {
            Two.render(contentWrap);
        },
        top = function() {
            Three.render(contentWrap);
        },
        viewBook = function(bookId) {
            //console.log("viewBook: bookId is populated: " + bookId);
            four.render(contentWrap,bookId);
        };
    var routes = {
        '/right': [
            right, function(){
            var dBind = new DBind( 1 ,{
                callBackFn: function(){
                   // alert('789');
                }
            });
            /*dBind.set( "name", "这里是双向数据绑定!");*/}
        ],
        '/down' : down,
        '/top' :  top,
        //'/books': [books, function() { /*alert('asdfsfa');*/}],
        '/books/view/:bookId': viewBook
    };

    var router = Router(routes);
    router.init();

    iscrollConfig.render();
    showBoxConfig.render();




});
