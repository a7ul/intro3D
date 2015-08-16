'use strict';
/**
 * Created by atulr on 08/08/15.
 */

introJs.intro3d.addCharacter({
  name: 'boxguy',
  charJsonPath: 'assets/models/boxguy.json',
  charAnimeJsonPath: 'assets/models/boxguy.animations.json'
});

var lol = introJs().setOption('tooltipClass', 'customDefault').start();
introJs.intro3d.initialize(lol);
