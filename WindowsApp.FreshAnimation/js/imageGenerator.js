onmessage = generateImage;

var base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split("");
var base64inv = {};
for (var i = 0; i < base64chars.length; i++) {
    base64inv[base64chars[i]] = i;
}
function base64_decode_array(s) {
    // remove/ignore any characters not in the base64 characters list
    //  or the pad character -- particularly newlines
    s = s.replace(new RegExp('[^' + base64chars.join("") + '=]', 'g'), "");

    // replace any incoming padding with a zero pad (the 'A' character is zero)
    var p = (s.charAt(s.length - 1) == '=' ?
            (s.charAt(s.length - 2) == '=' ? 'AA' : 'A') : "");

    var r = [];

    s = s.substr(0, s.length - p.length) + p;

    // increment over the length of this encrypted string, four characters at a time
    for (var c = 0; c < s.length; c += 4) {

        // each of these four characters represents a 6-bit index in the base64 characters list
        //  which, when concatenated, will give the 24-bit number for the original 3 characters
        var n = (base64inv[s.charAt(c)] << 18) + (base64inv[s.charAt(c + 1)] << 12) +
                (base64inv[s.charAt(c + 2)] << 6) + base64inv[s.charAt(c + 3)];


        // split the 24-bit number into the original three 8-bit (ASCII) characters
        r.push((n >>> 16) & 255);
        r.push((n >>> 8) & 255);
        r.push(n & 255);


    }
    // remove any zero pad that was added to make this a multiple of 24 bits
    return r;
}
function generateImage(event) {
    var wsc = Windows.Security.Cryptography;

    var _folder = Windows.Storage.ApplicationData.current.localFolder;
    
    _folder.createFolderAsync("projects\\" + event.data.projectId + "\\slide", Windows.Storage.CreationCollisionOption.openIfExists).then(function (folder) {
        var buffer1b = base64_decode_array(event.data.content);
        folder.createFileAsync(event.data.frame + '.png', Windows.Storage.CreationCollisionOption.replaceExisting).then(function (file) {
            return Windows.Storage.FileIO.writeBytesAsync(file, buffer1b);
        }).done(function () {
        });
    });;


}