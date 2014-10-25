
function Vec2D(x,y) {

    this.x = x;
    this.y = y;
    
    if (x === undefined) this.x = 555;
};




Vec2D.prototype.len = function() {
	return Math.sqrt( x*x + y*y );
};

Vec2D.prototype.lenSq = function() {
	return (x*x + y*y);
};

Vec2D.prototype.say = function() {
    alert("Wuhu, I exist! and x is "+this.x);
    };


plong = new Vec2D(777,666);
pling = new Vec2D();
