/**
 * Created by Administrator on 2015/12/23.
 */
 define(['zepto','iscroll','exports'],function($,iscroll,exports){

     exports.render = function(){
         $(document).ready(function(){
             function bodyLoaded () {
                 var myScroll = new IScroll('#wrapper' ,{
                     scrollX: false,
                     scrollY: true,
                     //momentum: false,
                     click: true,
                     //snap: false,
                     scrollbars: false
                 });
                 myScroll.on('scrollEnd', function(){
                     //window.pageTop = Math.abs(myScroll.y);
                     //console.log(window.pageTop);
                 });

             }
             bodyLoaded ();
             document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
         });
     }

 });