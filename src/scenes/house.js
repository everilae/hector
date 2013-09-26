Crafty.scene("house", function () {
    // Draw room
    Crafty.background(getColor(0));
    Crafty.e("2D, Canvas, Image").image("hector-room2.png").attr({x: 48, y: 48});
    Crafty.e("Table").attr({x: 300, y: 300});
    Crafty.e("RubiksCube").attr({x: 320, y: 290});
    Crafty.e("Door").createDoor({x: 528, y: 132, w: 64, h: 200}, null, function (actor) {
        Crafty.scene("bedroom");
    });

    // Create boundaries
    Crafty.e("Boundary").createBoundary({x: 0, y: 0,   w: 640, h: 280}, new Crafty.polygon([0, 0], [639, 0], [639, 245], [439, 279], [300, 279], [0, 255]));
    Crafty.e("Boundary").createBoundary({x: 0, y: 384, w: 640, h: 96});
    Crafty.e("Boundary").createBoundary({x: 0, y: 0,   w: 48,  h: 480});
    Crafty.e("Boundary").createBoundary({x: 592, y: 0, w: 48,  h: 480});

    // Create player
    Crafty.e("Hector").attr({x: 200, y: 280});

    console.setBgColor(null);
    console.setFgColor(1);
    console.clear();
    // Print prompt :)
    console.write("> ", 0, 23);
});
