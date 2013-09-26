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
