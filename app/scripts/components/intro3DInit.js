/**
 * Created by atulr on 17/08/15.
 */
(function () {
  'use strict';
  var intro3d = window.introJs.intro3d || {};

  intro3d.initialize = function (introJSLiveInstance) {
    intro3d.domManipulator.init3dDom();
    intro3d.init3DCharacter('.tooltip-3d-character', 'boxguy', 'walkCycle');
    console.log('got lol ', introJSLiveInstance);
  };

}());