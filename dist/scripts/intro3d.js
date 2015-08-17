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
/**
 * Created by atulr on 08/08/15.
 */
(function () {
  'use strict';
  var intro3d = window.introJs.intro3d || {};
  var component3D = intro3d.component3D = intro3d.component3D || {};

  component3D.cameraGenerator = function () {
    var init = function (areaWidth, areaHeight ,shrink) {
      var camera = new THREE.PerspectiveCamera(75, areaWidth / areaHeight, 1, 1000);
      camera.position.z = shrink || 10;
      return camera;
    };
    return {
      init: init
    }
  }();

}());
/**
 * Created by atulr on 08/08/15.
 */
(function () {
  'use strict';

  var intro3d = window.introJs.intro3d || {};
  var component3D = intro3d.component3D = intro3d.component3D || {};

  component3D.characterGenerator = function () {
    var init = function (characterJsonPath, characterAnimationJsonPath) {
      var defer = Q.defer();
      var mesh = null;
      var loader = new THREE.JSONLoader();

      if(!characterJsonPath){
        defer.reject();
        return defer.promise;
      }

      loader.load(characterJsonPath, function (geometry, materials) {
        _.forEach(materials, function (m) {
          m.skinning = true;
        });
        mesh = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
        mesh.animator = function (animeName) {
          if (!geometry.animations) {
            loadAnimationFile(characterAnimationJsonPath).then(function (animationList) {
              playAnimation(mesh, animationList, animeName);
            });
          } else {
            playAnimation(mesh, geometry.animations, animeName);
          }
        };
        defer.resolve(mesh);
      });
      return defer.promise;
    };

    var playAnimation = function (mesh, animationList, animeName) {
      if (!animationList) {
        return;
      }
      var selected = _.find(animationList, {'name': animeName});
      if (selected === undefined) {
        console.log('Animation ', animeName, 'Not Found !');
      }
      var animation = new THREE.Animation(mesh, selected);
      animation.play();
    };

    var loadAnimationFile = function (characterAnimationJsonPath) {
      var defer = Q.defer();
      $.ajax({
        url: characterAnimationJsonPath,
        cache: true,
        success: function (result) {
          defer.resolve(result);
        },
        error: function (err) {
          console.log('error while loading animation file ', characterAnimationJsonPath, ' ', err);
          defer.reject(err);
        }
      });
      return defer.promise;
    };

    return {
      init: init
    }
  }();

}());
/**
 * Created by atulr on 08/08/15.
 */
(function () {
  'use strict';
  var intro3d = window.introJs.intro3d || {};
  var component3D = intro3d.component3D = intro3d.component3D || {};

  component3D.lightGenerator = function () {
    var init = function () {
      var light = new THREE.DirectionalLight(0x555555);
      light.castShadow = true;
      light.shadowDarkness = 0.1;
      light.shadowMapWidth = 2048;
      light.shadowMapHeight = 2048;
      light.position.set(500, 1500, 1000);
      light.shadowCameraFar = 2500;
      light.shadowCameraLeft = -1000;
      light.shadowCameraRight = 1000;
      light.shadowCameraTop = 1000;
      light.shadowCameraBottom = -1000;

      return light;
    };

    var initAmbient = function () {

      // add subtle blue ambient lighting
      var ambientLight = new THREE.AmbientLight(0xffffff);
      return ambientLight;

    };

    return {
      init: init,
      initAmbient: initAmbient
    }
  }();

}());
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
/**
 * Created by atulr on 16/08/15.
 */
