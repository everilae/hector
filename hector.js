(function(){
    'use strict';

/******************************************************************************
 * Globals
 ******************************************************************************/

    var colors = [
        "000000",
        "FFFFFF",
        "68372B",
        "70A4B2",
        "6F3D86",
        "588D43",
        "352879",
        "B8C76F",
        "6F4F25",
        "433900",
        "9A6759",
        "444444",
        "6C6C6C",
        "9AD284",
        "6C5EB5",
        "959595"
    ];

    function getColor(index) {
        return "#" + (colors[index] || colors[0]);
    }

    /**
     * Simple 34x24 text cursor helper.
     */
    function Cursor() {
        this.position = 0;
    }

    Cursor.MAX_POS = 815;

    Cursor.prototype.inc = function (increment) {
        this.position = Math.min(this.position + (increment || 1), Cursor.MAX_POS);
    };

    Cursor.prototype.dec = function (decrement) {
        this.position = Math.max(this.position - (decrement || 1), 0);
    };

    Cursor.prototype.move = function (x, y) {
        // limit movements, does not wrap (would be possible)
        x = Math.min(Math.max(x, 0), 33);
        y = Math.min(Math.max(y, 0), 23);
        this.position = y * 34 + x;
    };

    Cursor.prototype.getX = function () {
        return this.position % 34;
    };

    Cursor.prototype.getY = function () {
        return Math.floor(this.position / 34);
    };

    /** Global console object */
    var console;

/******************************************************************************
 * Scenes
 ******************************************************************************/

    Crafty.scene("loading", function () {
        var loaded = false;

        console.write("Loading");
        Crafty.background(getColor(14));

        Crafty.load(
            [
                "hector.png",
                "rubikscube.png",
                "hector-room2.png",
                "hector-room3.png",
                "crackmask.png"
            ],
            function () {
                Crafty.sprite("hector.png", {
                    hector: [0, 0, 32, 80]
                });
                Crafty.sprite("rubikscube.png", {
                    rubikscube: [0, 0, 16, 16]
                });
                loaded = true;
            }
        );

        Crafty.bind("EnterFrame", function enterFrameCallback(e) {
            Crafty.background(getColor(Math.floor(e.frame / 10) % 16));

            if (e.frame % 20 === 0) {
                console.write(".");
            }

            if (loaded && e.frame >= 400) {
                Crafty.unbind("EnterFrame", enterFrameCallback);
                Crafty.scene("intro");
            }
        });
    });

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

    Crafty.scene("house", function () {
        var hector;

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
        hector = Crafty.e("Hector").attr({x: 200, y: 280});

        hector.bind("consoleinput", function (cmdline) {
            this.runCommand(cmdline);
        });

        console.setBgColor(null);
        console.setFgColor(1);
        console.clear();
        // Print prompt :)
        console.write("> ", 0, 23);
    });

    Crafty.scene("bedroom", function () {
        var hector;

        // Draw room
        Crafty.background(getColor(0));
        Crafty.e("2D, Canvas, Image").image("hector-room3.png").attr({x: 48, y: 48});

        // Create boundaries
        Crafty.e("Boundary").createBoundary({x: 0,   y: 0,   w: 640, h: 211});
        Crafty.e("Boundary").createBoundary({x: 0,   y: 384, w: 640, h: 96});
        Crafty.e("Boundary").createBoundary({x: 0,   y: 0,   w: 100, h: 480});
        Crafty.e("Boundary").createBoundary({x: 540, y: 0,   w: 100, h: 480});
        Crafty.e("Boundary").createBoundary({x: 100, y: 210, w: 110, h: 174}, new Crafty.polygon([0, 0], [109, 0], [109, 1], [0, 96]));
        Crafty.e("Boundary").createBoundary({x: 430, y: 210, w: 110, h: 174}, new Crafty.polygon([0, 0], [109, 0], [109, 96], [0, 1]));

        // Create player
        hector = Crafty.e("Hector").attr({x: 200, y: 280});
        hector.bind("consoleinput", function (cmdline) {
            hector.runCommand(cmdline);
        });

        console.setBgColor(null);
        console.setFgColor(1);
        console.clear();
        // Print prompt :)
        console.write("> ", 0, 23);
    });

    Crafty.scene("intro", function () {
        Crafty.background(getColor(0));

        Crafty.audio.add("chipstep", ["chipstep.mp3", "chipstep.ogg", "chipstep.wav"]);
        Crafty.audio.play("chipstep", -1);

        Crafty.e("GradientText").attr({x: 0, y: 48, w: 640, h: 128});

        console.setBgColor(null);
        console.setFgColor(4);

        var sinLookup = [0, 1, 3, 4, 4, 4, 3, 2, 1, -1, -2, -3, -4, -4, -4, -3, -1],
            slLength = sinLookup.length,
            text = "Press space",
            xPos = 4, yPos = 11,
            enterFrameCallback;

        Crafty.bind("EnterFrame", enterFrameCallback = function (e) {
            var i, l;

            if (e.frame % 5 === 0) {
                // The easy way, since we do not have to worry about any other text
                // on screen
                console.clear();

                for (i = 0, l = text.length; i < l; i++) {
                    console.put(text.charAt(i), (xPos + i) % 34, yPos + sinLookup[(xPos + i) % slLength]);
                }

                xPos = (xPos + 1) % 34;
            }
        });

        Crafty.bind("KeyDown", function keyDownCallback(e) {
            if (e.key === Crafty.keys.SPACE) {
                Crafty.unbind("KeyDown", keyDownCallback);
                Crafty.unbind("EnterFrame", enterFrameCallback);
                Crafty.scene("menu");
            }
        });
    }, function () {
        Crafty.audio.stop();
    });

/******************************************************************************
 * Components
 ******************************************************************************/

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
            this.mem = (new Array(34 * 24)).join(" ").split("");
            this.inputBuffer = [];

            this.attr(this.AREA);

            this.css({
                "word-wrap": "break-word",
                "white-space": "pre",
                "overflow": "hidden"
            });
            this.textFont({family: "'Press Start 2P', cursive", size: "16px/1"});
            this.textColor(getColor(typeof kwargs.color !== "undefined" ? kwargs.color : 14));

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

            this.bind("NewDirection", function (e) {
                if (e.x || e.y) {
                    if (e.y > 0 && ! this.isPlaying("walk_down")) {
                        this.playAnimation("walk_down", 10, -1);
                    } else if (e.y < 0 && ! this.isPlaying("walk_up")) {
                        this.playAnimation("walk_up", 10, -1);
                    } else if (e.x > 0 && ! this.isPlaying("walk_right")) {
                        this.playAnimation("walk_right", 10, -1);
                    } else if (e.x < 0 && ! this.isPlaying("walk_left")) {
                        this.playAnimation("walk_left", 10, -1);
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

    Crafty.c("Item", {
        init: function () {},
        hasAction: function (cmd) {
            return typeof this.actions[cmd] === "function";
        },
        doAction: function (action, args) {
            this.actions[action].apply(this, args);
        },
        actions: {} // override
    });

    Crafty.c("RubiksCube", {
        init: function () {
            this.requires("2D, DOM, rubikscube, Item");
            this.w = this.h = 16;
            this.attempts = 0;
            this.solved = false;
            this.actions = {
                SOLVE: function (actor) {
                    if (this.attempts < 10) {
                        actor.say("Hector has no skillz");
                    } else if (this.attempts < 100) {
                        actor.say("Hector has some skillz");
                    } else if (this.attempts < 1000) {
                        actor.say("Hector has mad skillz");
                    } else if (this.attempts >= 1000) {
                        this.solved = true;
                        actor.say("Done.");
                    }

                    this.attempts++;
                },
                LOOK: function (actor) {
                    if (this.solved) {
                        actor.say("A solved Rubik's Cube");
                    } else {
                        actor.say("An unsolved Rubik's Cube");
                    }
                }
            };
        }
    });

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

/******************************************************************************
 * Init
 ******************************************************************************/

    Crafty.init(640, 480);
    // Create text console (requires Crafty.stage)
    console = Crafty.e("TextConsole").createConsole();
    Crafty.scene("loading");
}());
