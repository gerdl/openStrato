// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////
//       class MyGraphicsSet extends GraphicsSet
// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////


MyGraphicsSet = function() {
    GraphicsSet.call(this);

    // load some graphics:
    assert( this.sprites.length == 0 );
    this.sprites.push( new Sprite(0,0,1,1,"test1Graphics/blueHexTiles.jpg") );
    this.sprites.push( new Sprite(0,0,1,1,"test1Graphics/Mother2.bmp") );
}
MyGraphicsSet.prototype = new GraphicsSet();


MyGraphicsSet.prototype.requestRenderer = function (identi) {
    if (identi == "Background1") return sprites[0];
    if (identi == "SmallSteeringJet") return sprites[1];
}
