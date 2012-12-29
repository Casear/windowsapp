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

    // Create a namespace to make the data publicly
    // accessible. 
    var publicMembers =
        {
            itemList: dataList
        };
    WinJS.Namespace.define("DataExample", publicMembers);

})();
