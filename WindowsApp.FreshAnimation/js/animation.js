function AnimationObjectManager(_canvasId, _projectId, callback) {
    var projectId = _projectId;
    var canvasId = _canvasId;
    var animationName = null;
    var startRec = false;
    var startPlay = false;
    var animationO;
    this.Frame = 0;
    this.animationObjId = null;
    this.animationObj = {};

    this.animationFrame = {};
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

    var htStartPosition = null;
    var htSelectedDisplayObjectPosition = null;
    var count = 0;


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
          
            if (obj.animationObjId && mouseDown) {
                if (htSelectedDisplayObjectPosition) {
                    obj.animationFrame[obj.Frame] = {};
                    obj.animationFrame[obj.Frame][obj.animationObjId] = { obj: obj.animationObjId, x: obj.animationObj[obj.animationObjId].get("x") + htSelectedDisplayObjectPosition.x - htStartPosition.x, y: obj.animationObj[obj.animationObjId].get("y") + htSelectedDisplayObjectPosition.y - htStartPosition.y };
                    
                }
            }
            obj.Frame++;
        }
        if (startPlay || startRec) {
            while (playFrame <= obj.Frame) {
                if (this.animationFrame[playFrame]) {
                    for(var node in obj.animationFrame[playFrame]){
                        obj.animationObj[node].move(obj.animationFrame[playFrame][node].x, obj.animationFrame[playFrame][node].y);
                    };
                }
                playFrame++;
            }
            
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

        if (obj.animationObj[id]) {
            obj.animationObjId = id;
        } else {


        }

    }
    this.animationObj["sky"] = new collie.MovableObject({ backgroundImage: "sky" });
    this.animationObj["sky"].addTo(oLayer);
    collie.Renderer.addLayer(oLayer);
    collie.Renderer.load(document.getElementById(canvasId));
    collie.Renderer.start();

    $(oLayer.getElement()).hammer({

    }).bind("drag", function (ev) {
        console.log(ev.position.x, ev.position.y);
        mouseDown = true;
        if (!htStartPosition) {
            htStartPosition = { x: ev.position.x, y: ev.position.y };
            htSelectedDisplayObjectPosition = { x: ev.position.x, y: ev.position.y };
        } else {
            htStartPosition = htSelectedDisplayObjectPosition;
            htSelectedDisplayObjectPosition = { x: ev.position.x, y: ev.position.y };
            if (obj.animationObjId) {
                if (htSelectedDisplayObjectPosition) {
                    obj.animationObj[obj.animationObjId].move(obj.animationObj[obj.animationObjId].get("x") + htSelectedDisplayObjectPosition.x - htStartPosition.x, obj.animationObj[obj.animationObjId].get("y") + htSelectedDisplayObjectPosition.y - htStartPosition.y)
                    console.log("Move ", obj.animationObj[obj.animationObjId].get("x") + htStartPosition.x - htSelectedDisplayObjectPosition.x, obj.animationObj[obj.animationObjId].get("y") + htStartPosition.y - htSelectedDisplayObjectPosition.y);

                }

            }
        }
    }).bind("release", function (ev) {
        mouseDown = false;
        obj.animationObjId = null;
        htStartPosition = null;
        htSelectedDisplayObjectPosition = null;
    });
    if (callback != null) {
        callback();
    }
    checkAnimation();
    return this;
}