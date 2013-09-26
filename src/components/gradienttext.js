Crafty.c("GradientText", {
    ready: true,
    init: function () {
        this.requires("2D, Canvas");

        this.bind("Draw", function (e) {
            this._draw(e.ctx, e.pos);
        });

        this.bind("EnterFrame", function (e) {
            if (! (e.frame % 8)) {
                this._color = (this._color + 1) % this._colors.length;
                this.trigger("Change");
            }
        });

        this._color = 0;
        this._colors = [5, 13, 7, 15, 1, 1, 15, 14, 3, 6];
    },
    _draw: function (ctx, pos) {
        var color  = this._color,
            cCount = this._colors.length,
            y      = pos._y,
            maxY   = pos._y + pos._h - pos._h % 4,
            x      = pos._x,
            w      = pos._w;

        while (y < maxY) {
            ctx.fillStyle = getColor(this._colors[color ++ % cCount]);
            ctx.fillRect(x, y, w, 4);
            y += 4;
        }

        ctx.drawImage(Crafty.asset("crackmask.png"), pos._x, pos._y);
    }
});
