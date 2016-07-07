/**
 * Created by Lenovo on 2015/12/9.
 */
define(["text!/module_4/4.html","underscore"], function(html,_){

    return {
        render: function(obj,id){
            var json = {
                data:{
                    list: {
                        name: 'Lion',
                        property:'我是通过Template存储地'
                    }
                },
                code:1,
                status:200
            };
            var compiled = _.template(html,{variable: 'root'});    //默认的, template 通过 with 语句来取得 data 所有的值.
                                                                   //在template方法中设定一个 variable指向需要渲染的数据的变量名. 这样能显著提升模板的渲染速度.

            //obj.innerHTML = compiled(json);
            obj.html(compiled(json));
            $('#myID').html(id);



        }
    }

});
