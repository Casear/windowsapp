(function () {
    "use strict";

    var dataArray = [
    { title: "Basic banana", text: "Low-fat frozen yogurt"  },
    { title: "Banana blast", text: "Ice cream"},
    { title: "Brilliant banana", text: "Frozen custard"},
    { title: "Orange surprise", text: "Sherbet"},
    { title: "Original orange", text: "Sherbet"},
    { title: "Vanilla", text: "Ice cream"},
    { title: "Very vanilla", text: "Frozen custard"},
    { title: "Marvelous mint", text: "Gelato"},
    { title: "Succulent strawberry", text: "Sorbet"}
    ];

    var dataList = new WinJS.Binding.List(dataArray);


    var tools = new WinJS.Binding.List([
        { title: "Position" },
        { title: "Rotation" },
        { title: "Scale" },
        { title: "Image" }
    ]);

    WinJS.Namespace.define("ToolsData", {itemList:tools});
    // Create a namespace to make the data publicly
    // accessible. 
    var publicMembers =
        {
            itemList: dataList
        };
    WinJS.Namespace.define("DataExample", publicMembers);

    var page = WinJS.UI.Pages.define("/html/menu.html", {
        ready: function (element, options) {
            var listView = element.querySelector('#lvLayers').winControl;
            //var lvTools = element.querySelector("#lvProperties").winControl;

            // Notify the ListView to calculate its layout 
            listView.forceLayout();
            //lvTools.forceLayout();

            function itemInvokedHandler(eventObject) {
                eventObject.detail.itemPromise.done(function (invokedItem) {

                    // Access item data from the itemPromise 
                    console.log && console.log("The item at index " + invokedItem.index + " is "
                        + invokedItem.data.title + " with a text value of "
                        + invokedItem.data.text, "sample", "status");
                });
            }

            console.log(window.animination);
            
            
            

            listView.addEventListener("iteminvoked", itemInvokedHandler, false);
            //lvTools.addEventListener("MSPointerDown", toolsInvokedHandler, false);
            onload();
            initCircle();
        }
    });

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
