(function () {
    "use strict";



    var page = WinJS.UI.Pages.define("/html/menu.html", {
        ready: function (element, options) {
            
            onload();
            initCircle();
            initLayer();
        }
    });

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

    function initCircle() {
        /**
           * setup hammer
           */
        
        var elBlue = document.getElementById('blue');

        var hammerBlue = new Hammer(elBlue, {
            drag_min_distance: 0,
            drag_horizontal: true,
            drag_vertical: true,
            transform: false,
            hold: false,
            prevent_default: true
        });

        hammerBlue.ontap = function (ev) {
            //$(".dial").knob();
        };

        /**
         * on drag
         */
        hammerBlue.ondrag = function (ev) {

            var touches = ev.originalEvent.touches || [ev.originalEvent];
            for (var t = 0; t < touches.length; t++) {
                var el = touches[t].target;

                var left = ev.touches[t].x - (100 / 2);
                var top = ev.touches[t].y - (100 / 2);

                if (left < 0) {
                    left = 0;
                }
                if (top < 0) {
                    top = 0;
                }

                el.style.left = left + 'px';
                el.style.top = top + 'px';

            }

        };
    }

    //function initCircle() {
    //    var drag;
    //    var zIndex = 10;

    //    var watchDrag = function() {
    //        if (!drag.length) {
    //            return;
    //        }

    //        for (var d = 0; d < drag.length; d++) {
    //            var left = drag[d].pos.x - (drag[d].size.width / 2);
    //            var top = drag[d].pos.y - (drag[d].size.height / 2);

    //            if (left < 0) {
    //                left = 0;
    //            }
    //            if (top < 0) {
    //                top = 0;
    //            }

    //            drag[d].el.style.left = left + 'px';
    //            drag[d].el.style.top = top + 'px';
    //        }
    //    }



    //    $('#tCircle').hammer({
    //        drag_min_distance: 0,
    //        drag_horizontal: true,
    //        drag_vertical: true,
    //        transform: false,
    //        hold: false,
    //        prevent_default: true
    //    })
    //    .on('tap', function (ev) {

    //        //$(".dial").knob();

    //        $("#tWrapper").hammer({
    //                drag_min_distance: 0,
    //                drag_horizontal: true,
    //                drag_vertical: true,
    //                transform: false,
    //                hold: false,
    //                prevent_default: true
    //            })
    //            //.on('tap', function (ev) {
    //            //    var touches = ev.originalEvent.touches || [ev.originalEvent];
    //            //    for (var t = 0; t < ev.touches.length; t++) {
    //            //        var el = touches[t].target;
    //            //        el.style.zIndex = 10;
    //            //    }
    //            //})
    //            .on('drag', function (ev) {

    //                var touches = ev.originalEvent.touches || [ev.originalEvent];
    //                for (var t = 0; t < touches.length; t++) {
    //                    var el = touches[t].target;

    //                    var left = ev.touches[t].x - (150 / 2);
    //                    var top = ev.touches[t].y - (150 / 2);

    //                    if (left < 0) {
    //                        left = 0;
    //                    }
    //                    if (top < 0) {
    //                        top = 0;
    //                    }

    //                    el.style.left = left + 'px';
    //                    el.style.top = top + 'px';

    //                }
    //            });

    //    });
       
    //}

    function onload() {
        //var clr = document.getElementById('btnPosition');
        //clr.addEventListener('MSPointerDown', function (evt) {

        //    var x = evt.currentPoint.rawPosition.x,
        //           y = evt.currentPoint.rawPosition.y;
        //    $('#posRange').css({ left: evt.x, top: evt.y }).show();
        //});
        

        $('#cPosition').on('MSPointerDown', '#btnPosition', function (evt) {
            $('#posRange')
                //.css({ left: evt.x, top: evt.y })
                .show();
        })
        .on('MSPointerMove', 'posRange', function (evt) {
            console.log(evt);
        });
        

        $('#posRange').on('MSPointerDown', function (evt) {
           // $(this).hide();
        })
        .on('');
    }

})();
