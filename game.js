var Game = function(canvasID, canvasHeight, canvasWidth){
	this.canvas = document.getElementById(canvasID);
	this.canvas.height = canvasHeight;
	this.canvas.width = canvasWidth;
	this.context = this.canvas.getContext('2d');
	this.circle = new Circle(100, 100, 20, 6);
	this.mouseX = 0
	this.mouseY = 0
}

Game.prototype.start = function(){
	var self = this;

	this.listenForMouseMovement();
	this.circle.draw(this.context);

	function updateFrame(){
		setTimeout(function() {
			self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
			window.requestAnimFrame(updateFrame);
			self.circle.move(self.mouseX, self.mouseY);
			self.circle.draw(self.context);
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
