(function () {
    "use strict";



    var page = WinJS.UI.Pages.define("/html/menu.html", {
        ready: function (element, options) {
            
            onload();
            
            initLayer();
        }
    });

    function getToolsByMoving($tools,pos) {
        
        var x = pos.x - 50,
            y = pos.y - 50;

        return $('<div />')
                .width(100)
                .height(100)
                .css({ position: 'absolute', left: x, top: y })
                .append($tools)
            .bind("MSPointerDown MSPointerMove MSPointerOver MSPointerOver MSPointerUp", function (ev) {
                switch (ev.type) {

                    case 'MSPointerMove':
                        $(this).css({
                            left: ev.originalEvent.x - 50,
                            top: ev.originalEvent.y - 50
                        });

                        //momentum.addPoint([ev.position.x, ev.position.y]);
                        break;

                    case 'MSPointerUp':

                        $(this).unbind('MSPointerMove MSPointerUp');
                        $(this).bind();

                        //var left = parseInt(box.css("left"), 10);
                        //var top = parseInt(box.css("top"), 10);

                        //var dir_left = -1;
                        //var dir_top = -1;

                        //momentum.animate(function (x, y) {
                        //    left += x;
                        //    top += y;

                        //    box.css({
                        //        left: left,
                        //        top: top
                        //    });
                        //});
                        break;
                }
            })
            //.on('MSPointerMove', function (evt) {
            //    console.log(evt);
            //})
            //.insertAfter($(this));
    }

    function initLayer() {
        var anx = window.animination;
        var imgs = anx.images;
        var pnl = $('#pnlLayer');

        var tapHandler = function (ev) {
           
            anx.setAnimation($(this).data('title'));
        };

        var addImage = function(ev){
            
            anx.setImage($(this).data('title'));
        };

        for (var i = 0; i < imgs.length; i++) {
            var item = $('<button class="smallListItem" />')
                .data('title', imgs[i].title)
            .append($('<img  />').attr('src', imgs[i].url))
            .append($('<span />').text(imgs[i].title))
            .hammer({})
            .on('doubletap', addImage)
            .on('hold', tapHandler)
            .on('release', function () {
                anx.setAnimation(null);
            });
            
            pnl.append(item);
        }

      
    }


    function onload() {
       
        (function () {
            var counter = 1;


            $('#tPosition').on('MSPointerDown', '#btnPosition', function (evt) {
                
                if (counter++ % 2) {
                    var ctr = $('<input type="range" />')
                        .val(100)
                        .data('oldValue', 100)
                    .on('change', function (ev) {
                        var anx = window.animination;
                        var imgs = anx.animationObj;
                        var $this = $(this);
                        var dir = ($(this).val() - $this.data('oldValue')) < 0 ? 1 : -1;
                        
                        $this.data('oldValue', $this.val());

                        for (var img in imgs) {
                            
                            var x = imgs[img].get('x') - dir * 10;

                            imgs[img].set('x', x);

                        }
                    });

                    $(this).after(getToolsByMoving(
                        ctr,
                        { x: evt.originalEvent.x, y: evt.originalEvent.y }));
                }
                else {
                    $(this).parent().children('div').remove();
                }

            });

        }());


        (function () {
            var counter = 1;


            $('#tCircle').on('MSPointerDown', '#btnRotation', function (evt) {

                if (counter++ % 2) {
                    var circle = $('<input type="hidden" >')
                    .attr('data-width', 150)
                    .attr('data-cursor', true)
                    .attr('data-thickness', ".3")
                    .attr('data-fgColor', "#C0ffff")
                    .attr('data-bgColor', "#999999")
                    .attr('data-angleOffset', 180)
                    
                    //.attr('data-displayinput', true)
                    .knob({
                        "min": 0,
                        "max": 360,
                        'change': function (v) {
                            var anx = window.animination;
                            anx.setAngle(v);
                           
                        }
                    });
                    window.animination.closeDragEvent();
                    $(this).after(getToolsByMoving(
                        circle,
                        { x: evt.originalEvent.x, y: evt.originalEvent.y }));
                }
                else {
                    $(this).parent().children('div').remove();
                    window.animination.openDragEvent();
                }

            });

        }());

       

        
    }

})();
