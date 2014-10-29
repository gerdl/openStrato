// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////
//       class MyGraphicsSet extends GraphicsSet
// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////


MyGraphicsSet = function() {
    GraphicsSet.call(this);

    // load some graphics:
    sprites.add( new Sprite(0,0,1,1,"../Tilesets/gi/blueHexTiles.jpg") );
}
MyGraphicsSet.prototype = new GraphicsSet();


MyGraphicsSet.prototype.requestRenderer = function (identi) {
    if (identi == "Background1") return sprites[0];
    if (identi == "SmallSteeringJet") return sprites[1];
}
