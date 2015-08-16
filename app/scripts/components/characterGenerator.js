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