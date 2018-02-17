// https://jsfiddle.net/hrmsk248/165/

var stars;
var ctx;
var num = 300;
var starbigimg;
var starsmallimg;

function woop()
{
	stars = [];
	var div = document.getElementById("whatever");
	//console.log(div);
	//var func = function(gif){gif.play();};
	
	var c = document.getElementById("myCanvas");
	ctx = c.getContext("2d");
	c.width = c.clientWidth;
	c.height = c.clientHeight;
	ctx.width = c.clientWidth;
	ctx.height = c.clientHeight;

	starbigimg = new Image();
	starbigimg.loaded = false;
	starbigimg.onload = function(){
		getGIFData(starbigimg);
		starbigimg.loaded = true;
	}
	starbigimg.src = "img/star.gif";

	starsmallimg = new Image();
	starsmallimg.loaded = false;
	starsmallimg.onload = function(){
		getGIFData(starsmallimg);
		starsmallimg.loaded = true;
	}
	starsmallimg.src = "img/star2.gif";
	
	window.setTimeout(loadStars, 1000);

}

function loadStars()
{

	for(var i=0; i<num; ++i)
	{
		var star = {};
		if(i<((num/100)*30))
		{
			star.mult = 10;
			star.type = "big";
			star.img = starbigimg;
		}
		else
		{
			star.mult = 5;
			star.type = "small";
			star.img = starsmallimg;
		}
		star.speed = (5 + Math.round(Math.random())*star.mult);
  
		star.id = i;
		star.frame = Math.round(Math.random()*(star.img.gif.length-1));
		star.left = 5 + Math.round(Math.random()*(ctx.width-10));
		star.top = 5 + Math.round(Math.random()*(ctx.height-10));
  
		stars.push(star);
	}
  
	window.requestAnimationFrame(update);

}

function update()
{
	//console.log(stars[0].img);
	
	ctx.fillRect(0,0,ctx.width,ctx.height);
	
	stars.forEach(function(star, i)
	{
		star.left -= star.speed;
		
		if(star.left <= 5)
		{
			star.left = ctx.width - 5;
			star.top = 5 + Math.round(Math.random()*(ctx.height-10));
			star.speed = (5 + Math.round(Math.random())*star.mult);
			star.frame = Math.round(Math.random()*(star.img.gif.length-1));
		}
		
		star.img.gif.drawFrame(ctx, star.frame, star.left, star.top);
		
		if(++star.frame >= star.img.gif.length)
		{
			star.frame = 0;
		}
	});
	
	window.requestAnimationFrame(update);

}

//window.setInterval(movefunc, 20);

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