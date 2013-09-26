/**
 * 34x24 text console (kind of).
 */
Crafty.c("TextConsole", {
    init: function () {
        this.requires("2D, DOM, Text, Keyboard, Persist");
    },

    createConsole: function (kwargs) {
        kwargs = kwargs || {};

        this.isDirty = false;
        this.cursor = new Cursor();
        // Generates an array of 34 * 24 spaces
        this.mem = (new Array(34 * 24 + 1)).join(" ").split("");
        this.inputBuffer = [];

        this.attr(this.AREA);

        this.css({
            "word-wrap": "break-word",
            "white-space": "pre",
            "overflow": "hidden"
        });
        this.textFont({family: "'Press Start 2P', cursive", size: "16px/1"});
        this.textColor(getColor(typeof kwargs.color !== "undefined" ? kwargs.color : 14));

        this.unselectable();

        this.bind("EnterFrame", this.frameHandler);
        // Handle input too! :D
        this.bind("KeyDown", this.keyHandler);

        if (! kwargs.hideBackground) {
            this.css({"background-color": getColor(typeof kwargs.bgColor !== "undefined" ? kwargs.bgColor : 6)});
        }

        return this;
    },

    AREA: {w: 544, h: 384, x: 48, y: 48},

    frameHandler: function (e) {
        if (this.isDirty) {
            this.drawText();
        }
    },

    input: function (char) {
        if (this.cursor.position < Cursor.MAX_POS) {
            this.write(char);
            this.inputBuffer.push(char);
        }
    },

    keyHandler: function (e) {
        var i, l;

        if (Crafty.keys.A <= e.key && e.key <= Crafty.keys.Z) {
            this.input(String.fromCharCode(e.key));

        } else if (e.key === Crafty.keys.SPACE) {
            this.input(" ");

        } else if (e.key === Crafty.keys.ENTER) {
            if (this.inputBuffer.length) {
                this.cursor.dec(this.inputBuffer.length);
            }

            for (
                i = 0, l = this.inputBuffer.length;
                i < l;
                i ++
            ) {
                this.mem[this.cursor.position + i] = " ";
            }

            this.isDirty = true;
            Crafty.trigger("consoleinput", this.inputBuffer.join(""));
            this.inputBuffer = [];

        } else if (e.key === Crafty.keys.BACKSPACE) {
            // Backspace requires isDown
            // Slow down backspace detection, it's crude, but sort of works
            this.backspace();
        }
    },

    backspace: function () {
        if (typeof this.inputBuffer.pop() !== "undefined") {
            this.cursor.dec();
            this.mem[this.cursor.position] = " ";
            this.isDirty = true;
        }

        setTimeout((function () {
            if (this.isDown("BACKSPACE")) {
                this.backspace();
            }
        }).bind(this), 100);
    },

    setFgColor: function (index) {
        this.textColor(getColor(index));
    },

    setBgColor: function (index) {
        if (index === null) {
            this.css({"background-color": "transparent"});
        } else {
            this.css({"background-color": getColor(index)});
        }
    },

    drawText: function () {
        var y, buf = [];

        for (y = 0; y < 24; y ++) {
            buf.push(this.mem.slice(y * 34, y * 34 + 34).join(""));
        }

        this.text(buf.join("\n"));
        this.isDirty = false;
    },

    write: function (data, x, y) {
        var i, len, pos;

        data = data.toUpperCase();
        len = data.length;
        // move cursor, if x and y given
        if (typeof x === 'number' && typeof y === 'number') {
            this.cursor.move(x, y);
        }
        // write
        pos = this.cursor.position;

        // fix overflow
        if (pos + len > Cursor.MAX_POS) {
            data = data.slice(0, Cursor.MAX_POS - (pos + len));
            len = data.length;
        }

        for (i = 0; i < len; i ++) {
            this.mem[pos + i] = data.charAt(i);
        }

        this.isDirty = true;
        this.cursor.inc(len);
    },

    clear: function () {
        var i, mem = this.mem, l = mem.length;

        for (i = 0; i < l; i ++) {
            mem[i] = " ";
        }

        this.isDirty = true;
        this.inputBuffer = [];
        this.cursor.move(0, 0);
    },

    /**
     * Like write, but does not move cursor.
     */
    put: function (data, x, y) {
        var oldPos = this.cursor.position;
        this.write(data, x, y);
        this.cursor.position = oldPos;
    }
});
