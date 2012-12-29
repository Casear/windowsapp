onmessage = generateImage;
function generateImage(event) {
    var wsc = Windows.Security.Cryptography;
    var buffer1b = wsc.CryptographicBuffer.decodeFromBase64String(event.content);
    var _folder = Windows.Storage.ApplicationData.current.localFolder;
    _folder.getFolderAsync("pi").then(function (project) {
        project.getFolderAsync("slide").then(function (slide) {
        }).cancel(function () {
            project.createFolderAsync("slide");               
        });
    }).cancel(function () {
        _folder.createFolderAsync("pi").then(function (project) {


        });
    });


}