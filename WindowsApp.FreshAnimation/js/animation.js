function AnimationObjectManager(_canvasId,_projectId,callback) {
    var projectId=_projectId;
    var canvasId=_canvasId;
    var animationName;
    this.images = [];
    this.images.push({ title: "sea", url: "/animation/pi/sea.png" });
    this.images.push({ title: "sky", url: "/animation/pi/sky.png" });
    this.images.push({ title: "ground", url: "/animation/pi/ground.png" });

    var htSize = {
        width: document.body.clientWidth,
        height: document.body.clientHeight
    };
    oLayer = new collie.Layer({
        width: htSize.width,
        height: htSize.height
    });

    this.images.forEach(function (file) {
        collie.ImageManager.addImage(file.title, file.url);
    });
    new collie.MovableObject({ backgroundImage: this.images[0].title }).addTo(oLayer);
    collie.Renderer.addLayer(oLayer);
    collie.Renderer.load(document.getElementById(canvasId));
    collie.Renderer.start();
    if (callback != null) {
        callback();
    }
    this.add

}