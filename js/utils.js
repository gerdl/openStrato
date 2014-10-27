
// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////
//                  Vec2D Class
// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////


function Vec2D(x,y) {

    this.x = x;
    this.y = y;
    
    if (x === undefined) this.x = 555;
};


Vec2D.prototype.set = function(x,y) {
    this.x = x;
    this.y = y;
}

Vec2D.prototype.len = function() {
	return Math.sqrt( x*x + y*y );
};

Vec2D.prototype.lenSq = function() {
	return (x*x + y*y);
};


