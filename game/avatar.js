var Avatar = function(src, center){
	this.image = document.getElementById(src);
	this.offset = {
		'x': this.image.width/2,
		'y': this.image.height * .8,
	},
	this.center = center;
	this.position = {
		'x': center.x - this.offset.x,
		'y': center.y - this.offset.y,
	};

}

Avatar.prototype.draw = function(dist, context){
	var rotation = -(Math.atan2(dist.x, dist.y)) - 3.14159;
	context.save();
	context.translate(this.center.x, this.center.y)
	context.rotate(rotation);
	context.drawImage(this.image, -this.offset.x, -this.offset.y);
	context.restore();
}