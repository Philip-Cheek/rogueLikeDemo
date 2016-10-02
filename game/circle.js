var Circle = function(x, y, radius, maxSpeed){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.speed = 2;
	this.maxSpeed = maxSpeed;
}

Circle.prototype.draw = function(context){
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
	context.stroke();
}

Circle.prototype.move = function(mouseX, mouseY){
	var d = getDistances(mouseX, mouseY, this.x, this.y);
	if (d.distance > 1){
		var angle = getAngle(d.distance, d.yDistance);
		var percent = 1;

		if (d.distance <= 400){
			percent = d.distance/400
		}

		this.speed = this.maxSpeed * percent;

		var xVelocity = this.speed * Math.cos(angle);
		var yVelocity = this.speed * Math.sin(angle);

		if (mouseX < this.x){
			xVelocity *= -1;
		}

		if (mouseY < this.y){
			yVelocity  *= -1
		}

		this.x += xVelocity;
		this.y += yVelocity;
	}
}

function getDistances(x2, y2, x1, y1){
	var yDistance = Math.abs(y2 - y1);
	var xDistance = Math.abs(x2 - x1);

	var distance = Math.sqrt(Math.pow(yDistance, 2) + Math.pow(xDistance, 2));
	return {'distance': distance, 'yDistance': yDistance, 'xDistance': xDistance}
}

function getAngle(distance, yDistance){
	if (distance == 0){
		return 0;
	}

	return Math.asin(yDistance/distance);
}


