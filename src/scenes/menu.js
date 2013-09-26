Crafty.scene("menu", function () {
    // Screen reset, set text mode first
    console.setBgColor(6);
    console.setFgColor(14);
    console.clear();
    Crafty.background(getColor(14));

    console.write("*** Hector's House ***", 6, 1);
    console.write("Press space to play.", 7, 3);

    Crafty.bind("KeyDown", function keyDownCallback(e) {
        if (e.key === Crafty.keys.SPACE) {
            Crafty.unbind("KeyDown", keyDownCallback);
            Crafty.scene("house");
        }
    });
});
