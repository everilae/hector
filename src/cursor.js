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
