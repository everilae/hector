(function () {
    var canvas = document.createElement('canvas');

    if (! canvas.getContext) {
        return;
    }

    function randomRange(from, to) {
        return Math.floor(Math.random() * (to - from) + from);
    }

    canvas.width = 50;
    canvas.height = 50;

    var ctx = canvas.getContext('2d');
    var x, y, r, g, b, o = 0.03;

    for (x = 0; x < canvas.width; x++) {
        for (y = 0; y < canvas.height; y++) {
            r = g = b = randomRange(0, 256);
            ctx.fillStyle = 'rgba(' + [r, g, b, o].join(',') + ')';
            ctx.fillRect(x, y, 1, 1);
        }
    }

    var dataUrl = 'url(' + canvas.toDataURL('image/png') + ')';

    var style = document.createElement('style');
    style.type = 'text/css';
    document.head.appendChild(style);

    var cssText = '.noise{background-image:' + dataUrl + '}';

    if (style.styleSheet) {
        // IE <3
        style.styleSheet.cssText = cssText;
    } else {
        style.appendChild(document.createTextNode(cssText));
    }

    document.body.classList.add('noise');

    Array.prototype.forEach.call(document.body.getElementsByTagName('header'),
        function (element) {
            element.classList.add('noise');
        }
    );

    Array.prototype.forEach.call(document.body.getElementsByTagName('footer'),
        function (element) {
            element.classList.add('noise');
        }
    );
}());
