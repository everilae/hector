Crafty.c("Door", {
    ready: true,
    init: function () {
        this.requires("2D, Canvas, Item");
        this.bind("Draw", function (e) {
            this._draw(e.ctx, e.pos);
        });
        this.actions = {
            OPEN: function (actor) {
                actor.say("\"Why would I go there.\"");
            },
            LOOK: function (actor) {
                actor.say("It's a door.");
            }
        };
    },
    _draw: function (ctx, pos) {
        ctx.fillStyle = getColor(this._colors.door);
        ctx.fillRect(pos._x, pos._y, pos._w, pos._h);
        ctx.fillStyle = getColor(this._colors.knob);
        ctx.fillRect(pos._x + Math.floor(pos._w * 0.25), pos._y + Math.floor(pos._h * 0.5), 6, 6);
        ctx.strokeStyle = getColor(this._colors.frame);
        ctx.lineWidth = 2;
        ctx.strokeRect(pos._x + 1, pos._y + 1, pos._w - 2, pos._h - 2);
    },
    createDoor: function (attrs, colors, openAction) {
        colors = colors || {};

        if (openAction) {
            this.actions.OPEN = openAction;
        }

        this.attr(attrs);
        this._colors = {
            frame: typeof colors.frame === 'number' ? colors.frame : 9,
            door:  typeof colors.door  === 'number' ? colors.door  : 8,
            knob:  typeof colors.knob  === 'number' ? colors.knob  : 0
        };
        return this;
    }
});
