/**
 * Created by atulr on 16/08/15.
 */
'use strict';
var intro3d = window.intro3d || {};
var component3D = intro3d.component3D;
var clock = new THREE.Clock();

component3D.init3DCharacter = function () {

  var _init3DCharacterForSingleDom = function (appendDom, characterJsonPath, animationName, characterAnimationJsonPath) {
    var injectDom = $(appendDom);
    var areaHeight = $(appendDom).height();
    var areaWidth = $(appendDom).width();
    var char = null;

    var camera = component3D.cameraGenerator.init(areaHeight, areaWidth);
    var renderer = component3D.rendererConfig.init(injectDom, areaHeight, areaWidth);
    var light = component3D.lightGenerator.init();
    var ambientLight = component3D.lightGenerator.initAmbient();

    var scene = new THREE.Scene();
    component3D.characterGenerator.init(characterJsonPath, characterAnimationJsonPath).then(function (character) {
      scene.add(character);
      character.animator(animationName);
      char = character;
    });

    scene.add(light);
    scene.add(ambientLight);
    renderer.render(scene, camera);

    var animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      var delta = 0.75 * clock.getDelta();
      THREE.AnimationHandler.update(delta);
    };

    animate();
  };

  var init3DCharacter = function (injectDoms, characterJsonPath, animationName, characterAnimationJsonPath) {
    _.forEach($(injectDoms), function (domEle) {
      _init3DCharacterForSingleDom(domEle, characterJsonPath, animationName, characterAnimationJsonPath);
    });
  };

  return {
    init: init3DCharacter
  }
}();

intro3d.init3DCharacter = component3D.init3DCharacter.init;
