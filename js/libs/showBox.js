//弹层插件
/** For show details plugin
 *      @Author Qi.Huang on 15-4-7.
 *      支持可选择是弹窗和点击下拉显示两种方式；
 *      弹窗、点击下拉层：响应事件标签设置 data-shown=
 *      {                interactive:'dialogBox/dropMenu',  //提取交互方式
         *               targetLayer:'targetID',            //目标层ID
         *               setEvent:'click'                   //设置触发事件
         *               callBackFn : fun                   //执行完回调
         *               callBeforeFn：fun                  //执行之前回调
         *               closeFn: fun                       //关闭回调
         *               maskLayer:false,                   //是否出现背景;下拉层不支持此属性；
         *               speed:300,                          //速度
         *               animate : true                      //是否需要动画
         *               className: calssName                //下拉表列点击对象变化样式
         *               callBackFn : fun                    //执行完回调
         *               callBeforeFn：fun                  //执行之前回调
         *               closeFn: fun                       //关闭回调
         *
         *   }
 *      或者 new ShowBox('#ID',{ interactive:'dialogBox',targetLayer:'targetID',animate:className, callBackFn:fun })
 *      可选参数同上
 *      注：如果用于手机端可在需要动画切换的后面一个层（即老层相对新切换的层来讲）加上class=".behind-js"即可，实现老层小动画使过度动画看起来更流畅
 *
 */
