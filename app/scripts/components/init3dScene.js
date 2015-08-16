/**
 * Created by atulr on 16/08/15.
 */
(function () {
  'use strict';
  var intro3d = window.introJs.intro3d || {};
  var component3D = intro3d.component3D;
  var clock = new THREE.Clock();

  component3D.init3DCharacterScene = function () {

    var _init3DCharacterSceneForSingleDom = function (appendDom, characterName, animationName) {
      var injectDom = $(appendDom);
      var areaHeight = $(appendDom).height();
      var areaWidth = $(appendDom).width();
      var char = null;

      var camera = component3D.cameraGenerator.init(areaHeight, areaWidth);
      var renderer = component3D.rendererConfig.init(injectDom, areaHeight, areaWidth);
      var light = component3D.lightGenerator.init();
      var ambientLight = component3D.lightGenerator.initAmbient();

      var scene = new THREE.Scene();

      var charJsonPath = intro3d.charactersCollection[characterName] ? intro3d.charactersCollection[characterName].charJsonPath : null;
      var charAnimeJsonPath = intro3d.charactersCollection[characterName] ? intro3d.charactersCollection[characterName].charAnimeJsonPath : null;

      component3D.characterGenerator.init(charJsonPath, charAnimeJsonPath).then(function (character) {
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

    var init3DCharacterSceneForAllDom = function (injectDoms, characterJsonPath, animationName, characterAnimationJsonPath) {
      _.forEach($(injectDoms), function (domEle) {
        _init3DCharacterSceneForSingleDom(domEle, characterJsonPath, animationName, characterAnimationJsonPath);
      });
    };

    return {
      init: init3DCharacterSceneForAllDom
    }
  }();

  intro3d.init3DCharacterScene = component3D.init3DCharacterScene.init;

}());