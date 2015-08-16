/**
 * Created by atulr on 08/08/15.
 */
'use strict';

var intro3d = introJs.intro3d || {};
var component3D = intro3d.component3D = intro3d.component3D || {};

component3D.cameraGenerator = function () {
  var init = function (areaWidth, areaHeight) {
    var camera = new THREE.PerspectiveCamera(75, areaWidth / areaHeight, 1, 1000);
    camera.position.z = 10;
    return camera;
  };
  return {
    init: init
  }
}();
