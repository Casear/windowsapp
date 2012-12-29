function AnimationObjectManager(_canvasId, _projectId, callback) {
    var projectId = _projectId;
    var canvasId = _canvasId;
    var animationName;
    var startRec = false;
    this.Frame = 0;

    this.animationObject = [];
    this.images = [];
    this.images.push({ title: "sea", url: "/animation/pi/sea.png" });
    this.images.push({ title: "sky", url: "/animation/pi/sky.png" });
    this.images.push({ title: "ground", url: "/animation/pi/ground.png" });
    var mouseDown = false;
    var htSize = {
        width: document.body.clientWidth,
        height: document.body.clientHeight
    };
    oLayer = new collie.Layer({
        width: htSize.width,
        height: htSize.height
    });
    var oSelectedDisplayObject = null;
    var htStartPosition;
    var htSelectedDisplayObjectPosition;
    var count = 0;
    oLayer.attach({
        mousedown: function (oEvent) {
            mouseDown = true;
            htStartPosition = { x: oEvent.x, y: oEvent.y };
        }
    ,
        mouseup: function (oEvent) {

            mouseDown = false;
        },
        mousemove: function (oEvent) {
            htSelectedDisplayObjectPosition = { x: oEvent.x, y: oEvent.y };

        }
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
    var playFrame = 0;
    var playindex = 0;
    function playdemo() {

        if (this.animationObject.length > (playindex+1)) {
            while (this.animationObject[playindex].frame <= playFrame) {

                new collie.Circle({
                    radius: 10,
                    fillColor: "red",
                    x: this.animationObject[playindex].x,
                    y: this.animationObject[playindex].y,
                }).addTo(oLayer);
                playindex++;
            }
        }
        playFrame++;
        if (playFrame <= obj.Frame)
            window.requestAnimationFrame(playdemo);
    }
    this.play = function () {
        playFrame = 0;
        playdemo();


    }
    var obj = this;
    function recordAndPlay() {

        if (mouseDown) {
            if (htSelectedDisplayObjectPosition) {
                this.animationObject.push({ obj: "", frame: obj.Frame, x: htSelectedDisplayObjectPosition.x, y: htSelectedDisplayObjectPosition.y });
            } else {
                this.animationObject.push({ obj: "", frame: obj.Frame, x: oSelectedDisplayObject.x, y: oSelectedDisplayObject.y });
            }
        }

        obj.Frame++;
        if (startRec) {
            window.requestAnimationFrame(recordAndPlay);
        } else {
            console.log("stop rec");
        }

    }
    this.rec = function () {
        startRec = true;
        recordAndPlay();
    }
    this.stopRec = function () {
        startRec = false;
    }
    return this;
}