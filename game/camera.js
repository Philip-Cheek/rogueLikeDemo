var Camera = function(centerX, centerY, maxSpeed){
	this.center = {
		'x': centerX,
		'y': centerY
	},

	this.map = {
		'x': -600,
		'y': -2000
	}


	this.mouse = {
		'x': 0,
		'y': 0
	}

	this.speed = .36;
	this.maxSpeed = maxSpeed;
	this.avatar = new Avatar('avatar', this.center)
};

Camera.prototype.adjust = function(context){
	this.avatar.draw({
		'x': this.mouse.x - this.center.x,
		'y': this.mouse.y - this.center.y
	}, context)
};

Camera.prototype.testKey = function(){
	var self = this;

	document.addEventListener('keydown', function(e){
		console.log('work');
		console.log(e.keyCode)
		if (e.keyCode == 83){
			console.log('down')
			self.map.y -= 3;
		}else if (e.keyCode == 87){
			console.log('up')
			self.map.y += 3;
		}

	});
}

Camera.prototype.giveOffset = function(coord){
	var offX = this.map.x - this.center.x;
	var offY = this.map.y - this.center.y;
	return {
		'x': coord.x + offX,
		'y': coord.y + offY
	}
}

Camera.prototype.move = function(){
	var mouse = this.mouse;
	var center = this.center;
	var d = getDistances(mouse.x, mouse.y, center.x, center.y);

	if (d.distance > 1){
		var angle = getAngle(d.distance, d.yDistance);
		var percent = 1;

		if (d.distance <= 400){
			percent = d.distance/400
		}

		this.speed = this.maxSpeed * percent;

		var xVelocity = this.speed * Math.cos(angle);
		var yVelocity = this.speed * Math.sin(angle);

		if (mouse.x > center.x){
			xVelocity *= -1;
		}

		if (mouse.y > center.y){
			yVelocity  *= -1
		}

		console.log(xVelocity, yVelocity);
		this.map.x += xVelocity;
		this.map.y += yVelocity;
	}
};


Camera.prototype.listenForMouseMovement = function(){
	var self = this;

	document.addEventListener("mousemove", function(event){
		self.mouse.x = event.pageX;
		self.mouse.y = event.pageY;
	});
};

// Camera.prototype.giveOffset = function(){
// 	return {
// 		'x': this.map.x - this.center.x;
// 		'y': this.map.y - this.center.y;
// 	}
// }

// function getDistances(x2, y2, x1, y1){
// 	var yDistance = Math.abs(y2 - y1);
// 	var xDistance = Math.abs(x2 - x1);

// 	var distance = Math.sqrt(Math.pow(yDistance, 2) + Math.pow(xDistance, 2));
// 	return {'distance': distance, 'yDistance': yDistance, 'xDistance': xDistance}
// }

// function getAngle(distance, yDistance){
// 	if (distance == 0){
// 		return 0;
// 	}

// 	return Math.asin(yDistance/distance);
// }