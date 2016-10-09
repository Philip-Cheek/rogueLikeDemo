var Game = function(canvasID, canvasHeight, canvasWidth){
	this.canvas = document.getElementById(canvasID);
	this.canvas.height = canvasHeight;
	this.canvas.width = canvasWidth;
	this.context = this.canvas.getContext('2d');
	this.camera = new Camera(canvasWidth/2, canvasHeight/2, 4);
	this.background = new Background('map');

	// this.circle = new Circle(canvasWidth/2, canvasHeight/2, 20, 6);
	// this.mouseX = 0;
	// this.mouseY = 0;
	
	this.referencePoint = {
		'x': canvasHeight * .7,
		'y': canvasWidth * .61
	}
	// this.speed = 2;
	// this.maxSpeed = 7;
}



Game.prototype.start = function(){
	var self = this;
	this.camera.listenForMouseMovement()
	this.camera.testKey();
	// this.listenForMouseMovement();
	// this.circle.draw(this.context);
	drawReferencePoint(self.context, this.referencePoint);
	function updateFrame(){
		setTimeout(function() {
			window.requestAnimFrame(updateFrame);

			var refOffset = self.camera.giveOffset(self.referencePoint);
			var mapOffset = self.camera.giveOffset(self.background.map)
			self.camera.move();
			self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
			self.background.draw(mapOffset, self.context)
			drawReferencePoint(self.context, refOffset);
			self.camera.adjust(self.context);
		}, 16.6);
	}

	updateFrame();
}

Game.prototype.listenForMouseMovement = function(){
	var self = this;

	document.addEventListener("mousemove", function(event){
		if (!self.mouseX || Math.abs(event.pageX - self.mouseX) > .3){
			self.mouseX = event.pageX;
		}
		if (!self.mouseY || Math.abs(event.pageY - self.mouseY) > .3){
			self.mouseY = event.pageY;
		}
	});
}

function drawReferencePoint(context, coord){
	context.fillStyle = 'rgb(213, 90, 100)'
	context.fillRect(coord.x, coord.y, 150, 100);
}

function getDistances(x2, y2, x1, y1){
	var yDistance = Math.abs(y2 - y1);
	var xDistance = Math.abs(x2 - x1);

	var distance = Math.sqrt(Math.pow(yDistance, 2) + Math.pow(xDistance, 2));
	return {'distance': distance, 'yDistance': yDistance, 'xDistance': xDistance}
}

function getOffset(){

}
function getAngle(distance, yDistance){
	if (distance == 0){
		return 0;
	}

	return Math.asin(yDistance/distance);
}