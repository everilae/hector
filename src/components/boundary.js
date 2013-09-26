Crafty.c("Boundary", {
    init: function () {
        this.requires("2D");
    },
    createBoundary: function (attrs, polygon) {
        this.attr(attrs);
        this.addComponent("Collision");
        //this.addComponent("WiredHitBox");
        this.collision(polygon);
        return this;
    }
});
