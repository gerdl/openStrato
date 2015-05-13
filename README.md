Welcome to the openStrato wiki!


The Game itself
=================

This should become the remake of the 1998 PC game "Stratosphere: Conquest of the Skies" that was neat but buggy, a great idea though and good fun to play. Gerd is developing this game to procrastinate his thesis!
openStrato will be a 2D or 2.5D, top-down view, design, build and fly your spaceship game.

Some links:
* wikipedia: http://en.wikipedia.org/wiki/Stratosphere:_Conquest_of_the_Skies
* buy: http://www.mobygames.com/game/windows/stratosphere-conquest-of-the-skies


I found some (quite scary) videos of the old PC Game stratoshere that should be remade here:
* https://www.youtube.com/watch?v=dHqRnfv1aTU
* https://www.youtube.com/watch?v=QGoGlueuNQU

## Game Principle

For the game principle, it might be nice to mix in some Magic Carpet / Magic Carpet 2 like gameplay: Fly around, hunt down some smaller monsters, scavenge their resources, build a larger flying fortress, kill those evil other overlord monsters, scavenge more resource, even larger fortress, kill those lord-of-the-current-world-other-fortresses!


Graphics Implementation
========================

I'd first like to make a 2.5-D version with sprites only, looking from above with parallax scrolling background.
Later, if it's running nicely and somebody is interested we could still do a full-3d version or use different renderers.

Graphics could be used from free space shooter tile sets, maybe also from the open source "Total Annihilation" remakes that use the Spring engine.

Platform
==========

I'm really puzzled at the moment, which platform to use. Probably it'll be javascript using WebGL rendering.

Other options would be:
* standard Java, which would make it simple to run on a desktop as well as on Android, maybe using AndEngine (http://www.andengine.org/)
* JavaScript using fancy WebGL, could just be running in a browser - PhoneGap would allow to have it run as a smartphone app.
* Or GWT using GwtGL which would allow to write java code that is compiled down to javascript
* Dart (www.dartlang.org) - compiles to javascript, also for web apps.

3rd Party Libraries
====================

* glMatrix seems to be a fast and efficient js matrix/vector implementation:
  ( https://github.com/toji/gl-matrix )
  ( http://glmatrix.net/ )
  by Brandon Jones

