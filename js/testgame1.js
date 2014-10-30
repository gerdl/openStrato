// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////
//                  class Testgame1 extends Game
// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////


function Testgame1() {
    Game.call(this);

    this.graphicsSet = new MyGraphicsSet();

    this.world       = new Testgame1map(1000,1000);
    this.flightView.setWorld( this.world );

    // player ship
    this.sim.pShip.pos.set(500,500);

    // cam:
    this.flightView.cam.cx = this.sim.pShip.pos.x;
    this.flightView.cam.cy = this.sim.pShip.pos.y;
    
};
Testgame1.prototype = new Game();


function Testgame1map(xd,yd) {
    WorldMap.call(this,xd,yd);
    }
