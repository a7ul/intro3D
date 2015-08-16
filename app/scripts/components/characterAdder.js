/**
 * Created by atulr on 17/08/15.
 */
'use strict';
(function () {

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