function getGIFData(img)
{
    var stream;
    var handler = {};
    img.gif = [];
    img.gif.img = img;

    img.gif.drawFrame = function(ctx, count, left, top)
    {
      if(!count) count = 0;

      var ct = this[count].lctFlag ? this[count].lct : this.hdr.gct;
      var cData = ctx.createImageData(img.width, img.height);

      this[count].pixels.forEach(function(pixel, i) {
       if (this.transparency !== pixel) { // This includes null, if no transparency was defined.
          cData.data[i * 4 + 0] = ct[pixel][0];
          cData.data[i * 4 + 1] = ct[pixel][1];
          cData.data[i * 4 + 2] = ct[pixel][2];
          cData.data[i * 4 + 3] = 255; // Opaque.
        } else {
	 if(this.disposalMethod == 2 || this.disposalMethod == 3){
                 cData.data[i * 4 + 3] = 0; // Transparent.
	    }
          }
        });

      if(!left) left = 0;
      if(!top) top = 0;

      ctx.putImageData(cData, left, top);
    }

    handler.img = function(image) {
      img.gif.push(image);
    };
    handler.hdr = function(header){
      img.gif.hdr = header;
    };
    handler.gce = function(gce){
      img.gif.transparency = gce.transparencyGiven ? gce.transparencyIndex : null;
      img.gif.delay = gce.delayTime;
      img.gif.disposalMethod = gce.disposalMethod;
    };
    
    var doParse = function() {
        try {
          parseGIF(stream, handler);
        } catch(err) {
          console.log('parse error');
        }
    };

    var doGet = function(gif) {
      var h = new XMLHttpRequest();
      h.overrideMimeType('text/plain; charset=x-user-defined');
      h.onload = function(e) {
        //doLoadProgress(e);
        // TODO: In IE, might be able to use h.responseBody instead of overrideMimeType.
        stream = new Stream(h.responseText);
        setTimeout(doParse, 0);
      };
      h.onerror = function() { console.log('xhr error'); };
      h.open('GET', gif.src, true);
      h.send();
    };
    
    doGet(img);
}