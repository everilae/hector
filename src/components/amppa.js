Crafty.c("Amppa", {
    init: function () {
        this.requires("2D, DOM, amppa, SpriteAnimation, Item");
        this.w = 32;
        this.h = 16;

        this._moveChance = 0.02;
        this._changeDirChance = 0.1;
        // initial direction
        this.changeDir();

        this.animate("walk", [[0, 0], [32, 0], [64, 0], [96, 0]]);

        this.actions = {
            LOOK: function (actor) {
                actor.say("A tortoise. How exiting.");
            }
        };

        this.bind("EnterFrame", function (e) {
            this.frameHandler(e);
        });
    },

    _directions: [[0, 1], [0, -1], [1, 0], [-1, 0],
                  [1, 1], [-1, -1], [1, -1], [-1, 1]],

    frameHandler: function (e) {
        if (Math.random() < this._moveChance) {
            this.walk();
        }
    },

    walk: function () {
        if (!this.isPlaying("walk")) {
            this.playAnimation("walk", 128, -1);
        }

        if (this._direction[0] > 0) {
            this.flip("X");
        } else if (this._direction[0] < 0) {
            this.unflip("X");
        }

        if (this._boundary) {
            if (this._boundary.containsPoint(
                    this._x + this._direction[0],
                    this._y + this._direction[1]) &&
                this._boundary.containsPoint(
                    this._x + this._w + this._direction[0],
                    this._y + this._h + this._direction[1])) {
                this.x += this._direction[0];
                this.y += this._direction[1];
            }
        } else {
            // naive roaming
            this.x += this._direction[0];
            this.y += this._direction[1];
        }

        if (Math.random() < this._changeDirChance) {
            this.changeDir();
        }
    },

    changeDir: function () {
        this._direction = this._directions[Math.floor(Math.random() * 8)];
    },

    setBoundary: function (polygon) {
        this._boundary = polygon;
    }
});
