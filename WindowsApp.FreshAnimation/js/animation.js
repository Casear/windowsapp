
function AnimationObjectManager(_canvasId, _projectId, callback) {
    var projectId = _projectId;
    var canvasId = _canvasId;
    var animationName = null;
    var drag = true;
    var startRec = false;
    var startPlay = false;
    var animationO;
    this.Frame = 0;
    this.animationObjId = null;
    this.animationObj = {};
    var timePlay = true;
    this.animationFrame = {};
    this.images = [];
    this.images.push({ title: "sky", url: "/animation/pi/sky.png" });
    this.images.push({ title: "sea", url: "/animation/pi/sea.png" });
    this.images.push({ title: "ground", url: "/animation/pi/ground.png" });
    this.images.push({ title: "man", url: "/animation/pi/man.png" });
    this.images.push({ title: "leaf", url: "/animation/pi/leaf.png" });
    var _folder = Windows.Storage.ApplicationData.current.localFolder;
    _folder.createFolderAsync("projects\\" + projectId + "\\slide", Windows.Storage.CreationCollisionOption.openIfExists);
    var time = $('.film').offset({ left: 1300 });
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
    var htTimeStartPosition = null;
    var htTimeSelectedDisplayObjectPosition = null;
    var count = 0;


    this.images.forEach(function (file) {
        collie.ImageManager.addImage(file.title, file.url);
    });
    var obj = this;
    var playFrame = 0;
    var playindex = 0;

    this.play = function () {
        startPlay = true;
        var time = $('.film').offset({ left: 1300 });
        obj.Frame = 0;

        this.animationObj["man"].move(1000,200 );
        this.animationObj["man"].set("angle", 0);
        this.animationObj["leaf"] .move( 1200, 200 );
        this.animationObj["leaf"].set("angle", 0);
    }
    var lastCalledTime;
    var fps;
    this.closeDragEvent = function () {

        drag = false;

    }
    this.openDragEvent = function () {

        drag = true;

    }
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
        if (startRec && timePlay) {
            var position = time.position();
            time.offset({ left: position.left - 2 });
            if (obj.animationObjId) {
                if (!obj.animationFrame[obj.Frame])
                    obj.animationFrame[obj.Frame] = {};
                var x = 0, y = 0, v = 0;
                var ox = 0, oy = 0, ov = 0;
                if (mouseDown && htSelectedDisplayObjectPosition) {
                    x = obj.animationObj[obj.animationObjId].get("x") + htSelectedDisplayObjectPosition.x - htStartPosition.x;
                    y = obj.animationObj[obj.animationObjId].get("y") + htSelectedDisplayObjectPosition.y - htStartPosition.y;
                    if (!obj.animationFrame[obj.Frame][obj.animationObjId]) {
                        obj.animationFrame[obj.Frame][obj.animationObjId] = {};
                    }
                    obj.animationFrame[obj.Frame][obj.animationObjId].x = x;
                    obj.animationFrame[obj.Frame][obj.animationObjId].y = y;
                }
                if (!drag) {
                    if (!obj.animationFrame[obj.Frame][obj.animationObjId]) {
                        obj.animationFrame[obj.Frame][obj.animationObjId] = {};
                    }
                    v = obj.animationObj[obj.animationObjId].get("angle");
                    obj.animationFrame[obj.Frame][obj.animationObjId].v = v;
                }
                //if (obj.animationFrame[obj.Frame][obj.animationObjId]) {

                //}

            }
            if (obj.Frame % 40 == 0) {
                var image = oLayer.getElement().toDataURL();

                var worker = new Worker("/js/imageGenerator.js");
                worker.postMessage({
                    frame: obj.Frame, content: image.replace(/^data:image\/(png|jpg);base64,/, ""), projectId: projectId
                });
            }

        }
        if (timePlay) {

            if (this.animationFrame[obj.Frame]) {
                for (var node in obj.animationFrame[obj.Frame]) {
                    var x = obj.animationObj[node].get("x");
                    var y = obj.animationObj[node].get("y");
                    if (obj.animationFrame[obj.Frame][node].x)
                        x = obj.animationFrame[obj.Frame][node].x;
                    if (obj.animationFrame[obj.Frame][node].y)
                        y = obj.animationFrame[obj.Frame][node].y;
                    obj.animationObj[node].move(x, y);
                    if (obj.animationFrame[obj.Frame][node].v)
                        obj.animationObj[node].set("angle", obj.animationFrame[obj.Frame][node].v);

                };
            }
            obj.Frame++;
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
        if (id) {
            if (obj.animationObj[id]) {
                obj.animationObjId = id;
            } else {


            }
        } else {
            obj.animationObjId = null;
        }
    }
    this.setAngle = function (angle) {
        if (obj.animationObjId) {

            obj.animationObj[obj.animationObjId].set("angle", angle);
        }
    }

    this.setImage = function (title) {
        if (!this.animationObj[title]) {
            this.animationObj[title] = new collie.MovableObject({ backgroundImage: title });
            this.animationObj[title].addTo(oLayer);
        }
    }

    collie.Renderer.addLayer(oLayer);
    collie.Renderer.load(document.getElementById(canvasId));
    collie.Renderer.start();
    this.animationObj["sky"] = new collie.MovableObject({ backgroundImage: "sky" });
    this.animationObj["sky"].addTo(oLayer);
    this.animationObj["sea"] = new collie.MovableObject({ backgroundImage: "sea" ,y:300});
    this.animationObj["sea"].addTo(oLayer);
    this.animationObj["ground"] = new collie.MovableObject({ backgroundImage: "ground" ,y:500});
    this.animationObj["ground"].addTo(oLayer);
    this.animationObj["man"] = new collie.MovableObject({ backgroundImage: "man" ,x:1000,y:200 });
    this.animationObj["man"].addTo(oLayer);
    this.animationObj["leaf"] = new collie.MovableObject({ backgroundImage: "leaf", x: 1200, y: 200 });
    this.animationObj["leaf"].addTo(oLayer);
    time.hammer({
        swipe_time: 2000
    }).bind("hold", function (ev) {
        timePlay = false;
        console.log("touch");
    }).bind("drag", function (ev) {

        if (!htTimeStartPosition) {
            htTimeStartPosition = { x: ev.position.x, y: ev.position.y };
            htTimeSelectedDisplayObjectPosition = { x: ev.position.x, y: ev.position.y };
        } else {
            htTimeStartPosition = htTimeSelectedDisplayObjectPosition;
            htTimeSelectedDisplayObjectPosition = { x: ev.position.x, y: ev.position.y };

            if (htTimeSelectedDisplayObjectPosition) {
                var off = time.offset();
                var percent = obj.Frame / (1300 - off.left);
                obj.Frame -= Math.floor((htTimeSelectedDisplayObjectPosition.x - htTimeStartPosition.x));
                time.offset({ left: off.left + htTimeSelectedDisplayObjectPosition.x - htTimeStartPosition.x });
            }

        }
    })

        .bind("release", function (ev) {
            timePlay = true;
            htTimeStartPosition = null;
            htTimeSelectedDisplayObjectPosition = null;
        });

    $(oLayer.getElement()).hammer({

    }).bind("drag", function (ev) {
        if (drag) {
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

                    }
                }
            }
        }
    }).bind("release", function (ev) {
        mouseDown = false;

        htStartPosition = null;
        htSelectedDisplayObjectPosition = null;
    });
    if (callback != null) {
        callback();
    }
    checkAnimation();
    return this;

}