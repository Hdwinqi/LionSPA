/**
 * Created by qi.huang on 2015/12/7.
 */
define(['zepto','swipe'], function($, Swipe){
    return {
        render: function(){
            function setSwipe(){              //���һ���
                //debugger;
                var elem = $('.swipe-js'),
                    len = elem.find('figure').length,
                    nextBtn = _.isEmpty(elem.find('#nextBtn-js')) ? elem.parent().find('#nextBtn-js') : elem.find('#nextBtn-js') ,
                    prevBtn = _.isEmpty(elem.find('#prevBtn-js')) ? elem.parent().find('#prevBtn-js') : elem.find('#prevBtn-js') ,
                    params = {
                        startSlide:0,
                        //auto: 2000,
                        continuous: false,
                        disableScroll: false,
                        stopPropagation: false,
                        callback : function(index){
                            if(index == 0){
                                prevBtn.addClass('btn-hidden');
                            }else if(index == len-1){
                                nextBtn.addClass('btn-hidden');
                            }else{
                                nextBtn.removeClass('btn-hidden').addClass('btn-highLight'); //��ť����
                                prevBtn.removeClass('btn-hidden').addClass('btn-highLight'); //��ť����
                            }
                        }
                    };
                //console.log($('.swipe-js').Swipe(params));
                var mySwipe = Swipe(elem[0],params);
                //console.log(len);
                prevBtn.on('tap', function(e){  mySwipe.prev();e.stopImmediatePropagation();}); //����һ��ͼƬ
                nextBtn.on('tap', function(e){ mySwipe.next();e.stopImmediatePropagation();});//����һ��ͼƬ
            }

            $(function(){
                setSwipe();
            });
        }
    }
});
