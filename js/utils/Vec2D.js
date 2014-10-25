
var Vec2D = function(x,y) {
	this.x = x;
	this.y = y;
};


Vec2D.prototype.len = function() {
	return Math.sqrt( x*x + y*y );
};

Vec2D.prototype.lenSq = function() {
	return (x*x + y*y);
};