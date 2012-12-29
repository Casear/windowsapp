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
            var lvTools = element.querySelector("#lvProperties").winControl;

            // Notify the ListView to calculate its layout 
            listView.forceLayout();
            lvTools.forceLayout();

            function itemInvokedHandler(eventObject) {
                eventObject.detail.itemPromise.done(function (invokedItem) {

                    // Access item data from the itemPromise 
                    console.log && console.log("The item at index " + invokedItem.index + " is "
                        + invokedItem.data.title + " with a text value of "
                        + invokedItem.data.text, "sample", "status");
                });
            }


            

            listView.addEventListener("iteminvoked", itemInvokedHandler, false);
        }
    });



})();
