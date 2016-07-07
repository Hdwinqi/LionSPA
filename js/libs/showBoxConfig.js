/**
 * Created by qi.huang on 2015/12/23.
 */
 define(['zepto','showBox','exports'],function($,ShowBox,exports){
     //console.log(ShowBox);
     exports.render = function(){

         //模拟切换新页
         new ShowBox('.dropMenu-js',
             {
                 speed:300,
                 setEvent:'touchstart',
                 interactive:'dialogBox',
                 animateClass: "flyLeft",
                 targetLayer:'#contentWrap',
                 behindClass:'flyLeftBehind',
                 callBeforeFn:function(obj,target){
                     target.attr('class','subLayer subLayer-readyLeft');
                     return true;
                 },
                 callBackFn:function(obj,target){

                 },
                 closeFn: function(){
                     //alert('aaaaaaaaa');
                 }
             });


         //底部弹层
         new ShowBox('.bottomMenu-js',
             {
                 speed:300,
                 setEvent:'touchstart',
                 interactive:'dialogBox',
                 targetLayer:'#contentWrap',
                 animateClass: "flyUp",
                 maskLayer:true,
                 //behindClass:'flyUpBehind',
                 callBeforeFn:function(obj,target){
                     target.attr('class','subLayer subLayer-readyUp');
                     return true;
                 },
                 callBackFn:function(obj){
                     //alert('asdfasf');

                 }
             });


         //顶部弹层
         new ShowBox('.topMenu-js',
             {
                 speed:300,
                 setEvent:'touchstart',
                 interactive:'dialogBox',
                 targetLayer:'#contentWrap',
                 animateClass: "flyDown",
                 maskLayer:true,
                 //behindClass:'flyUpBehind',
                 callBeforeFn:function(obj,target){
                     target.attr('class','subLayer subLayer-readyDown');
                     return true;
                 },
                 callBackFn:function(obj){
                     //alert('asdfasf');

                 }
             });




     };

 });
