/**
 *  Author qi.huang on 2015/12/24.
 *  vision 1.0.1
 *  不依赖任何类库及框架
 *  实现双向数据绑定
 *  @user this Plugin for Example:
 *   1.add javascript code:
 *
 *           //响应onchange回调此对象参数可选
 *          var pram ={
 *            callBackFn : function(prop_name,val) {
                    console.log(prop_name);
                    console.log(val);
                }
 *          }
 *          //初例化对象必写项
 *          var DBind = new DBind( 1 , pram);
 *
 *          //设置输入框初始值可选
 *          DBind.set( "name", "黄奇" );
 *
 *   2. add HTML code on your page:
 *          <input type="text" data-bind-1="name" />
 *          <span data-bind-1="name"></span>
 */
define([], function(){

    function DataBinder( object_id ,pramObj) {
        // Create a simple PubSub object
        var pubSub = {
                callbacks: {},

                on: function( msg, callback ) {
                    this.callbacks[ msg ] = this.callbacks[ msg ] || [];
                    this.callbacks[ msg ].push( callback );
                },

                publish: function( msg ) {
                    this.callbacks[ msg ] = this.callbacks[ msg ] || [];
                    for ( var i = 0, len = this.callbacks[ msg ].length; i < len; i++ ) {
                        this.callbacks[ msg ][ i ].apply( this, arguments );
                    }
                }
            },
            isFunc =function (test){
                return typeof test == 'function';
            },
            data_attr = "data-bind-" + object_id,
            message = object_id + ":input",
            pramObjCallBack = pramObj.callBackFn ? isFunc(pramObj.callBackFn) ? pramObj.callBackFn : function(){ alert('callBackFn/这里必须是个函数！');return false;} : null,
            timeIn;

        changeHandler = function( evt ) {
            var target = evt.target || evt.srcElement, // IE8 compatibility
                eventType = evt.type,
                prop_name = target.getAttribute( data_attr );

            if ( prop_name && prop_name !== "" ) {
                if( eventType == 'input' ) {
                    clearTimeout(timeIn);
                    timeIn = setTimeout(function(){
                        pubSub.publish( message, prop_name, target.value );
                    },50);
                } else if ( eventType == 'change' && pramObjCallBack ) {

                    pramObjCallBack( prop_name,target.value );
                }


            }
        };

        // Listen to change events and proxy to PubSub
        if ( document.addEventListener ) {
            document.addEventListener( "input", changeHandler, false );
            document.addEventListener( "change", changeHandler, false );
        } else {
            // IE8 uses attachEvent instead of addEventListener
            document.attachEvent( "oninput", changeHandler );
            document.attachEvent( "onchange", changeHandler );
        }

        // PubSub propagates changes to all bound elements
        pubSub.on( message, function( evt, prop_name, new_val ) {
            var elements = document.querySelectorAll("[" + data_attr + "=" + prop_name + "]"),
                tag_name;

            for ( var i = 0, len = elements.length; i < len; i++ ) {
                tag_name = elements[ i ].tagName.toLowerCase();

                if ( tag_name === "input" || tag_name === "textarea" || tag_name === "select" ) {
                    elements[ i ].value = new_val;
                } else {
                    elements[ i ].innerHTML = new_val;
                }
            }
        });

        return pubSub;
    }
    function DBind( uid,pramObj ) {
        pramObj = pramObj || {};
        var binder = new DataBinder( uid ,pramObj),
            user = {
                // ...
                attributes: {},
                set: function( attr_name, val,pramObj ) {
                    this.attributes[ attr_name ] = val;
                    // Use the `publish` method
                    binder.publish( uid + ":input", attr_name, val, pramObj, this );
                    binder.publish( uid + ":change", attr_name, val, pramObj, this );
                },
                get: function( attr_name ) {
                    return this.attributes[ attr_name ];
                },

                _binder: binder
            };

        // Subscribe to the PubSub
        binder.on( uid + ":input", function( evt, attr_name, new_val, pramObj, initiator ) {
            if ( initiator !== user ) {
                user.set( attr_name, new_val, pramObj );
            }
        });

        binder.on( uid + ":change", function( evt, attr_name, new_val, pramObj, initiator ) {
            if ( initiator !== user ) {
                user.set( attr_name, new_val, pramObj );
            }
        });

        return user;
    }

    return DBind;
});