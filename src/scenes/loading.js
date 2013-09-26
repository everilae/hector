Crafty.scene("loading", function () {
    var loaded = false;

    console.write("Loading");
    Crafty.background(getColor(14));

    Crafty.load(
        [
            "hector.png",
            "rubikscube.png",
            "hector-room2.png",
            "hector-room3.png",
            "crackmask.png",
            "amppa.png"
        ],
        function () {
            Crafty.sprite("hector.png", {
                hector: [0, 0, 32, 80]
            });
            Crafty.sprite("rubikscube.png", {
                rubikscube: [0, 0, 16, 16]
            });
            Crafty.sprite("amppa.png", {
                    amppa: [0, 0, 32, 16]
            });
            loaded = true;
        }
    );

    Crafty.bind("EnterFrame", function enterFrameCallback(e) {
        Crafty.background(getColor(Math.floor(e.frame / 10) % 16));

        if (e.frame % 20 === 0) {
            console.write(".");
        }

        if (loaded && e.frame >= 400) {
            Crafty.unbind("EnterFrame", enterFrameCallback);
            Crafty.scene("intro");
        }
    });
});
