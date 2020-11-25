var term = $('body').terminal($.noop, {
    onInit: function() {
        this.echo('Upload image using Drag and Drop');
    }
}).on('dragover', function() {
    return false;
}).on('drop', function(e) {
    e.preventDefault();
    try {
        var org = e.originalEvent;
        var files = (org.dataTransfer.files || org.target.files);
        [].forEach.call(files, function(file) {
            var img = new Image();
            img.onload = function() {
                var canvas = $('<canvas/>');
                var context = canvas[0].getContext('2d');
                canvas.attr({
                    width: img.width,
                    height: img.height
                });
                term.echo(function() {
                    var cols = term.cols();
                    var width = img.width > cols ? cols : img.width;
                    var height = width * img.height / img.width;
                    // height / 2 because dimension of single character is not square
                    context.drawImage(img, 0, 0, width, height / 2);
                    try {
                        return asciify(context, " `~:*iVOEM", width, height / 2);
                    } catch (e) {
                        term.exception(e);
                        return '';
                    }
                });
            };
            img.src = URL.createObjectURL(file);

        });
    } catch(e) {
        term.exception(e);
    }
});
function color(r, g, b) {
    for (var i = 0; i<arguments.length; ++i) {
        arguments[i] = arguments[i].toString(16);
        if (arguments[i].length == 1) {
            arguments[i] = '0' + arguments[i];
        }
    }
    return [].join.call(arguments, '');
}

// taken form https://bitbucket.org/grumdrig/asciicam added color
function asciify(ctx, palette, width, height) {
  var ascii = "";
  var pixels = ctx.getImageData(0, 0, width, height);
  for (var y = 0; y < height-1; ++y) {
    for (var x = 0; x < width-1; ++x) {
      var p = 4 * (x + pixels.width * y);
      var r = pixels.data[p++];
      var g = pixels.data[p++];
      var b = pixels.data[p++];
      var v = Math.max(r, g, b) / 255;
      //v = 1 - Math.pow(v, GAMMA);
      v = (v * palette.length) >> 0;
      v = Math.max(0, Math.min(palette.length - 1, v));
      ascii += '[[;#' + color(r, g, b) + ';]' + palette[v] + ']';
    }
    if (y < height-1)
      ascii += '\n';
  }
  return ascii;
}