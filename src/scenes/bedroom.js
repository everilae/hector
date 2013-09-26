Crafty.scene("bedroom", function () {
    // Draw room
    Crafty.background(getColor(0));
    Crafty.e("2D, Canvas, Image").image("hector-room3.png").attr({x: 48, y: 48});

    // Create boundaries
    Crafty.e("Boundary").createBoundary({x: 0,   y: 0,   w: 640, h: 211});
    Crafty.e("Boundary").createBoundary({x: 0,   y: 0,   w: 100, h: 480});
    Crafty.e("Boundary").createBoundary({x: 540, y: 0,   w: 100, h: 480});
    Crafty.e("Boundary").createBoundary({x: 100, y: 210, w: 110, h: 174}, new Crafty.polygon([0, 0], [109, 0], [109, 1], [0, 96]));
    Crafty.e("Boundary").createBoundary({x: 430, y: 210, w: 110, h: 174}, new Crafty.polygon([0, 0], [109, 0], [109, 96], [0, 1]));
    // Move back on hitting the "4. wall"
    Crafty.e("2D, Collision").attr({x: 0,   y: 384, w: 640, h: 96})
        .collision()
        .onHit("Hector", function () {
            Crafty.scene("house");
        });

    Crafty.e("Amppa").attr({x: 300, y: 280}).setBoundary(new Crafty.polygon([210, 280], [430, 280], [430, 384], [210, 384]));
    // Create player
    Crafty.e("Hector").attr({x: 200, y: 281});

    console.setBgColor(null);
    console.setFgColor(1);
    console.clear();
    // Print prompt :)
    console.write("> ", 0, 23);
});