define(['zepto'], function($){
    //alert('asdfaf');
    var doc = document;
   //attachFastClick.attach(doc.body);

    function getDom(d){
        if(typeof d=="string"){
            d = (d[0]==="#" || d[0]===".") ? $(d) : $(doc.getElementById(d));
        }
        //return jquery object;
        return $(d);
    }

    //---获取元素中设置data-shown--
    function getAttrToJSON(ele,attr){
        var data = $(ele).attr(attr);
        if(ele && attr && data!==undefined){
            try{
                data = eval("("+data+")");
            } catch (err) {
                alert(attr+" 属性JSON格式错误!");
            }
        } /*else {
            alert(attr+" 属性不存在!");
            //console.log(attr);
        }*/
        return data ? data : {};
    }

    //---获取手机屏幕高度----
    function getClientH(){
        return (window.innerHeight > 0) ? window.innerHeight : screen.height;
    }

    function getScrollTop(){
       //alert(window.pageTop);

        //window.pageTop
        return window.pageTop || (document.documentElement.scrollTop ? document.documentElement.scrollTop : 0);

        //pageTop;
    }

    var ShowBox = function(obj,opts){
        //this.options = $.extend({},{bg:false,speed:300},opts);
        //debugger;
        this.obj = getDom(obj);
        this.opts = opts;
        this.defaults = { maskLayer:false, speed:300,animate : false, className:undefined };
        this.maskLayer = $('<div id="shownBg" class="shown-bg container-fluid"></div>');
        this.int();
    };
    ShowBox.prototype = {
        int : function(){
            var self = this,
                obj = self.obj,
                len = obj.length;
            for(var i=0; i< len; i++){
                var shownParams = $.extend(getAttrToJSON(obj[i], 'data-shown'), self.opts,{}),
                    evt = shownParams.setEvent,
                    thisObj = $(obj[i]);
                //console.log(thisObj);
                if( evt && typeof evt === 'string'){
                    evt = evt+'.sx';
                    thisObj.off(evt).on(evt, function() {
                        var thatParams = $.extend(getAttrToJSON($(this)[0], 'data-shown'), self.opts,{});
                        self.toggleLayer($(this), thatParams);
                    });
                }else{
                    return ;
                }

            }
        },
        toggleLayer : function(obj,opt){
            //debugger;
            var self = this;
            var type = opt.interactive,
                evt  = opt.setEvent,
                targetLayer = getDom(opt.targetLayer),
                setting = $.extend({},this.defaults, opt);
           //debugger;
            if(targetLayer.length == 0) return;
            if(setting.callBeforeFn && typeof setting.callBeforeFn === 'function'){
                if(!setting.callBeforeFn(obj, targetLayer)) return;
            }
            switch (type){
                //弹窗类型
                case "dialogBox":
                    //debugger;
                    var isToCallBack = false,
                        behindClass = setting.behindClass||'',
                        timeoutVar,
                        scrollTop = getScrollTop(),
                        clientH =  getClientH();
                    clientH = clientH/window.devicePixelRatio;
                    //console.log(scrollTop);
                    scrollTop = scrollTop/window.devicePixelRatio;
                    var styleOpts = { /*'height':clientH+'px','top': scrollTop+'px'*/};
                    //alert(clientH/window.devicePixelRatio);
                    if(setting.maskLayer && setting.maskLayer == true){
                        //targetLayer.unwrap('shownBg');
                        targetLayer.wrap(self.maskLayer);
                    }
                    if(setting.animateClass && typeof setting.animateClass === 'string'){
                        //container.css(styleOpts).css({'overflow':'hidden'});

                        targetLayer.show();

                        targetLayer.addClass(setting.animateClass)/*.css(styleOpts)*/;
                        $('.behind-js').addClass(behindClass);
                        isToCallBack = true;
                    }else{
                        targetLayer.show().css(styleOpts);
                        isToCallBack = true;
                    }
                    if(setting.callBackFn && typeof setting.callBackFn === 'function' && isToCallBack === true){
                        setting.callBackFn(obj,targetLayer);
                    }
                    targetLayer.off('touchstart.a').on('touchstart.a','.close-js',function(e){

                        if (setting.animateClass && typeof setting.animateClass === 'string') {
                            clearTimeout(timeoutVar);
                            targetLayer.removeClass(setting.animateClass)/*.css(styleOpts)*/;
                            $('.behind-js').removeClass(behindClass);
                            timeoutVar = setTimeout(function(){
                                targetLayer.hide();
                            },300);

                        }else{
                            targetLayer.hide().removeAttr('style');
                        }
                        if(setting.maskLayer && setting.maskLayer == true){
                            targetLayer.unwrap('shownBg');
                        }
                        if(setting.closeFn && typeof setting.closeFn === 'function') {
                            setting.closeFn(obj,targetLayer);
                        }
                        //e.stopPropagation();
                    });
                    break;

                //下拉列表
                case "dropMenu" :
                    if(evt=='mouseover'){
                        targetLayer.show();
                        obj.off('mouseout').on('mouseout',function(e){
                            targetLayer.hide();
                            e.stopPropagation();
                        });
                        targetLayer.hover(function(){
                            $(this).show();
                        },function(){
                            $(this).hide();
                        })
                    }else if(evt == 'click'){
                        $(doc).trigger('click.cc');
                        targetLayer.toggle();
                        if(setting.className && typeof setting.className=='string'){
                            obj.toggleClass(setting.className);
                        }

                        $(doc).off('click.cc').on('click.cc',function(e){
                            var $theTarget = $(e.target);
                            //debugger;
                            if($theTarget.is(targetLayer) || $theTarget.is(obj) || $theTarget.closest(targetLayer).length>0) {
                                return
                            }else{
                                targetLayer.hide();
                            }
                            e.stopPropagation();
                        })
                    }
                    if(setting.callBackFn && typeof setting.callBackFn === 'function'){
                        setting.callBackFn(obj,targetLayer);
                    }
                    break;
                //Tab
                case "tab" :
                    //debugger;
                    if(setting.targetLayer.indexOf('#')===0){
                        targetLayer.siblings().hide();
                        targetLayer.show();
                    }else if(setting.targetLayer.indexOf('.')===0){
                        var index = obj.index();
                        //targetLayer.hide();
                        $(targetLayer[index]).show().siblings(setting.targetLayer).hide();

                    }
                    //debugger;
                    if(setting.className && typeof setting.className=='string'){
                       // debugger;
                        obj.addClass(setting.className).siblings().removeClass(setting.className);
                    }


            }

        }

    };
    return ShowBox;

});