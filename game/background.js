var Background = function(src){
	this.image = document.getElementById(src);
	this.map = {
		'x': 0,
		'y': 0
	}
}

Background.prototype.draw = function(coord, context){
	context.drawImage(this.image, coord.x, coord.y);
}