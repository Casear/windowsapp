function AnimationObjectManager(_canvasId, _projectId, callback) {
    var projectId = _projectId;
    var canvasId = _canvasId;
    var animationName = null;
    var startRec = false;
    var startPlay = false;
    var animationO;
    this.Frame = 0;
    this.animationObj = {};

    this.animationFrame = [];
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
    var obj = this;
    var playFrame = 0;
    var playindex = 0;
   
    this.play = function () {
        playFrame = 0;
        startPlay = true;

    }
    var lastCalledTime;
    var fps;

    function requestAnimFrame() {

        if (!lastCalledTime) {
            lastCalledTime = new Date().getTime();
            fps = 0;
            return;
        }
        delta = (new Date().getTime() - lastCalledTime) / 1000;
        lastCalledTime = new Date().getTime();
        fps = 1 / delta;
        $('#fps').text(Math.floor(fps));
    }
    function checkAnimation() {
        if (startRec) {
            console.log("start rec");
            if (animationO && mouseDown) {
                if (htSelectedDisplayObjectPosition) {
                    this.animationFrame.push({ obj: animationO, frame: obj.Frame, x: htSelectedDisplayObjectPosition.x, y: htSelectedDisplayObjectPosition.y });
                } else {
                    this.animationFrame.push({ obj: animationO, frame: obj.Frame, x: oSelectedDisplayObject.x, y: oSelectedDisplayObject.y });
                }
            }
            obj.Frame++;
        }
        if (startPlay && playFrame <= obj.Frame) {
            console.log("start play");
            while (obj.animationFrame.length > (playindex + 1) && this.animationFrame[playindex].frame <= playFrame) {

            }
            playFrame++;
        }
        requestAnimFrame();
        window.requestAnimationFrame(checkAnimation);
    }
    this.rec = function () {
        startRec = true;
    }
    this.stopRec = function () {
        startRec = false;
    }
    this.setAnimation = function (id) {

        if (this.animationObj[id]) {
            animationO = this.animationObj[id];
        }

    }
    collie.Renderer.addLayer(oLayer);
    collie.Renderer.load(document.getElementById(canvasId));
    collie.Renderer.start();
    if (callback != null) {
        callback();
    }
    checkAnimation();
    return this;
}