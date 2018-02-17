// https://jsfiddle.net/hrmsk248/159/

function woop()
{
var num = 300;
var image = [];
var gif = [];
var div = document.getElementById("whatever");
var func = function(gif){gif.play();};

for(var i=0; i<num; ++i)
{
  var div2 = document.createElement("div");
	image[i] = new Image();
  if(i<((num/100)*30))
  {
    image[i].src = "https://i.imgur.com/iEoMxuQ.gif";
    div2.speed = (5 + Math.round(Math.random())*10);
    div2.type = 10;
  }
  else
  {
    image[i].src = "https://omaniamnotgoodwith.computer/img/gaems/kommander/star2.gif";
    div2.speed = (5 + Math.round(Math.random())*5);
    div2.type = 5;
  }
  div2.id = "star" + i;
  div2.style.position = "absolute";
  div2.style.left = (window.innerWidth) + "px";
  var top = 5 + Math.round(Math.random()*(window.innerHeight-10));
  div2.style.top = top + "px";
  div2.appendChild(image[i]);
  div.appendChild(div2);
  gif[i] = new SuperGif({gif:image[i]});
  gif[i].load();
  gif[i].pause();
  var r = (400*i) + Math.round(Math.random()*1000);
	//console.log(r);
	window.setTimeout(func.bind(this,gif[i]), r);
}

var movefunc = function()
{
  for(var i=0; i<num; ++i)
  {
    var star = document.getElementById("star" + i);
    var left = star.style.left;

    var leftnum = parseInt(left.substring(0,left.length-2));

    leftnum -= star.speed;
    if(leftnum <= 5)
    {
      leftnum = window.innerWidth-10;
      var top = 5 + Math.round(Math.random()*(window.innerHeight-10));
      star.style.top = top + "px";
      star.speed = (5 + Math.round(Math.random()*star.type));
    }

    star.style.left = leftnum + "px";
  }
}

window.setInterval(movefunc, 20);

/*
var image = new Image();
image.src = "img/star.gif";

var div = document.getElementById("whatever");
div.appendChild(image);

var image2 = new Image();
image2.src = "img/star.gif";

div.appendChild(image2);

var giftest = new SuperGif({gif: image});
giftest.load();
//console.log(giftest.get_length());
giftest.move_to(2);
*/
}