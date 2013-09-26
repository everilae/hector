Crafty.c("Hector", {
    init: function () {
        this.requires("2D, DOM, hector, Multiway, SpriteAnimation, Collision");

        this.w = 32;
        this.h = 80;

        this.multiway(2, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180});

        this.animate("walk_down", [[0, 0], [32, 0], [64, 0]]);
        this.animate("walk_right", [[96, 0], [128, 0], [160, 0]]);
        this.animate("walk_left", [[192, 0], [224, 0], [256, 0]]);
        this.animate("walk_up", [[288, 0], [320, 0], [352, 0]]);

        this.animFrames = 15;

        this.bind("NewDirection", function (e) {
            if (e.x || e.y) {
                if (e.y > 0 && ! this.isPlaying("walk_down")) {
                    this.playAnimation("walk_down", this.animFrames, -1);
                } else if (e.y < 0 && ! this.isPlaying("walk_up")) {
                    this.playAnimation("walk_up", this.animFrames, -1);
                } else if (e.x > 0 && ! this.isPlaying("walk_right")) {
                    this.playAnimation("walk_right", this.animFrames, -1);
                } else if (e.x < 0 && ! this.isPlaying("walk_left")) {
                    this.playAnimation("walk_left", this.animFrames, -1);
                }
            } else {
                this.pauseAnimation();
            }
        });

        this.collision()
            .onHit("Boundary", function (objs) {
                var i, l = objs.length;

                for (i = 0; i < l; i ++) {
                    this.x -= objs[i].normal.x * objs[i].overlap;
                    this.y -= objs[i].normal.y * objs[i].overlap;
                }
            });

        this.bind("consoleinput", function (cmdline) {
            this.runCommand(cmdline);
        });
    },
    actions: {
        HELP: "Try to 'look' at things.",
        DIE: {
            quips: [
                "2B||!2B.",
                "Too easy.",
                "What for?"
            ],
            toString: function () {
                return this.quips[Math.round(Math.random() * (this.quips.length - 1))];
            }
        }
    },
    runCommand: function (cmdline) {
        var i, l, cmd, args, actionCount = 0;
        var items = this.hit("Item");

        args = cmdline.split(/\s+/);
        cmd = args[0];
        args[0] = this;

        if (this.actions.hasOwnProperty(cmd)) {
            this.say(this.actions[cmd]);
            actionCount ++;
        }

        if (items !== false) {
            for (i = 0, l = items.length; i < l; i ++) {
                if (items[i].obj.hasAction(cmd)) {
                    items[i].obj.doAction(cmd, args);
                    actionCount ++;
                }
            }
        }

        if (actionCount === 0) {
            this.say("What? 'Help'?");
        }
    },
    say: function (message) {
        var i, y, diff = 0;

        if (typeof message !== 'string') {
            message = String(message);
        }

        if (this._lastMessage) {
            diff = this._lastMessage.length - message.length;
        }

        // if new message if shorter than last, pad with spaces
        if (diff > 0) {
            message += (new Array(diff + 1)).join(" ");
        }
        y = console.cursor.getY();
        console.put(message, 0, y - 2);

        this._lastMessage = message;
    }
});
