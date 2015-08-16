/**
 * Created by atulr on 16/08/15.
 */
(function () {
  'use strict';
  var introJs = window.introJs || {};
  introJs.intro3d = {};
  window.intro3d = introJs.intro3d;
  window.intro3d.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
}());