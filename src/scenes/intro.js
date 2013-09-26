Crafty.scene("intro", function () {
    Crafty.background(getColor(0));

    Crafty.audio.add("chipstep", ["chipstep.mp3", "chipstep.ogg", "chipstep.wav"]);
    Crafty.audio.play("chipstep", -1);

    Crafty.e("GradientText").attr({x: 0, y: 48, w: 640, h: 128});

    console.setBgColor(null);
    console.setFgColor(4);

    var sinLookup = [0, 1, 3, 4, 4, 4, 3, 2, 1, -1, -2, -3, -4, -4, -4, -3, -1],
        slLength = sinLookup.length,
        text = "Press space",
        xPos = 4, yPos = 11,
        enterFrameCallback;

    Crafty.bind("EnterFrame", enterFrameCallback = function (e) {
        var i, l;

        if (e.frame % 5 === 0) {
            // The easy way, since we do not have to worry about any other text
            // on screen
            console.clear();

            for (i = 0, l = text.length; i < l; i++) {
                console.put(text.charAt(i), (xPos + i) % 34, yPos + sinLookup[(xPos + i) % slLength]);
            }

            xPos = (xPos + 1) % 34;
        }
    });

    Crafty.bind("KeyDown", function keyDownCallback(e) {
        if (e.key === Crafty.keys.SPACE) {
            Crafty.unbind("KeyDown", keyDownCallback);
            Crafty.unbind("EnterFrame", enterFrameCallback);
            Crafty.scene("menu");
        }
    });
}, function () {
    Crafty.audio.stop();
});
