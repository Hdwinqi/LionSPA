/**
 * Created by qi.huang on 2015/12/23.
 */
 define(['zepto','exports'],function($,exports){
     //console.log(ShowBox);
     exports.render = function(){
         //模拟切换新页
         new SW.ShowBox('.dropMenu-js',
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

                 }
             });

         //底部弹层
         new SW.ShowBox('.downMenu-js',
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
         new SW.ShowBox('.topMenu-js',
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
