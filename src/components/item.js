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