(function () {
  'use strict';
  var intro3d = window.introJs.intro3d || {};
  var component3D = intro3d.component3D;
  var clock = new THREE.Clock();

  component3D.init3DCharacterScene = function () {

    var _init3DCharacterSceneForSingleDom = function (appendDom, characterName, animationName ,shrink) {
      var injectDom = $(appendDom);
      var areaHeight = $(appendDom).height();
      var areaWidth = $(appendDom).width();
      var char = null;

      var camera = component3D.cameraGenerator.init(areaHeight, areaWidth ,shrink);
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

    var init3DCharacterSceneForAllDom = function (injectDoms, characterJsonPath, animationName, characterAnimationJsonPath ,shrink) {
      _.forEach($(injectDoms), function (domEle) {
        _init3DCharacterSceneForSingleDom(domEle, characterJsonPath, animationName, characterAnimationJsonPath ,shrink);
      });
    };

    return {
      init: init3DCharacterSceneForAllDom
    }
  }();

  intro3d.init3DCharacterScene = component3D.init3DCharacterScene.init;

}());
/**
 * Created by atulr on 16/08/15.
 */
(function () {
  'use strict';
  var intro3d = window.introJs.intro3d || {};

  intro3d.domManipulator = function () {
    var init3dDom = function () {
      var toolTipContainer = $('.introjs-tooltip');
      var toolTipHeight = toolTipContainer.height() + 20;
      $('.tooltip-3d-character').remove();
      var characterContainer = $('<div class="tooltip-3d-character"></div>');
      characterContainer.height(toolTipHeight);
      characterContainer.width(toolTipHeight);
      characterContainer.css({
        "right": -toolTipHeight, position: "absolute",
        "top": 0
      });
      characterContainer.appendTo(toolTipContainer);
    };

    return {
      init3dDom: init3dDom
    };
  }();

}());
/**
 * Created by atulr on 17/08/15.
 */
(function () {
  'use strict';

  //introInstance._currentStep is the array index of introitems not the actual step as in html

  var intro3d = window.introJs.intro3d || {};

  intro3d.initialize = function (introJSInstance) {
    intro3d.domManipulator.init3dDom();
    var getCharacterDataFromDomAndAddCharacter = function () {

      var currentToolTippedElement = introJSInstance._introItems[introJSInstance._currentStep].element;
      var characterName = $(currentToolTippedElement).attr('data-character');
      var animationName = $(currentToolTippedElement).attr('data-character-animation');
      var position = $(currentToolTippedElement).attr('data-character-position');
      var shrink = $(currentToolTippedElement).attr('data-character-shrink');
      var offset = ($('.tooltip-3d-character').height());

      intro3d.init3DCharacterScene('.tooltip-3d-character', characterName, animationName, shrink);

      if (position === 'right') {
        $('.tooltip-3d-character').css({
          "right": -1 * offset,
          "left": ''
        });
      } else {
        $('.tooltip-3d-character').css({
          "left": -1 * offset,
          "right": ''
        });
      }
    };

    getCharacterDataFromDomAndAddCharacter();

    $('.introjs-nextbutton').click(getCharacterDataFromDomAndAddCharacter);
    $('.introjs-prevbutton').click(getCharacterDataFromDomAndAddCharacter);
    $('.introjs-bullets > ul > li >a').click(getCharacterDataFromDomAndAddCharacter);
    $('.introjs-skipbutton').click(function(){
      $('.tooltip-3d-character').remove();
    });

  };
  //introJSInstance._introItems[introJSInstance._currentStep].step;

}());
/**
 * Created by atulr on 17/08/15.
 */

(function () {
  'use strict';
  var intro3d = window.introJs.intro3d || {};
  intro3d.charactersCollection = {};
  intro3d.addCharacter = function (charConfig) {
    var defaultConfig = {
      name: null,
      charJsonPath: null,
      charAnimeJsonPath: null
    };

    if (!charConfig || !charConfig.name) {
      return;
    }
    intro3d.charactersCollection[charConfig.name] = {
      charJsonPath: charConfig.charJsonPath || defaultConfig.charJsonPath,
      charAnimeJsonPath: charConfig.charAnimeJsonPath || defaultConfig.charAnimeJsonPath
    };
  };
}());