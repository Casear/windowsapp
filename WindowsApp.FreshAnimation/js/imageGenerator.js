onmessage = generateImage;
function generateImage(event) {
    var wsc = Windows.Security.Cryptography;

    var _folder = Windows.Storage.ApplicationData.current.localFolder;
    _folder.createFolderAsync("projects\\" + event.projectId + "\\slide", Windows.Storage.CreationCollisionOption.openIfExists).then(function (folder) {
        var buffer1b = wsc.CryptographicBuffer.decodeFromBase64String(event.content);
        folder.createFileAsync(event.frame + '.png', Windows.Storage.CreationCollisionOption.replaceExisting).then(function (file) {
            return Windows.Storage.FileIO.writeBytesAsync(file, buffer1b);
        }).done(function () {
        });
    });;


}