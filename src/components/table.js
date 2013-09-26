Crafty.c("Table", {
    /* ready has to be true, or drawing will not happen */
    ready: true,
    init: function () {
        this.requires("2D, Canvas");
        this.attr({w: 160, h: 56});
        this.bind("Draw", function (e) {
            this._draw(e.ctx, e.pos);
        });
    },
    _draw: function (ctx, pos) {
        var x = pos._x, y = pos._y, w = pos._w, h = pos._h;

        ctx.fillStyle = getColor(10);
        ctx.fillRect(x, y, w, 16);
        ctx.fillStyle = getColor(2);
        ctx.fillRect(x + 16,  y + 16, 8, 40);
        ctx.fillRect(x + 136, y + 16, 8, 40);
        ctx.fillRect(x + 32,  y + 16, 6, 28);
        ctx.fillRect(x + 122, y + 16, 6, 28);
    }
});
