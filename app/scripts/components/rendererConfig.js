/**
 * Created by atulr on 08/08/15.
 */
(function () {
  'use strict';
  var intro3d = window.introJs.intro3d || {};
  var component3D = intro3d.component3D = intro3d.component3D || {};

  component3D.rendererConfig = function () {
    var init = function (appendDom, areaHeight, areaWidth) {
      var renderer = intro3d.renderer || new THREE.WebGLRenderer({alpha: true, antialias: true});
      renderer.setSize(areaWidth, areaHeight);
      renderer.shadowMapEnabled = true;
      $(appendDom).empty();
      appendDom[0].appendChild(renderer.domElement);
      return renderer;
    };

    return {
      init: init
    };
  }();

}());